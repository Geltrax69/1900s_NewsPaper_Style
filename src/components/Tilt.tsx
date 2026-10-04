import { useEffect, useRef, type ReactNode } from "react";
import { useFineHover, useReducedMotion } from "../hooks/useReducedMotion";

/**
 * Subtle 3D tilt that follows the pointer across car imagery.
 *
 * Motion recipe (per the animation skills): transform-only, spring-lerped via
 * rAF so rapid pointer moves retarget smoothly; max 6° so it stays
 * near-imperceptible feedback rather than a showpiece. 3D rotation is a
 * Tier-1 vestibular trigger, so the tilt is fully removed under
 * prefers-reduced-motion and on touch devices — static imagery remains.
 */
export function Tilt({
  children,
  max = 6,
  scale = 1.02,
  className = "",
}: {
  children: ReactNode;
  max?: number;
  scale?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const fineHover = useFineHover();
  const sceneRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    tx: 0,
    ty: 0,
    ts: 1,
    cx: 0,
    cy: 0,
    cs: 1,
    raf: 0,
    hovering: false,
  });

  const canTilt = !reduced && fineHover;

  useEffect(() => {
    if (!canTilt) return;
    const scene = sceneRef.current;
    const inner = innerRef.current;
    if (!scene || !inner) return;
    const s = stateRef.current;
    // Reset any stale state from a previous activation.
    s.tx = s.ty = 0;
    s.ts = 1;
    s.cx = s.cy = 0;
    s.cs = 1;
    s.hovering = false;
    if (s.raf) cancelAnimationFrame(s.raf);
    s.raf = 0;
    inner.style.transform = "";

    const tick = () => {
      s.cx += (s.tx - s.cx) * 0.18;
      s.cy += (s.ty - s.cy) * 0.18;
      s.cs += (s.ts - s.cs) * 0.18;
      // Full transform string: hardware-accelerated, set directly on the element.
      inner.style.transform = `rotateX(${s.cx.toFixed(2)}deg) rotateY(${s.cy.toFixed(
        2
      )}deg) scale(${s.cs.toFixed(3)})`;
      const settled =
        Math.abs(s.tx - s.cx) < 0.01 &&
        Math.abs(s.ty - s.cy) < 0.01 &&
        Math.abs(s.ts - s.cs) < 0.001;
      if (!s.hovering && settled) {
        inner.style.transform = "";
        s.raf = 0;
        return;
      }
      s.raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!s.raf) s.raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const r = scene.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      s.ty = px * max * 2;
      s.tx = -py * max * 2;
      s.ts = scale;
      s.hovering = true;
      start();
    };
    const onLeave = () => {
      s.tx = 0;
      s.ty = 0;
      s.ts = 1;
      s.hovering = false;
      start();
    };

    scene.addEventListener("pointermove", onMove);
    scene.addEventListener("pointerleave", onLeave);
    return () => {
      scene.removeEventListener("pointermove", onMove);
      scene.removeEventListener("pointerleave", onLeave);
      if (s.raf) cancelAnimationFrame(s.raf);
      s.raf = 0;
    };
  }, [canTilt, max, scale]);

  if (!canTilt) return <>{children}</>;

  return (
    <div ref={sceneRef} className={`tilt-scene ${className}`}>
      <div ref={innerRef} className="tilt-inner">
        {children}
      </div>
    </div>
  );
}
