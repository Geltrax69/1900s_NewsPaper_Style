import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Car } from "../data/cars";

const FRAMES = 16;

/**
 * Interactive 360° car viewer.
 *
 * Moving the pointer across the image scrubs through 16 clean-studio frames
 * (a full turntable); on touch, drag horizontally. A segmented control flips
 * to the detailed interior view. Motion is entirely user-driven — no
 * autoplay, no autonomous animation — so it stays calm under
 * prefers-reduced-motion too. Keyboard: focus the stage and use ← → arrows.
 */
export function CarViewer360({ car }: { car: Car }) {
  const [frame, setFrame] = useState(0);
  const [mode, setMode] = useState<"exterior" | "interior">("exterior");
  const [interacted, setInteracted] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  const frames = useMemo(
    () =>
      Array.from(
        { length: FRAMES },
        (_, i) => `images/cars/${car.imageDir}/spin/${String(i).padStart(2, "0")}.jpg`
      ),
    [car]
  );

  // Preload the sequence once the viewer is near the viewport.
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let done = false;
    const preload = () => {
      if (done) return;
      done = true;
      frames.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    };
    if ("IntersectionObserver" in window) {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            preload();
            io.disconnect();
          }
        },
        { rootMargin: "400px" }
      );
      io.observe(el);
      return () => io.disconnect();
    }
    preload();
  }, [frames]);

  const scrubTo = useCallback((clientX: number) => {
    const el = stageRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = Math.min(0.999, Math.max(0, (clientX - r.left) / r.width));
    setFrame(Math.floor(px * FRAMES));
    setInteracted(true);
  }, []);

  const step = useCallback(
    (d: number) => {
      setFrame((f) => (f + d + FRAMES) % FRAMES);
      setInteracted(true);
    },
    []
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (mode !== "exterior") return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    }
  };

  const segBtn =
    "font-label uppercase tracking-[0.14em] text-[0.68rem] px-3 py-1.5 cursor-pointer border border-rule bg-transparent text-ink transition-colors duration-150";
  const segActive = "bg-ink text-paper";

  return (
    <div className="photo-frame p-1.5">
      <div
        ref={stageRef}
        role="slider"
        tabIndex={0}
        aria-label={`360 degree view of the ${car.year} ${car.make} ${car.model}. Use left and right arrow keys, or move the pointer across, to rotate.`}
        aria-valuemin={1}
        aria-valuemax={FRAMES}
        aria-valuenow={mode === "exterior" ? frame + 1 : FRAMES + 1}
        aria-valuetext={
          mode === "exterior" ? `Exterior, angle ${frame + 1} of ${FRAMES}` : "Interior view"
        }
        onKeyDown={onKeyDown}
        onPointerMove={(e) => {
          if (mode !== "exterior") return;
          // Mouse scrubs on hover; touch/pen scrub while dragging.
          if (e.pointerType === "mouse" || e.buttons > 0) scrubTo(e.clientX);
        }}
        onPointerDown={(e) => {
          if (mode === "exterior" && e.pointerType !== "mouse") scrubTo(e.clientX);
        }}
        className="relative overflow-hidden select-none"
        style={{
          touchAction: "pan-y",
          cursor: mode === "exterior" ? "ew-resize" : "default",
          aspectRatio: "3 / 2",
        }}
      >
        <img
          src={frames[frame]}
          alt=""
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          width={1200}
          height={800}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-150"
          style={{ opacity: mode === "exterior" ? 1 : 0 }}
        />
        <img
          src={car.images.interior.src}
          alt={mode === "interior" ? car.images.interior.alt : ""}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          loading="lazy"
          width={1200}
          height={800}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-150"
          style={{ opacity: mode === "interior" ? 1 : 0 }}
        />
      </div>

      <div className="flex items-center justify-between gap-3 px-1 pt-2.5">
        <div role="group" aria-label="Choose view" className="flex">
          <button
            type="button"
            aria-pressed={mode === "exterior"}
            onClick={() => setMode("exterior")}
            className={`${segBtn} ${mode === "exterior" ? segActive : "hover:bg-ink/10"} border-r-0`}
          >
            360°
          </button>
          <button
            type="button"
            aria-pressed={mode === "interior"}
            onClick={() => setMode("interior")}
            className={`${segBtn} ${mode === "interior" ? segActive : "hover:bg-ink/10"}`}
          >
            Interior
          </button>
        </div>
        <p className="byline m-0" aria-live="polite">
          {mode === "exterior"
            ? interacted
              ? `Angle ${frame + 1} / ${FRAMES}`
              : "Move to rotate · 360°"
            : "Inside the cabin"}
        </p>
      </div>
    </div>
  );
}
