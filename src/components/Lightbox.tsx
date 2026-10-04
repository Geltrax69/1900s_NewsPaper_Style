import { useEffect, useRef, useState } from "react";
import type { CarImage } from "../data/cars";
import { Tilt } from "./Tilt";

/** Keyboard-accessible lightbox with captions and prev/next controls. */
export function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: CarImage[];
  startIndex: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(startIndex);
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevFocus = useRef<Element | null>(null);

  useEffect(() => {
    prevFocus.current = document.activeElement;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
      (prevFocus.current as HTMLElement | null)?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft")
        setIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, onClose]);

  const img = images[index];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Image viewer: ${img.alt}`}
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4"
      onClick={onClose}
    >
      <div
        className="photo-frame max-w-4xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-1 py-2">
          <p className="kicker text-faded m-0">
            {index + 1} / {images.length} · Illustration
          </p>
          <button
            ref={closeRef}
            onClick={onClose}
            className="pressable font-label uppercase tracking-[0.16em] text-[0.72rem] text-burgundy bg-transparent border border-burgundy px-3 py-1.5 cursor-pointer hover:bg-burgundy hover:text-paper"
            aria-label="Close image viewer"
          >
            Close ✕
          </button>
        </div>
        <img src={img.src} alt={img.alt} className="w-full h-auto" />
        <div className="flex items-center justify-between gap-4 px-1 py-3">
          <button
            onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
            className="pressable font-label uppercase tracking-[0.14em] text-[0.72rem] text-ink bg-transparent border border-rule px-3 py-1.5 cursor-pointer hover:bg-ink hover:text-paper"
            aria-label="Previous image"
          >
            ← Prev
          </button>
          <p className="caption text-[0.9rem] m-0 text-center flex-1">{img.caption}</p>
          <button
            onClick={() => setIndex((i) => (i + 1) % images.length)}
            className="pressable font-label uppercase tracking-[0.14em] text-[0.72rem] text-ink bg-transparent border border-rule px-3 py-1.5 cursor-pointer hover:bg-ink hover:text-paper"
            aria-label="Next image"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}

/** Clickable gallery grid that opens the lightbox. */
export function ImageGallery({ images }: { images: CarImage[] }) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  return (
    <>
      <div className="grid grid-cols-2 gap-4" role="list" aria-label="Image gallery">
        {images.map((img, i) => (
          <Tilt key={img.src} max={4} scale={1.015}>
            <button
              role="listitem"
              onClick={() => setOpenAt(i)}
              className="photo-frame pressable cursor-pointer bg-transparent p-1.5 text-left w-full"
              aria-label={`Enlarge image: ${img.alt}`}
            >
              <img src={img.src} alt={img.alt} loading="lazy" width={800} height={450} />
              <p className="caption text-[0.8rem] mt-1.5 px-0.5">{img.caption}</p>
            </button>
          </Tilt>
        ))}
      </div>
      {openAt !== null && (
        <Lightbox images={images} startIndex={openAt} onClose={() => setOpenAt(null)} />
      )}
    </>
  );
}
