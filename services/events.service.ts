export async function getEvents() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/events`);

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const errorMessage =
      errorData.error || `Failed to fetch events (${res.status})`;
    throw new Error(errorMessage);
  }

  const events = await res.json();
  return events;
}

export async function getEventById(id: string) {
  const { headers } = await import('next/headers');
  const headersList = await headers();
  const cookieHeader = headersList.get('cookie') || '';

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/events/${id}`,
    {
      headers: {
        Cookie: cookieHeader,
      },
      cache: 'no-store',
    }
  );

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const errorMessage =
      errorData.error || `Failed to fetch event (${res.status})`;
    throw new Error(errorMessage);
  }

  const event = await res.json();
  return event;
}
