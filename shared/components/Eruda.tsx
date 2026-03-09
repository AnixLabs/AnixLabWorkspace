// /components/Eruda.js
"use client";

import Script from "next/script";

declare global {
  interface Window {
    eruda: { init: () => void } | undefined;
  }
}

export default function ErudaScript() {
  const handleErudaLoad = () => {
    if (typeof window.eruda !== "undefined") {
      window.eruda.init();
    } else {
      console.error("Eruda is not defined");
    }
  };

  return (
    <Script
      src="https://cdn.jsdelivr.net/npm/eruda"
      strategy="afterInteractive"
      onLoad={handleErudaLoad}
    />
  );
}
