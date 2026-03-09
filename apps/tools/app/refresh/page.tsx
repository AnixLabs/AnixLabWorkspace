// app/refresh/page.js

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const ClearDataPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Clear all cookies
    document.cookie.split(";").forEach((cookie) => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=" + new Date(0).toUTCString() + ";path=/";
    });

    // Clear local storage
    localStorage.clear();

    // Clear session storage
    sessionStorage.clear();

    // Clear cache (not directly possible through JS but can be done by clearing specific URLs or using service worker)
    if ("caches" in window) {
      void caches.keys().then((cacheNames) => {
        cacheNames.forEach((cacheName) => {
          void caches.delete(cacheName);
        });
      });
    }

    // Redirect to the home page or another page after clearing
    router.push("/");
  }, [router]);

  return (
    <div>
      <h1>Refreshing and clearing all data...</h1>
    </div>
  );
};

export default ClearDataPage;
