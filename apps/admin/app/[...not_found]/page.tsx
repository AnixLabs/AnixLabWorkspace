import { notFound } from "next/navigation";
import { connection } from "next/server";

export default async function NotFoundCatchAll() {
  await connection();
  return notFound();
}
