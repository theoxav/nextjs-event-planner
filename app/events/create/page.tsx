import EventCreateForm from '@/components/features/events/forms/EventCreateForm';

export default function CreateEventPage() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Create New Event</h1>
        <p className="text-muted mt-2 mb-6">
          Fill out the form below to create your event
        </p>
        <EventCreateForm />
      </div>
    </div>
  );
}
