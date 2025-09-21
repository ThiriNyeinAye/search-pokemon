import { z } from "zod";

export const searchSchema = z.object({
  q: z.string().trim().min(1, "Type a Pokémon name").max(30, "Name too long"),
});
export type SearchSchema = z.infer<typeof searchSchema>;
