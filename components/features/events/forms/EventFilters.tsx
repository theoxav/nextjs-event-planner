'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';

const EventFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = (formData.get('search') as string)?.trim() || '';
    const filter = (formData.get('filter') as string) || '';

    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (filter) params.set('filter', filter);

    startTransition(() => {
      router.replace(`/events?${params.toString()}`);
    });
  };

  return (
    <div className="card p-6">
      <form onSubmit={handleSubmit} className="flex gap-4 flex-wrap">
        <input
          type="text"
          name="search"
          placeholder="Search events..."
          className="input-field flex-1 min-w-64"
          defaultValue={searchParams.get('search') || ''}
          disabled={isPending}
        />
        <select
          name="filter"
          className="input-field w-auto cursor-pointer"
          defaultValue={searchParams.get('filter') || ''}
          disabled={isPending}
        >
          <option value="">All Events</option>
          <option value="upcoming">Upcoming</option>
          <option value="past">Past</option>
        </select>
        <button type="submit" className="btn-primary" disabled={isPending}>
          {isPending ? 'Filtering...' : 'Filter'}
        </button>
      </form>
    </div>
  );
};

export default EventFilters;

