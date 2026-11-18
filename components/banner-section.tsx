"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const orbitLabels = ["Adaptive Fit", "Breathable", "Recycled", "All-Day", "Lightweight", "Weather Ready"];

export function BannerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });
  const [ripple, setRipple] = useState(false);
  const [cursorLabel, setCursorLabel] = useState("DRAG");

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobile = window.matchMedia("(max-width: 768px)");
    let frame = 0;
    let start = performance.now();
    let pauseUntil = 0;
    const cursorPosition = { x: -100, y: -100, tx: -100, ty: -100 };
    const onMove = (event: PointerEvent) => {
      const bounds = section.getBoundingClientRect();
      pointer.current.tx = (event.clientX - bounds.left - bounds.width / 2) / bounds.width;
      pointer.current.ty = (event.clientY - bounds.top - bounds.height / 2) / bounds.height;
      const target = event.target as HTMLElement;
      if (target.closest(".orbit-core, .orbit-chip")) pauseUntil = performance.now() + 250;
      setCursorLabel(target.closest("[data-cursor='explore']") ? "EXPLORE" : target.closest("[data-cursor='view']") ? "VIEW" : "DRAG");
    };
    const animate = (now: number) => {
      const elapsed = now - start;
      const p = pointer.current;
      p.x += (p.tx - p.x) * 0.08;
      p.y += (p.ty - p.y) * 0.08;
      cursorPosition.x += (cursorPosition.tx - cursorPosition.x) * 0.22;
      cursorPosition.y += (cursorPosition.ty - cursorPosition.y) * 0.22;
      if (!reduced.matches) {
        const paused = now < pauseUntil;
        const speed = paused ? 0.00008 : 0.00012;
        const angle = (now - start) * speed;
        const rect = section.getBoundingClientRect();
        const radius = Math.min(rect.width * (mobile.matches ? 0.35 : 0.34), rect.height * 0.35);
        chipsRef.current.forEach((chip, i) => {
          if (!chip) return;
          const a = angle + (Math.PI * 2 * i) / orbitLabels.length;
          const x = Math.cos(a) * radius;
          const y = Math.sin(a) * radius * 0.72;
          const depth = (Math.sin(a) + 1) / 2;
          chip.style.transform = `translate3d(calc(${x}px + ${p.x * 14}px), calc(${y}px + ${p.y * 14}px), 0) scale(${0.82 + depth * 0.22})`;
          chip.style.opacity = String(0.46 + depth * 0.54);
          chip.style.filter = `blur(${(1 - depth) * 1.2}px)`;
          chip.style.zIndex = String(2 + Math.round(depth * 4));
        });
        if (coreRef.current) coreRef.current.style.transform = `translate3d(${p.x * 10}px, calc(${Math.sin(elapsed * 0.0007) * 7}px + ${p.y * 10}px), 0)`;
        if (ringRef.current) ringRef.current.style.transform = `translate3d(${p.x * 6}px, ${p.y * 6}px, 0) rotate(${elapsed * 0.003}deg)`;
      }
      if (cursorRef.current) {
        cursorRef.current.style.left = `${cursorPosition.x}px`;
        cursorRef.current.style.top = `${cursorPosition.y}px`;
      }
      frame = requestAnimationFrame(animate);
    };
    const moveCursor = (event: PointerEvent) => { cursorPosition.tx = event.clientX; cursorPosition.ty = event.clientY; onMove(event); };
    section.addEventListener("pointermove", moveCursor);
    frame = requestAnimationFrame(animate);
    return () => { section.removeEventListener("pointermove", moveCursor); cancelAnimationFrame(frame); };
  }, []);

  const onCoreClick = () => {
    setRipple(false);
    requestAnimationFrame(() => setRipple(true));
    window.setTimeout(() => setRipple(false), 850);
  };

  return (
    <section className="orbit-hero" aria-labelledby="orbit-title" ref={sectionRef}>
      <div className="orbit-hero__ambient orbit-hero__ambient--one" aria-hidden="true" />
      <div className="orbit-hero__ambient orbit-hero__ambient--two" aria-hidden="true" />
      <div className="orbit-hero__grain" aria-hidden="true" />
      <div className="orbit-hero__stage">
        <div className="orbit-hero__rings" ref={ringRef} aria-hidden="true">
          <span className="orbit-hero__ring orbit-hero__ring--inner" />
          <span className="orbit-hero__ring orbit-hero__ring--outer" />
          <i className="orbit-hero__glow orbit-hero__glow--one" />
          <i className="orbit-hero__glow orbit-hero__glow--two" />
        </div>
        {orbitLabels.map((label, i) => (
          <Link key={label} href="/collections" ref={(el) => { chipsRef.current[i] = el; }} className={`orbit-chip orbit-chip--${i + 1}`} data-cursor="view" aria-label={`${label} collection feature`}>
            <span className="orbit-chip__dot" aria-hidden="true" />{label}
          </Link>
        ))}
        <div className={`orbit-core${ripple ? " orbit-core--ripple" : ""}`} ref={coreRef} data-cursor="explore">
          <button className="orbit-core__button" onClick={onCoreClick} aria-label="Explore the spatial collection">
            <span className="orbit-core__label">Spatial Collection</span>
            <h1 id="orbit-title"><span>Move With</span><span>Intention</span></h1>
            <p>Designed for motion, made for every day.</p>
            <span className="orbit-core__cta">Explore the edit <span aria-hidden="true">↗</span></span>
          </button>
          {ripple && <span className="orbit-core__pulse" aria-hidden="true" />}
        </div>
      </div>
      <div className="orbit-hero__footer"><span>01 / 04 — New season, considered</span><Link href="/products">Discover the collection <span aria-hidden="true">↗</span></Link></div>
      <div className="orbit-cursor" ref={cursorRef} aria-hidden="true"><span>{cursorLabel}</span></div>
    </section>
  );
}
