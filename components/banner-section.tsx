"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const features = ["Adaptive Fit", "Breathable", "Recycled", "All-Day", "Lightweight", "Weather Ready"];

export function BannerSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorWord, setCursorWord] = useState("DRAG");
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const smallScreen = window.matchMedia("(max-width: 700px)");
    const target = { x: 0, y: 0, cx: -80, cy: -80 };
    const current = { x: 0, y: 0, cx: -80, cy: -80 };
    const started = performance.now();
    let frame = 0;
    let speedBoost = 0;
    const onPointer = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      target.x = (event.clientX - rect.left - rect.width / 2) / rect.width;
      target.y = (event.clientY - rect.top - rect.height / 2) / rect.height;
      target.cx = event.clientX;
      target.cy = event.clientY;
      const element = event.target as HTMLElement;
      setCursorWord(element.closest(".orbit-core") ? "EXPLORE" : element.closest(".orbit-chip") ? "VIEW" : "DRAG");
    };
    const animate = (now: number) => {
      const elapsed = now - started;
      current.x += (target.x - current.x) * 0.08;
      current.y += (target.y - current.y) * 0.08;
      current.cx += (target.cx - current.cx) * 0.22;
      current.cy += (target.cy - current.cy) * 0.22;
      if (!reduceMotion.matches) {
        const rect = section.getBoundingClientRect();
        const radius = Math.min(rect.width * (smallScreen.matches ? 0.35 : 0.345), rect.height * 0.39);
        const orbitAngle = elapsed * (speedBoost ? 0.0003 : 0.000105);
        features.forEach((_, index) => {
          const chip = chipsRef.current[index];
          if (!chip) return;
          const angle = orbitAngle + index * Math.PI / 3;
          const depth = (Math.sin(angle) + 1) / 2;
          const x = Math.cos(angle) * radius + current.x * 14;
          const y = Math.sin(angle) * radius * 0.72 + current.y * 14;
          chip.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${0.84 + depth * 0.18})`;
          chip.style.opacity = `${0.56 + depth * 0.44}`;
          chip.style.filter = `blur(${(1 - depth) * 1.1}px)`;
          chip.style.zIndex = `${2 + Math.round(depth * 4)}`;
        });
        speedBoost = Math.max(0, speedBoost - 0.012);
        if (coreRef.current) coreRef.current.style.transform = `translate3d(${current.x * 10}px, ${current.y * 10 + Math.sin(elapsed * 0.0007) * 6}px, 0)`;
        if (ringsRef.current) ringsRef.current.style.transform = `translate3d(${current.x * 6}px, ${current.y * 6}px, 0) rotate(${elapsed * 0.0025}deg)`;
      }
      if (cursorRef.current) {
        cursorRef.current.style.left = `${current.cx}px`;
        cursorRef.current.style.top = `${current.cy}px`;
      }
      frame = requestAnimationFrame(animate);
    };
    const onClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest(".orbit-core__button")) {
        speedBoost = 1;
        setPulse(true);
        window.setTimeout(() => setPulse(false), 850);
      }
    };
    section.addEventListener("pointermove", onPointer);
    section.addEventListener("click", onClick);
    frame = requestAnimationFrame(animate);
    return () => {
      section.removeEventListener("pointermove", onPointer);
      section.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section className="banner orbit-hero" aria-labelledby="orbit-title" ref={sectionRef}>
      <div className="orbit-hero__wash orbit-hero__wash--a" aria-hidden="true" />
      <div className="orbit-hero__wash orbit-hero__wash--b" aria-hidden="true" />
      <div className="orbit-hero__noise" aria-hidden="true" />
      <div className="orbit-stage">
        <div className="orbit-rings" ref={ringsRef} aria-hidden="true">
          <span className="orbit-ring orbit-ring--inner" />
          <span className="orbit-ring orbit-ring--outer" />
          <i className="orbit-ring-dot orbit-ring-dot--a" />
          <i className="orbit-ring-dot orbit-ring-dot--b" />
        </div>
        {features.map((feature, index) => (
          <Link key={feature} ref={(node) => { chipsRef.current[index] = node; }} className="orbit-chip" href="/collections" aria-label={`Explore ${feature}`}>
            <span aria-hidden="true" />{feature}
          </Link>
        ))}
        <div className={`orbit-core${pulse ? " orbit-core--pulse" : ""}`} ref={coreRef}>
          <button className="orbit-core__button" type="button" aria-label="Explore the spatial collection">
            <span className="orbit-core__eyebrow">Spatial Collection</span>
            <h1 id="orbit-title"><span>Move With</span><span>Intention</span></h1>
            <p>Designed for motion, made for every day.</p>
            <span className="orbit-core__link">Explore the edit <b aria-hidden="true">↗</b></span>
          </button>
          {pulse && <span className="orbit-core__ripple" aria-hidden="true" />}
        </div>
      </div>
      <div className="orbit-footer"><span>01 / 04 <i /> New season, considered</span><Link href="/products">Discover the collection <b aria-hidden="true">↗</b></Link></div>
      <div className="orbit-cursor" ref={cursorRef} aria-hidden="true"><span>{cursorWord}</span><i /></div>
    </section>
  );
}
