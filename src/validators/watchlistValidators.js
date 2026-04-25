import { z } from "zod";
import { no } from "zod/locales";

const addToWatchlistSchema = z.object({
  movieId: z.string().uuid(),
  status: z
    .enum(["PLANNED", "WATCHING", "COMPLETED", "DROPPED"], {
      errorMessage: () => ({
        message: "Status must be one of: PLANNED, WATCHING, COMPLETED, DROPPED",
      }),
    })
    .optional(),
  rating: z.coerce
    .number()
    .int("Rating must be an integer")
    .min(1, "Rating must be at least 1")
    .max(10, "Rating must be at most 10")
    .optional(),
  note: z.string().max(500, "Note must be at most 500 characters").optional(),
});

export { addToWatchlistSchema };
