import { auth } from '@/auth';
import EventsList from '@/components/features/events/EventsList';
import { getEvents } from '@/services/events.service';
import Link from 'next/link';

export default async function EventsPage() {
  const session = await auth();
  const events = await getEvents();

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Events</h1>
          <p className="text-muted mt-2">
            Discover and join amazing events in your area
          </p>
        </div>
        {session && (
          <Link href="/events/create" className="btn btn-primary">
            Create Event
          </Link>
        )}
      </div>

      <EventsList events={events} isAuthenticated={!!session} />
    </div>
  );
}
