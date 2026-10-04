import { useEffect, useRef, type ReactNode } from "react";
import { useFineHover, useReducedMotion } from "../hooks/useReducedMotion";

/**
 * Dramatic 3D tilt with a pointer-driven shine sweep across car imagery.
 *
 * Motion recipe (per the animation skills): transform/opacity only,
 * spring-lerped via rAF so rapid pointer moves retarget smoothly instead of
 * restarting. 3D rotation is a Tier-1 vestibular trigger, so the entire effect
 * is removed under prefers-reduced-motion and on touch devices — static
 * imagery remains, with Tier-3 color/opacity feedback untouched.
 */
export function Tilt({
  children,
  max = 10,
  scale = 1.03,
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
  const shineRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    tx: 0,
    ty: 0,
    ts: 1,
    px: 0,
    po: 0,
    cx: 0,
    cy: 0,
    cs: 1,
    cpx: 0,
    co: 0,
    raf: 0,
    hovering: false,
  });

  const canTilt = !reduced && fineHover;

  useEffect(() => {
    if (!canTilt) return;
    const scene = sceneRef.current;
    const inner = innerRef.current;
    const shine = shineRef.current;
    if (!scene || !inner || !shine) return;
    const s = stateRef.current;
    // Reset any stale state from a previous activation.
    s.tx = s.ty = 0;
    s.ts = 1;
    s.px = s.po = 0;
    s.cx = s.cy = 0;
    s.cs = 1;
    s.cpx = s.co = 0;
    s.hovering = false;
    if (s.raf) cancelAnimationFrame(s.raf);
    s.raf = 0;
    inner.style.transform = "";
    shine.style.opacity = "0";

    const tick = () => {
      const k = 0.16;
      s.cx += (s.tx - s.cx) * k;
      s.cy += (s.ty - s.cy) * k;
      s.cs += (s.ts - s.cs) * k;
      s.cpx += (s.px - s.cpx) * k;
      s.co += (s.po - s.co) * k;
      // Full transform strings: hardware-accelerated, set directly on the elements.
      inner.style.transform = `rotateX(${s.cx.toFixed(2)}deg) rotateY(${s.cy.toFixed(
        2
      )}deg) scale(${s.cs.toFixed(3)})`;
      shine.style.transform = `translateX(${(s.cpx * 70).toFixed(1)}%)`;
      shine.style.opacity = (s.co * 0.55).toFixed(3);
      const settled =
        Math.abs(s.tx - s.cx) < 0.01 &&
        Math.abs(s.ty - s.cy) < 0.01 &&
        Math.abs(s.ts - s.cs) < 0.001 &&
        Math.abs(s.po - s.co) < 0.01;
      if (!s.hovering && settled) {
        inner.style.transform = "";
        shine.style.opacity = "0";
        shine.style.transform = "";
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
      s.px = px;
      s.po = 1;
      s.hovering = true;
      start();
    };
    const onLeave = () => {
      s.tx = 0;
      s.ty = 0;
      s.ts = 1;
      s.px = 0;
      s.po = 0;
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
      <div ref={innerRef} className="tilt-inner tilt-shine-wrap">
        {children}
        <div ref={shineRef} className="tilt-shine" aria-hidden="true" />
      </div>
    </div>
  );
}
