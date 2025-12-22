import z from "zod";

export const eventSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  datetime: z.string().min(1, { message: "Date and time is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  maxAttendees: z.string().nullish(),
  isPublic: z.string().nullish(),
});

export type EventValidationSchema = z.infer<typeof eventSchema>;