export type Event = {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  maxAttendees: number | null;
  isPublic: boolean;
  createdAt: Date;
  updatedAt: Date;

  user: {
    name: string;
    email: string;
  };
};
