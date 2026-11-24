/* eslint-disable */
// Coverflow Gallery — Originkit
"use client";

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  type CSSProperties,
} from "react";

const useIsStaticRenderer = () => false;

export interface Slide {
  image?: { src?: string; srcSet?: string; alt?: string };
  title?: string;
}

export type AutoplayDir = "leftToRight" | "rightToLeft";
export type TitleCorner = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

export interface Smooth3DSlideshowProps {
  slides?: Slide[];
  cardWidth?: number;
  cardHeight?: number;
  radius?: number;
  tilt?: number;
  sideTilt?: number;
  gap?: number;
  opacity?: number;
  transition?: any;
  autoplay?: boolean;
  autoplayDirection?: AutoplayDir;
  showTitle?: boolean;
  titleFont?: CSSProperties;
  titleColor?: string;
  titlePosition?: {
    position?: TitleCorner;
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
  };
  style?: CSSProperties;
}

export const DEFAULT_DRESS_SLIDES: Slide[] = [
  {
    image: {
      src: "/assets/hero/hero-banner-master.jpg",
      alt: "Embroidered Ivory Panjabi",
    },
    title: "Embroidered Ivory Panjabi\nHandloom Cotton-Silk · Atelier 01",
  },
  {
    image: {
      src: "/assets/products/jamdani-saree-clean.jpg",
      alt: "Handloom Jamdani Saree",
    },
    title: "Handloom Jamdani Saree\nTraditional Heritage Muslin Weave",
  },
  {
    image: {
      src: "/assets/eid/eid-espresso-panjabi.jpg",
      alt: "Zardozi Embroidered Silk Kurta",
    },
    title: "Zardozi Silk Kurta\nAntique Gold Threadwork · The Eid Edit",
  },
  {
    image: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoFHKrK_pzA3MAoy-T41foeGmDQxJ0Wzcvk68JSpVpPJUty7qH4nx0IJNuFFjnKMHMiMIAj2Tr2EEv1p_AlVi5BQdKmUq2X_s_MA93FcfeqLhoiAuLsTu4NZypKr3W3iSvlftVfCEVpAV3JilELtV5jpN7qPlAHKbYJbXV9tsTf8AEvJyeIilVwSj3dV5Sf-rmKRzrYePi7PCtsrj2-xIHmGw4MF3WILCYvms8xyM=s0",
      alt: "Tailored Olive Linen Blazer",
    },
    title: "Tailored Olive Blazer\nBelgian Flax Linen · Modern Silhouette",
  },
  {
    image: {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBaHEhrOg3rqjVYFyAaT_FhKLFkCkrCMOZOGzHAgOQabQL6MjrKy9tH16rH4EI7wi6b2dORwohONtNL_fOwNRd25jXY5bHVv2cYlP_PQA3_v573jK1EuaEWCvAFmgFPT0nM-S3OH4CF8Q3PKAq0x0X2BkKhlC-n2e1OkeUnn3NXr4ik6CnPtcsIe5JVCorVtqXe70WtHKYZouQx1Wpc8sxj702NGJNsORjJ9LEaDPY=s0",
      alt: "Raw Silk Three-Piece Ensemble",
    },
    title: "Raw Silk Three-Piece\nPure Rajshahi Silk Ensemble",
  },
  {
    image: {
      src: "/assets/eid/eid-folded-silks.jpg",
      alt: "Antique Gold Tissue Saree",
    },
    title: "Antique Gold Tissue Saree\nHandwoven Gold Zari Weave",
  },
];

// Fixed internals (no longer exposed as controls).
const PERSPECTIVE = 1600;
const SCALE_STEP = 0.16;
const MAX_VISIBLE = 2;
// In a preserve-3d context paint order follows 3D position, not z-index, so the
// centre is pushed nearest the viewer and neighbours fall back behind it.
const DEPTH = 240;

// Derive a CSS transition (duration + easing) from a Framer Transition value.
function cssTransition(t: any): { dur: number; ease: string } {
  const dur = t && typeof t.duration === "number" ? t.duration : 0.6;
  let ease = "cubic-bezier(0.22, 1, 0.36, 1)";
  const e = t?.ease;
  if (Array.isArray(e) && e.length === 4) {
    ease = `cubic-bezier(${e[0]}, ${e[1]}, ${e[2]}, ${e[3]})`;
  } else if (typeof e === "string") {
    const map: Record<string, string> = {
      linear: "linear",
      easeIn: "ease-in",
      easeOut: "ease-out",
      easeInOut: "ease-in-out",
    };
    ease = map[e] || "ease";
  }
  return { dur, ease };
}

/**
 * Smooth 3D Slideshow
 *
 * A 3D coverflow: the active card sits upright in the spotlight while its
 * neighbours tilt back in perspective. Click any card to smoothly bring it to
 * centre. Recreated after Tanya Prokofieva's Framer original.
 */
function __OriginkitBase_Smooth3DSlideshow(props: Smooth3DSlideshowProps) {
  props = { ...COMPONENT_DEFAULTS, ...props };
  const {
    slides = DEFAULT_DRESS_SLIDES,
    cardWidth = 380,
    cardHeight = 480,
    radius = 2,
    tilt = 12,
    sideTilt = 6,
    gap = 8,
    opacity = 60,
    transition,
    autoplay = true,
    autoplayDirection = "rightToLeft",
    showTitle = true,
    titleFont,
    titleColor = "#ffffff",
    titlePosition,
    style,
  } = props;

  // Responsive adjustments for small viewports
  const [effectiveCardWidth, setEffectiveCardWidth] = useState(cardWidth);
  const [effectiveCardHeight, setEffectiveCardHeight] = useState(cardHeight);

  useEffect(() => {
    const updateSize = () => {
      if (typeof window !== "undefined") {
        const w = window.innerWidth;
        if (w < 480) {
          const cw = Math.min(cardWidth, w - 48);
          setEffectiveCardWidth(cw);
          setEffectiveCardHeight(Math.round(cw * 1.25));
        } else if (w < 768) {
          const cw = Math.min(cardWidth, 320);
          setEffectiveCardWidth(cw);
          setEffectiveCardHeight(420);
        } else if (w < 1024) {
          setEffectiveCardWidth(Math.min(cardWidth, 340));
          setEffectiveCardHeight(450);
        } else {
          setEffectiveCardWidth(cardWidth);
          setEffectiveCardHeight(cardHeight);
        }
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [cardWidth, cardHeight]);

  const tp = titlePosition || {};
  const corner: TitleCorner = tp.position || "bottomLeft";
  const isTop = corner === "topLeft" || corner === "topRight";
  const isRight = corner === "topRight" || corner === "bottomRight";
  const padLeft = tp.paddingLeft ?? 22;
  const padRight = tp.paddingRight ?? 22;
  const padTop = tp.paddingTop ?? 24;
  const padBottom = tp.paddingBottom ?? 24;

  const isStatic = useIsStaticRenderer();
  const list = slides && slides.length ? slides : DEFAULT_DRESS_SLIDES;
  const n = list.length;

  // Loop is always on.
  const loop = true;
  const [active, setActive] = useState(0);

  // Keep active valid if the slide list changes.
  useEffect(() => {
    setActive((a) => Math.max(0, Math.min(n - 1, a)));
  }, [n]);

  // Lock input while a card is mid-move; release once it settles.
  const moveDur =
    transition && typeof transition.duration === "number"
      ? transition.duration
      : 0.6;
  const lockRef = useRef(false);
  const lock = useCallback(() => {
    lockRef.current = true;
    window.setTimeout(
      () => {
        lockRef.current = false;
      },
      Math.max(50, moveDur * 1000)
    );
  }, [moveDur]);

  const step = useCallback(
    (dir: number) => {
      if (lockRef.current) return;
      lock();
      setActive((a) => (((a + dir) % n) + n) % n);
    },
    [n, lock]
  );

  const handleCardClick = useCallback(
    (i: number) => {
      if (isStatic || lockRef.current) return;
      lock();
      setActive(i);
    },
    [isStatic, lock]
  );

  // Autoplay
  const delay =
    transition && typeof transition.delay === "number"
      ? transition.delay
      : 3.5;

  useEffect(() => {
    if (isStatic || !autoplay || n < 2) return;
    const ms = Math.max(0.3, delay) * 1000;
    const dir = autoplayDirection === "leftToRight" ? -1 : 1;
    const id = window.setInterval(() => step(dir), ms);
    return () => window.clearInterval(id);
  }, [isStatic, autoplay, autoplayDirection, delay, n, step]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        step(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        step(-1);
      }
    },
    [step]
  );

  const { dur, ease } = cssTransition(transition);
  const transitionCss = `transform ${dur}s ${ease}, opacity ${dur}s ${ease}`;

  // Rounded scale 0–20
  const effectiveRadius =
    (Math.max(0, Math.min(20, radius)) / 20) *
    (Math.min(effectiveCardWidth, effectiveCardHeight) / 2);

  // Inactive opacity: 100% = fully visible, 0% = hidden. Overlay is the inverse.
  const dim = 1 - Math.max(0, Math.min(100, opacity)) / 100;

  const rootStyle: CSSProperties = {
    ...(style || {}),
    position: "relative",
    width: "100%",
    height: "100%",
    minHeight: 460,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    perspective: `${PERSPECTIVE}px`,
    overflow: "hidden",
    outline: "none",
  };

  return (
    <div
      style={rootStyle}
      tabIndex={0}
      role="group"
      aria-roledescription="carousel"
      onKeyDown={isStatic ? undefined : onKeyDown}
    >
      <div
        style={{
          position: "relative",
          width: effectiveCardWidth,
          height: effectiveCardHeight,
          transformStyle: "preserve-3d",
        }}
      >
        {list.map((slide, i) => {
          let rel = i - active;
          if (loop) {
            if (rel > n / 2) rel -= n;
            if (rel < -n / 2) rel += n;
          }
          const ax = Math.abs(rel);
          const visible = ax <= MAX_VISIBLE;
          const isActive = rel === 0;
          const sc = Math.max(0.4, 1 - ax * SCALE_STEP);
          // Gap 0–20 → spacing
          const tx = rel * (gap * 28);
          const tz = -ax * DEPTH;
          const ry = -rel * tilt;
          const rz = rel * sideTilt;
          const src = slide.image?.src || "";

          const cardStyle: CSSProperties = {
            position: "absolute",
            left: "50%",
            top: "50%",
            width: effectiveCardWidth,
            height: effectiveCardHeight,
            borderRadius: effectiveRadius,
            overflow: "hidden",
            transformStyle: "preserve-3d",
            transformOrigin: "center center",
            transform: `translate(-50%, -50%) translateX(${tx}px) translateZ(${tz}px) rotateY(${ry}deg) rotateZ(${rz}deg) scale(${sc})`,
            transition: transitionCss,
            opacity: visible ? 1 : 0,
            cursor: isActive ? "default" : "pointer",
            pointerEvents: visible && !isStatic ? "auto" : "none",
            backgroundColor: "#1c251f",
            boxShadow: isActive
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.45), 0 0 0 1px rgba(255,255,255,0.12)"
              : "0 15px 30px -10px rgba(0, 0, 0, 0.35)",
          };

          return (
            <div
              key={i}
              style={cardStyle}
              onClick={isStatic ? undefined : () => handleCardClick(i)}
              aria-label={slide.title}
              aria-hidden={!visible}
            >
              {src ? (
                <img
                  src={src}
                  alt={slide.image?.alt || slide.title || ""}
                  draggable={false}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    userSelect: "none",
                  }}
                />
              ) : null}

              {showTitle && (
                <>
                  {/* Gradient for legibility */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: isTop
                        ? "linear-gradient(0deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.75) 100%)"
                        : "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.85) 100%)",
                      pointerEvents: "none",
                    }}
                  />

                  {/* Title at chosen corner */}
                  <div
                    style={{
                      position: "absolute",
                      left: padLeft,
                      right: padRight,
                      [isTop ? "top" : "bottom"]: isTop ? padTop : padBottom,
                      textAlign: isRight ? "right" : "left",
                      pointerEvents: "none",
                    }}
                  >
                    <span
                      style={{
                        color: titleColor,
                        fontSize: 20,
                        fontWeight: 600,
                        lineHeight: "1.25em",
                        letterSpacing: "-0.01em",
                        whiteSpace: "pre-line",
                        textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                        fontFamily: "var(--font-serif, Cormorant Garamond, serif)",
                        ...(titleFont || {}),
                      }}
                    >
                      {slide.title}
                    </span>
                  </div>
                </>
              )}

              {/* Dim overlay (darkens inactive cards entirely) */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#000000",
                  opacity: isActive ? 0 : dim,
                  transition: `opacity ${dur}s ${ease}`,
                  pointerEvents: "none",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Navigation Indicators */}
      <div
        style={{
          position: "absolute",
          bottom: 12,
          display: "flex",
          alignItems: "center",
          gap: 6,
          zIndex: 10,
        }}
      >
        {list.map((_, dotIdx) => (
          <button
            key={dotIdx}
            type="button"
            onClick={() => handleCardClick(dotIdx)}
            aria-label={`Go to slide ${dotIdx + 1}`}
            style={{
              width: dotIdx === active ? 22 : 6,
              height: 4,
              borderRadius: 2,
              backgroundColor: dotIdx === active ? "#755a21" : "rgba(0,0,0,0.25)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

const COMPONENT_DEFAULTS = {
  slides: DEFAULT_DRESS_SLIDES,
  cardWidth: 380,
  cardHeight: 480,
  radius: 2,
  tilt: 12,
  sideTilt: 6,
  gap: 8,
  opacity: 60,
  autoplay: true,
  autoplayDirection: "rightToLeft" as AutoplayDir,
  transition: {
    type: "tween",
    duration: 0.6,
    delay: 3.5,
    ease: [0.22, 1, 0.36, 1],
  },
  showTitle: true,
  titleFont: {
    fontFamily: "var(--font-serif, Cormorant Garamond, Georgia, serif)",
    fontSize: "20px",
    letterSpacing: "-0.01em",
    lineHeight: "1.25em",
  } as any,
  titleColor: "#ffffff",
  titlePosition: {
    position: "bottomLeft" as TitleCorner,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 22,
  },
};

export default function Smooth3DSlideshow(props: Smooth3DSlideshowProps) {
  return <__OriginkitBase_Smooth3DSlideshow {...props} />;
}
