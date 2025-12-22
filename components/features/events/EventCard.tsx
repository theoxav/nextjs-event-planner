import { Event } from '@/types';
import { CalendarDays, Eye, MapPin, User, Users } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

interface EventCardProps {
  event: Event;
}
const EventCard = ({ event }: EventCardProps) => {
  return (
    <div className="card overflow-hidden hover:shadow-lg transition-shadow">
      <div className="p-6 space-y-2">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          {event.title}
        </h3>
        <p className="text-muted mb-4">{event.description}</p>

        {/* Date and Time*/}
        <div className="space-y-2 text-sm text-muted">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-muted-foreground" />
            {format(new Date(event.date), "PPP 'at' p")}
          </div>
        </div>

        {/* Location*/}
        <div className="space-y-2 text-sm text-muted">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            {event.location}
          </div>
        </div>

        {/* Max Attendees*/}
        <div className="space-y-2 text-sm text-muted">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-muted-foreground" />
            {event.maxAttendees
              ? `${event.maxAttendees} attendees`
              : 'Unlimited attendees'}
          </div>
        </div>

        {/* Organizer*/}
        <div className="space-y-2 text-sm text-muted">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            by {event.user.name || 'Unknown'}
          </div>
        </div>
        <div className="mt-4">
          <Link
            href={`/events/${event.id}`}
            className="text-primary hover:text-primary/80 transition-colors font-medium cursor-pointer"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
