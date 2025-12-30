'use client';

import { deleteEvent } from '@/actions/event';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface EventActionsProps {
  eventId: string;
  isOwner: boolean;
}
const EventActions = ({ eventId, isOwner }: EventActionsProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteEvent(eventId);
      router.push('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex gap-3">
      <button
        className="btn-secondary"
        onClick={() => router.push(`/events/${eventId}/edit`)}
      >
        Edit Event
      </button>
      <button className="btn-danger" onClick={handleDelete}>
        Delete Event
      </button>
    </div>
  );
};

export default EventActions;
