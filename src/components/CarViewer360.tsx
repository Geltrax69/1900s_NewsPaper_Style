import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Car } from "../data/cars";

const FRAMES = 36;
const EASE = 0.3; // how quickly the angle chases the pointer (per rAF tick)
const FRICTION = 0.94; // momentum decay per tick after release
const MIN_VEL = 0.02; // below this, momentum stops
const MAX_VEL = 2.5; // clamp flick speed (frames per tick)

const wrap = (n: number) => ((n % FRAMES) + FRAMES) % FRAMES;

/**
 * Interactive 360° car viewer.
 *
 * A dense 36-frame turntable (10° steps) plus a smoothed, physics-flavoured
 * drive: the rendered angle eases toward the pointer instead of snapping to
 * it, and releasing mid-sweep keeps the car spinning with friction-decayed
 * momentum — the same feel as flicking a 3D model. Motion is entirely
 * user-driven (no autoplay); under prefers-reduced-motion the angle snaps
 * directly with no easing and no momentum.
 *
 * Keyboard: focus the stage and use ← → arrows.
 */
export function CarViewer360({ car }: { car: Car }) {
  const [frame, setFrame] = useState(0);
  const [mode, setMode] = useState<"exterior" | "interior">("exterior");
  const [interacted, setInteracted] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  // Continuous, unbounded angle (frames); the integer display frame is derived.
  const angle = useRef(0);
  const target = useRef(0);
  const vel = useRef(0);
  const interacting = useRef(false);
  const raf = useRef<number>(0);
  const reduced = useRef(false);

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

  const stopLoop = useCallback(() => {
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = 0;
  }, []);

  const tick = useCallback(() => {
    raf.current = 0;
    const prev = angle.current;

    if (interacting.current) {
      // Ease toward the pointer target; track velocity for release momentum.
      angle.current += (target.current - angle.current) * EASE;
      const inst = angle.current - prev;
      vel.current = vel.current * 0.75 + inst * 0.25;
    } else {
      // Coasting: momentum with friction.
      angle.current += vel.current;
      vel.current *= FRICTION;
      if (Math.abs(vel.current) < MIN_VEL) vel.current = 0;
    }

    const shown = wrap(Math.round(angle.current));
    setFrame((f) => (f === shown ? f : shown));

    const settled =
      !interacting.current &&
      vel.current === 0 &&
      Math.abs(target.current - angle.current) < 0.01;

    if (settled) {
      // Snap the unbounded angle back into range so numbers don't drift.
      angle.current = wrap(angle.current);
      target.current = angle.current;
      return;
    }
    raf.current = requestAnimationFrame(tick);
  }, []);

  const ensureLoop = useCallback(() => {
    if (!raf.current) raf.current = requestAnimationFrame(tick);
  }, [tick]);

  const scrubTo = useCallback(
    (clientX: number) => {
      const el = stageRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const px = Math.min(0.999, Math.max(0, (clientX - r.left) / r.width));
      // Choose the target equivalent nearest to the current angle so
      // scrubbing across the 0/35 seam doesn't snap the car backwards.
      const raw = px * FRAMES;
      target.current = raw + Math.round((angle.current - raw) / FRAMES) * FRAMES;
      interacting.current = true;
      setInteracted(true);
      if (reduced.current) {
        angle.current = target.current;
        vel.current = 0;
        setFrame(wrap(Math.round(angle.current)));
      } else {
        ensureLoop();
      }
    },
    [ensureLoop]
  );

  const release = useCallback(() => {
    interacting.current = false;
    if (reduced.current) {
      vel.current = 0;
      return;
    }
    vel.current = Math.max(-MAX_VEL, Math.min(MAX_VEL, vel.current));
    ensureLoop();
  }, [ensureLoop]);

  // Stop everything when unmounting or switching to the interior view.
  useEffect(() => {
    stopLoop();
    return stopLoop;
  }, [stopLoop]);

  useEffect(() => {
    reduced.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const step = useCallback(
    (d: number) => {
      interacting.current = false;
      vel.current = 0;
      target.current = angle.current + d;
      if (reduced.current) {
        angle.current = target.current;
        setFrame(wrap(Math.round(angle.current)));
      } else {
        ensureLoop();
      }
      setInteracted(true);
    },
    [ensureLoop]
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
        onPointerUp={release}
        onPointerCancel={release}
        onPointerLeave={(e) => {
          // Mouse leaving the stage releases with momentum; touch drags end on pointerup.
          if (mode === "exterior" && e.pointerType === "mouse") release();
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
