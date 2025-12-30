import { auth } from '@/auth';
import EventActions from '@/components/features/events/event/EventActions';
import { getEventById } from '@/services/events.service';
import { Calendar, MapPin, User, Users } from 'lucide-react';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import RSVPButton from '@/components/features/events/event/RSVPButton';

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  const event = await getEventById(id);

  const isOwner = session?.user?.id === event.userId;
  const isPast = new Date(event.date) < new Date();

  if (!event) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="card p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-4">
              {event.title}
            </h1>
            <p className="text-xl text-muted bm-6">{event.description}</p>
          </div>

          {isOwner && <EventActions eventId={event.id} isOwner={isOwner} />}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            {/* Date and Time*/}
            <div className="flex items-center gap-4">
              <div>
                <Calendar className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  {format(new Date(event.date), 'EEE, MMM do, yyyy')}
                </p>
                <p className="text-muted">
                  {format(new Date(event.date), 'h:m a')}
                </p>
              </div>
            </div>

            {/* Location*/}
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-foreground">{event.location}</span>
            </div>

            {/* Organizer*/}
            <div className="flex items-center gap-2 text-white">
              <User className="w-4 h-4 text-primary" />
              <span className="text-foreground">
                Organized by {event.user.name || event.user.email}
              </span>
            </div>

            {/* Max Attendees*/}
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-primary" />
              <span className="text-foreground">
                {event.maxAttendees
                  ? `${event.maxAttendees} max attendees`
                  : 'Unlimited attendees'}
              </span>
            </div>

            {!isPast && event.isPublic && (
              <RSVPButton eventId={event.id} currentRSVP="GOING" />
            )}

            {isPast && (
              <div className="text-center p-4">
                <p className="text-muted">This event has already past</p>
              </div>
            )}

            {!event.isPublic && (
              <div className="text-center p-4">
                <p className="text-muted">This event is private</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
