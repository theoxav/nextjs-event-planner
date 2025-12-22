'use client';

import { Event } from '@/types';
import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import EventCard from './EventCard';
import EventFilters from './forms/EventFilters';
import Link from 'next/link';

interface EventsListProps {
  events: Event[];
  isAuthenticated: boolean;
}

const EventsList = ({ events, isAuthenticated }: EventsListProps) => {
  const searchParams = useSearchParams();
  const search = searchParams.get('search')?.toLowerCase().trim() || '';
  const filter = searchParams.get('filter') || '';

  const filteredEvents = useMemo(() => {
    const now = new Date();

    return events
      .filter((event) => {
        // Recherche textuelle
        if (search) {
          const matchesSearch =
            event.title.toLowerCase().includes(search) ||
            event.description.toLowerCase().includes(search) ||
            event.location.toLowerCase().includes(search);
          if (!matchesSearch) return false;
        }

        // Filtre par date
        const eventDate = new Date(event.date);
        if (filter === 'upcoming') return eventDate >= now;
        if (filter === 'past') return eventDate < now;

        return true;
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [events, search, filter]);

  return (
    <div className="space-y-6">
      <EventFilters />

      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="card p-8 text-center">
          <p className="text-muted">No events found.</p>
          {isAuthenticated && (
            <Link
              href="/events/create"
              className="btn btn-primary mt-4 inline-block"
            >
              Create the first event
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default EventsList;
