
"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { IoClose, IoExpandOutline } from "react-icons/io5";

interface ZoomableImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function ZoomableImage({ src, alt, width, height }: ZoomableImageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const lastPosition = useRef({ x: 0, y: 0 });

  const open = () => {
    setIsOpen(true);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const close = useCallback(() => {
    setIsOpen(false);
    setScale(1);
    setPosition({ x: 0, y: 0 });
  }, []);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, close]);

  // Lock body scroll
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [isOpen]);

  // Wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setScale((prev) => Math.min(Math.max(prev - e.deltaY * 0.002, 0.5), 5));
  }, []);

  // Drag to pan
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - lastPosition.current.x,
      y: e.clientY - lastPosition.current.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const x = e.clientX - dragStart.current.x;
    const y = e.clientY - dragStart.current.y;
    lastPosition.current = { x, y };
    setPosition({ x, y });
  };

  const handleMouseUp = () => setIsDragging(false);
  return (
    <>
      <div className="relative w-full cursor-zoom-in group" onClick={open}>
        <Image
          src={src}
          unoptimized
          alt={alt}
          width={width}
          height={height}
          className="w-full max-h-[80vh] object-contain"
          priority
        />
        
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 rounded-full bg-black/60 flex items-center justify-center">
            <IoExpandOutline className="text-white text-lg" />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center"
          onWheel={handleWheel}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <button
            onClick={close}
            aria-label="Close zoom"
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <IoClose className="text-xl" />
          </button>

          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/40">
            Scroll to zoom · Drag to pan · Press Esc to close
          </p>

          <div
            className="relative select-none"
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
              cursor: scale > 1 ? "grab" : "zoom-out",
              transition: isDragging ? "none" : "transform 0.1s ease",
            }}
            onMouseDown={handleMouseDown}
            onClick={(e) => {
              // Only close if not dragging
              if (e.target === e.currentTarget && scale <= 1) close();
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={alt}
              draggable={false}
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-xl"
            />
          </div>

          {/* Backdrop click to close */}
          <div className="absolute inset-0 -z-10" onClick={close} />
        </div>
      )}
    </>
  );
}
