import z from "zod";

export const ImageApiResponseSchema = z.union([
  z.object({
    images: z.array(
      z.object({
        id: z.string(),
        thumbnailUrl: z.string(),
        title: z.string(),
        width: z.number(),
        height: z.number(),
      }),
    ),
    nextCursor: z.string().nullable(),
    hasMore: z.boolean(),
  }),
  z.object({ error: z.string() }),
]);

export const ImageApiRequestBodySchema = z.object({
  cursor: z.string().optional(),
  tags: z
    .string()
    .transform((val) => (val ? val.split(",").filter(Boolean) : []))
    .optional(),
  q: z.string().optional(),
  sort: z.enum(["latest", "popular", "views", "downloads"]).optional(),
  skipId: z.string().optional(), // For related images, to exclude the current image
});

export type ImageApiResponse = z.infer<typeof ImageApiResponseSchema>;
export type ImageApiRequestBody = z.infer<typeof ImageApiRequestBodySchema>;
export type SortOption = NonNullable<ImageApiRequestBody["sort"]>;