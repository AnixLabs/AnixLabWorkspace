// app/global-error.js

// Error boundaries must be Client Components
"use client";
import Image from "next/image";
import Error from "./Error";

export default function GlobalErrorLayout({ error }: { error: Error }) {
  // Infer error code based on the error message
  const errorCode = error.message?.includes("Mongo")
    ? 502 // Database errors
    : error.message?.includes("Network")
    ? 503 // Network-related errors
    : 500; // Default fallback

  // console.error(error.message);
  return (
    // global-error must include html and body tags
    <html>
      <body className="h-[80vh] relative flex flex-col justify-center items-center bg-slate-300">
        <header className=" absolute top-0 w-full flex justify-between items-center p-3">
          <div className="flex items-center gap-2">
            <Image src="/favicon.ico" alt="favicon" width={50} height={50} className="w-9" />
            <span className="text-xl font-bold">Anix Lab</span>
          </div>
          <span>
            Error Code:
            <code className="bg-transparent text-red-500">{errorCode}</code>
          </span>
        </header>
        <Error />
      </body>
    </html>
  );
}
