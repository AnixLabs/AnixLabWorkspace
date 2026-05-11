import { useEffect, useMemo, useState } from "react";

export function useColumnCount(): number {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 768);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return useMemo(() => {
    if (width <= 375) return 1;
    if (width <= 640) return 2;
    if (width < 768) return 3;
    if (width < 1024) return 4;
    return 5;
  }, [width]);
}
