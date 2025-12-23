import { getEventById } from '@/services/events.service';
import { notFound } from 'next/navigation';

export default async function EventDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-foreground">{event.title}</h1>
      <p className="text-muted">{event.description}</p>
    </div>
  );
}
