"use client";

import { useEffect, useRef } from "react";

const BLOB_RADIUS = 210;
const FOLLOW_SPEED = 0.1;

export default function CursorBlob() {
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const blob = blobRef.current;
    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    if (!blob || !finePointer.matches || reducedMotion.matches) return;

    let frame = 0;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const animate = () => {
      currentX += (targetX - currentX) * FOLLOW_SPEED;
      currentY += (targetY - currentY) * FOLLOW_SPEED;
      blob.style.transform = `translate3d(${currentX - BLOB_RADIUS}px, ${currentY - BLOB_RADIUS}px, 0)`;
      frame = window.requestAnimationFrame(animate);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      targetX = event.clientX;
      targetY = event.clientY;
      blob.style.opacity = "1";
    };

    const hideBlob = () => {
      blob.style.opacity = "0";
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("blur", hideBlob);
    document.documentElement.addEventListener("mouseleave", hideBlob);
    frame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("blur", hideBlob);
      document.documentElement.removeEventListener("mouseleave", hideBlob);
    };
  }, []);

  return (
    <div
      ref={blobRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60] size-[420px] opacity-0 transition-opacity duration-500 [will-change:transform]"
    >
      <div className="home-cursor-blob size-full" />
    </div>
  );
}
