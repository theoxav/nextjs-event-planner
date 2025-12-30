'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { eventSchema } from '@/validations/event-schema';
import { z } from 'zod';

export async function createEvent(
  prevState: { success: boolean; error: string | null; eventId: string | null },
  formData: FormData
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized', eventId: null };
    }

    const rawData = {
      title: formData.get('title'),
      description: formData.get('description'),
      datetime: formData.get('datetime'),
      location: formData.get('location'),
      maxAttendees: formData.get('maxAttendees'),
      isPublic: formData.get('isPublic'),
    };

    const validatedData = eventSchema.parse(rawData);

    const event = await prisma.event.create({
      data: {
        title: validatedData.title,
        description: validatedData.description,
        date: new Date(validatedData.datetime),
        location: validatedData.location,
        maxAttendees: validatedData.maxAttendees
          ? Number(validatedData.maxAttendees)
          : null,
        isPublic: validatedData.isPublic === 'on',
        userId: session.user.id,
      },
    });

    return { success: true, error: null, eventId: event.id };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message, eventId: null };
    }
    return { success: false, error: 'Failed to create event', eventId: null };
  }
}

export async function deleteEvent(eventId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' };
    }

    const existingEvent = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!existingEvent) {
      return { success: false, error: 'Event not found' };
    }

    if (existingEvent.userId !== session.user.id) {
      return { success: false, error: 'Unauthorized' };
    }

    await prisma.event.delete({
      where: { id: eventId, userId: session.user.id },
    });

    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: 'Failed to delete event' };
  }
}
