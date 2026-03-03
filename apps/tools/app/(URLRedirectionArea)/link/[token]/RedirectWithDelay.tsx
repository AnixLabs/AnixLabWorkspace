"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function RedirectWithDelay({
  longUrl,
  adsLabel,
}: {
  longUrl: string;
  adsLabel?: number;
}) {
  const router = useRouter();
  const delay = [10, 3, 5, 15][adsLabel || 0] ?? 10; // Default to 10s if adsLabel is invalid
  const [countdown, setCountdown] = useState(delay);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          router.push(longUrl);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [longUrl, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      {countdown > 0 ? (
        <h1 className="text-2xl font-bold">Redirecting in {countdown} seconds...</h1>
      ) : (
        <>
          <p className="text-sm text-gray-600">You will be redirected to:</p>
          <a href={longUrl} className="text-blue-500 underline">
            {longUrl}
          </a>
          <p className="text-sm text-gray-500">If not redirected, click the link above.</p>
        </>
      )}
    </div>
  );
}
