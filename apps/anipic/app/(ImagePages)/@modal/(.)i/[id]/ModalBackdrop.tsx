"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoClose } from "react-icons/io5";

export default function ModalBackdrop({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);

  // back after 300ms (to allow modal close animation to play)
  const close = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      router.back();
    }, 300);
  };

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [close]);

  // Prevent scroll while modal is open
  useEffect(() => {
    const html = document.documentElement;
    const previousHtmlOverflow = html.style.overflow;

    html.style.overflow = "hidden";

    return () => {
      html.style.overflow = previousHtmlOverflow;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-99 flex items-center justify-center bg-black/75 backdrop-blur-sm p-4"
      onClick={close}
    >
      <div
        className={`relative w-full max-w-5xl max-h-[90dvh] overflow-y-auto rounded-3xl bg-white dark:bg-neutral-950 shadow-2xl ${isClosing ? "opacity-0 scale-0 pointer-events-none" : "opacity-100 scale-100"} transition-all duration-300`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          aria-label="Close"
          onClick={close}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 transition-colors text-sm font-bold cursor-pointer"
        >
          <IoClose />
        </button>

        {children}
      </div>
    </div>
  );
}
