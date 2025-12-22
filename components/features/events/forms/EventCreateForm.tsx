'use client';

import { createEvent } from '@/actions/event';
import { useRouter } from 'next/navigation';
import { useActionState } from 'react';

type ActionState = {
  success: boolean;
  error: string | null;
  eventId: string | null;
};

const initialState: ActionState = {
  success: false,
  error: null,
  eventId: null,
};

const EventCreateForm = () => {
  const router = useRouter();
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    createEvent,
    initialState
  );

  if(state.success && state.eventId) {
    router.push(`/events/${state.eventId}`);
  }

  return (
    <form className="space-y-6" action={formAction}>
      {state.error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded">
          {state.error}
        </div>
      )}
      {/* Event Title */}
      <div>
        <label
          className="block text-sm text-foreground font-medium mb-2"
          htmlFor="title"
        >
          Event Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          className="input-field"
          placeholder="Enter event title"
        />
      </div>

      {/* Description */}
      <div>
        <label
          className="block text-sm text-foreground font-medium mb-2"
          htmlFor="description"
        >
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          required
          className="input-field"
          placeholder="Enter event description"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* DateTime */}
        <div>
          <label
            className="block text-sm text-foreground font-medium mb-2"
            htmlFor="datetime"
          >
            Date & Time *
          </label>
          <input
            type="datetime-local"
            id="datetime"
            name="datetime"
            required
            className="input-field"
            placeholder="Enter event datetime"
          />
        </div>

        {/* Location */}
        <div>
          <label
            className="block text-sm text-foreground font-medium mb-2"
            htmlFor="location"
          >
            Location *
          </label>
          <input
            type="text"
            id="location"
            name="location"
            required
            className="input-field"
            placeholder="Enter event location"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Max Attendes */}
        <div>
          <label
            className="block text-sm text-foreground font-medium mb-2"
            htmlFor="datetime"
          >
            Max Attendees
          </label>
          <input
            type="number"
            id="maxAttendees"
            name="maxAttendees"
            min="1"
            className="input-field"
            placeholder="Leave empty for unlimited"
          />
        </div>

        {/* Visibility */}
        <div>
          <label
            className="block text-sm text-foreground font-medium mb-2"
            htmlFor="isPublic"
          >
            Event Visibility
          </label>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublic"
              name="isPublic"
              className="h-4 w-4 text-primary focus:ring-primary border-slate-600 rounded bg-slate-800"
            />
            <label
              className="text-foreground ml-2 block text-sm"
              htmlFor="isPublic"
            >
              Make this event public
            </label>
          </div>
        </div>
      </div>
      {state.error && (
        <div className='bg-red-600/10 border border-red-600/20 rounded-md p-4'>
          <p className='text-red-400 text-sm'>{state.error}</p>
        </div>
      )}
      <div className="flex gap-4">
        <button className="btn-primary" type="submit" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Event'}
        </button>
        <button
          className="btn-secondary"
          type="button"
          onClick={() => router.back()}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EventCreateForm;
