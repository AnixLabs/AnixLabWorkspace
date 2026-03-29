"use client";

import { useEffect } from "react";
import { Button } from "@shared/components/ui/Button";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

type ErrorKind = "forbidden" | "unauthorized" | "notfound" | "unknown";

function classify(message: string): ErrorKind {
  if (message.startsWith("Unauthorized:")) return "unauthorized";
  if (message.startsWith("Forbidden:")) return "forbidden";
  if (message.startsWith("Not found:")) return "notfound";
  return "unknown";
}

const KIND_META: Record<ErrorKind, { icon: string; title: string }> = {
  unauthorized: { icon: "🔑", title: "Not Logged In" },
  forbidden: { icon: "🔒", title: "Access Denied" },
  notfound: { icon: "🔍", title: "Not Found" },
  unknown: { icon: "⚠️", title: "Something Went Wrong" },
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const kind = classify(error.message);
  const { icon, title } = KIND_META[kind];

  // Strip the prefix — the rest is already a readable sentence
  const description = error.message.replace(/^[^:]+:\s*/, "");

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 mx-auto rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-3xl">
          {icon}
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">{description}</p>
          {error.digest && <p className="text-xs text-gray-400 font-mono">ID: {error.digest}</p>}
        </div>

        <div className="flex gap-3 justify-center">
          {kind === "unknown" || kind === "forbidden" ? (
            <Button
              onClick={reset}
              className="px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
            >
              Try Again
            </Button>
          ) : null}
          <Button
            href={kind === "unauthorized" ? "/" : "/users"}
            className="px-4 py-2 text-sm rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            {kind === "unauthorized" ? "Go Home" : "← Back to Users"}
          </Button>
        </div>
      </div>
    </div>
  );
}
