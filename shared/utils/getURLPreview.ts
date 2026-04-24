import z from "zod";

const previewSchema = z.object({
  status: z.string(),
  data: z.object({
    title: z.string().nullable().optional(),
    description: z.string().nullable().optional(),
    url: z.url(),
    publisher: z.string().nullable().optional(),
    lang: z.string().nullable().optional(),
    author: z.string().nullable().optional(),
    image: z
      .object({
        url: z.string(),
        height: z.number(),
        width: z.number(),
      })
      .nullable()
      .optional(),
    date: z.string().nullable().optional(),
    logo: z
      .object({
        url: z.string(),
        height: z.number(),
        width: z.number(),
      })
      .nullable()
      .optional(),
  }),
  statusCode: z.number(),
});

export async function getURLPreview(url: string): Promise<z.infer<typeof previewSchema>> {
  const res = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
  const data = (await res.json()) as unknown;
  const parsedData = previewSchema.safeParse(data);
  if (!parsedData.success) {
    console.error("Invalid URL preview data:", parsedData.error);
    throw new Error("Invalid URL preview data");
  }

  return previewSchema.parse({
    status: parsedData.data.status,
    data: {
      title: parsedData.data.data.title,
      description: parsedData.data.data.description,
      url: parsedData.data.data.url,
      publisher: parsedData.data.data.publisher,
      lang: parsedData.data.data.lang,
      author: parsedData.data.data.author,
      image: parsedData.data.data.image,
      date: parsedData.data.data.date,
      logo: parsedData.data.data.logo,
    },
    statusCode: parsedData.data.statusCode,
  });
}
