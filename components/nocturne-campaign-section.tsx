"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Check, Sparkles, Eye, Compass } from "lucide-react";

interface NocturneCampaignSectionProps {
  onNotify?: (msg: string) => void;
}

export function NocturneCampaignSection({ onNotify }: NocturneCampaignSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // WebGL setup
    let gl: WebGLRenderingContext | null = null;
    try {
      gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    } catch {
      return;
    }
    if (!gl) {
      console.warn("WebGL not supported on this browser.");
      return;
    }

    let animationFrameId: number;
    let isDestroyed = false;

    function syncSize() {
      if (!canvas) return;
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || 650;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        syncSize();
      });
      resizeObserver.observe(canvas);
    }
    syncSize();

    // Vertex Shader
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader (তরল এমারেল্ড সিল্ক ও সোনালি জারি শিমার)
    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;

      // Simplex Noise ক্যালকুলেশন হেল্পার
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
        m = m * m;
        m = m * m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
        vec3 g;
        g.x  = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 mouse = u_mouse / u_resolution;

        // OOTFY লাক্সারি কালার প্যালেট
        vec3 darkBase     = vec3(0.047, 0.090, 0.071); // গভীর ব্ল্যাক-এমারেল্ড (#0c1712)
        vec3 deepEmerald  = vec3(0.078, 0.145, 0.114); // রয়্যাল এমারেল্ড (#14251d)
        vec3 richPine     = vec3(0.125, 0.220, 0.176); // ফরেস্ট গ্রিন (#20382d)
        vec3 antiqueGold  = vec3(0.722, 0.592, 0.345); // অ্যান্টিক গোল্ড জারি (#b89758)
        vec3 subtleLuster = vec3(0.850, 0.750, 0.520); // সিল্ক স্পেকুলার লাস্টার

        float t = u_time * 0.15;

        // মাউস ট্র্যাকিং ইন্টারঅ্যাকশন
        vec2 mDelta = (uv - mouse) * 0.2;
        vec2 p = uv * 2.5 + mDelta;

        // হ্যান্ডলুম সিল্কের তরল ঢেউ (Flowing Fabric Noise)
        float n1 = snoise(p + vec2(t * 0.3, t * 0.15));
        float n2 = snoise(p * 2.0 - vec2(t * 0.2, n1 * 0.6));
        float n3 = snoise(p * 3.5 + vec2(n2 * 0.4, t * 0.1));

        // সিল্ক থ্রেড কার্ভেচার ও ওয়েভ
        float silkWave  = sin(uv.y * 12.0 + n1 * 3.0 + t * 0.8) * 0.5 + 0.5;
        float silkWave2 = cos(uv.x * 10.0 + n2 * 2.5 - t * 0.5) * 0.5 + 0.5;

        // বেস এমারেল্ড গ্র্যাডিয়েন্ট ব্লেন্ড
        vec3 col = mix(darkBase, deepEmerald, uv.y * 0.8 + 0.2);
        col = mix(col, richPine, clamp(n1 * 0.5 + 0.5, 0.0, 1.0) * 0.7);

        // গোল্ডেন জারি সুতোর মৃদু শিমার এফেক্ট (Zari Thread Shimmer)
        float zariShimmer = pow(clamp(n2 * n3 * 1.5 + silkWave * 0.4, 0.0, 1.0), 4.5);
        col += antiqueGold * zariShimmer * 0.65;

        // সিল্ক টেক্সটাইলের স্পেকুলার হাইলাইট
        float highlight = pow(clamp(silkWave * silkWave2 + n3 * 0.2, 0.0, 1.0), 6.0);
        col += subtleLuster * highlight * 0.4;

        // চারপাশে সফট ভিনিয়েট (Soft Vignette)
        vec2 d = uv - vec2(0.5);
        float vignette = 1.0 - dot(d, d) * 0.6;
        col *= vignette;

        gl_FragColor = vec4(col, 0.95);
      }
    `;

    // Shader compiler helper
    function compileShader(type: number, src: string) {
      if (!gl) return null;
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s));
        gl.deleteShader(s);
        return null;
      }
      return s;
    }

    const vShader = compileShader(gl.VERTEX_SHADER, vsSource);
    const fShader = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vShader || !fShader) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vShader);
    gl.attachShader(prog, fShader);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    // Fullscreen quad buffer
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const pos = gl.getAttribLocation(prog, "a_position");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    // Mouse movement tracking
    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const handleMouseMove = (event: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (event.clientX - rect.left) / rect.width;
        const ny = 1.0 - (event.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Render Loop
    function render(time: number) {
      if (isDestroyed || !gl || !canvas) return;
      if (!resizeObserver) syncSize();

      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, time * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationFrameId = requestAnimationFrame(render);
    }
    animationFrameId = requestAnimationFrame(render);

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      if (resizeObserver) resizeObserver.disconnect();
      if (buf) gl.deleteBuffer(buf);
      if (prog) gl.deleteProgram(prog);
      if (vShader) gl.deleteShader(vShader);
      if (fShader) gl.deleteShader(fShader);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-[#0c1712] min-h-[680px] lg:min-h-[750px] flex items-center"
      aria-label="The Nocturne of Bengal Campaign"
    >
      {/* 1. Animated WebGL Emerald Shader Canvas */}
      <canvas
        ref={canvasRef}
        id="emerald-shader-canvas"
        className="absolute inset-0 w-full h-full block pointer-events-none"
        style={{ width: "100%", height: "100%" }}
      />

      {/* Ambient Radial Fallback in case WebGL is initializing or on mobile */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(32,56,45,0.7) 0%, rgba(20,37,29,0.3) 50%, transparent 80%)",
        }}
      />

      {/* 2. Foreground Luxury Editorial Content */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Campaign Narrative (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Limited Edition Dispatch Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-[#b89758]/50 bg-[#0c1712]/80 backdrop-blur-md mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#d4af37] font-semibold">
                LIMITED CAMPAIGN DISPATCH • 07 PIECES CRAFTED
              </span>
            </div>

            {/* Campaign Master Title */}
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-normal tracking-wide leading-[1.12] mb-3">
              THE NOCTURNE OF<br />BENGAL
            </h2>

            {/* Subtitle with Antique Zari Italic */}
            <p className="font-serif italic text-lg sm:text-xl text-[#d4af37]/90 tracking-wide mb-6">
              Heritage Emerald Jamdani &amp; 24K Handcrafted Zardozi
            </p>

            {/* Price & Artisan Specs Strip */}
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-white/90 mb-6 py-2 border-y border-white/10 w-full max-w-xl">
              <span className="font-serif text-2xl sm:text-3xl font-medium text-white tracking-tight">
                ৳ 38,500
              </span>
              <span className="text-white/30">•</span>
              <span className="text-[#e5e8e4] text-xs font-medium uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                45 Days Handloom Weave
              </span>
              <span className="text-white/30">•</span>
              <span className="text-[10px] uppercase tracking-widest text-[#d4af37] bg-[#b89758]/20 border border-[#b89758]/50 px-2.5 py-1 rounded-full font-semibold">
                Master Artisan Piece
              </span>
            </div>

            {/* Story Paragraph */}
            <p className="text-sm sm:text-base text-[#e5e8e4]/85 leading-relaxed max-w-xl mb-8 font-light">
              Handcrafted on heritage pit looms along the Shitalakhya river, woven with superfine muslin and adorned with antique bullion gold zardozi motifs. Each piece reflects three generations of Bangladeshi weaving mastery.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              <button
                type="button"
                onClick={() =>
                  onNotify?.(
                    "Reservation request recorded for The Nocturne of Bengal. Atelier concierge will contact you."
                  )
                }
                className="w-full sm:w-auto px-7 py-3.5 bg-[#b89758] hover:bg-[#c9a768] text-[#0c1712] text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-lg shadow-[#b89758]/20 flex items-center justify-center gap-2.5 cursor-pointer active:scale-95"
              >
                <Check className="w-4 h-4 stroke-[2.5]" />
                <span>Reserve Atelier Piece</span>
              </button>

              <button
                type="button"
                onClick={() =>
                  onNotify?.(
                    "360° Studio Experience active. You are viewing the Shitalakhya Heritage Edition."
                  )
                }
                className="w-full sm:w-auto px-7 py-3.5 bg-white/5 hover:bg-white/10 border border-white/30 text-white text-xs uppercase tracking-[0.18em] font-medium transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2.5 cursor-pointer active:scale-95"
              >
                <Sparkles className="w-4 h-4 text-[#d4af37]" />
                <span>Experience in 360° / Try-On</span>
              </button>
            </div>
          </div>

          {/* Right Column: Masterpiece Showcase Card (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[440px] aspect-[3/4] rounded-sm overflow-hidden shadow-2xl border border-white/20 bg-[#d8cec3] group">
              {/* Garment Image on Pedestal */}
              <Image
                src="/assets/eid/nocturne-garment-clean.jpg"
                alt="The Nocturne of Bengal - Heritage Emerald Jamdani"
                fill
                unoptimized
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                priority
              />

              {/* Top Campaign Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 bg-white/95 backdrop-blur-md text-[10px] uppercase tracking-[0.2em] text-[#1c1c19] font-medium shadow-md">
                  • CAMPAIGN ADVERTISEMENT • 2026
                </span>
              </div>

              {/* Bottom Information Badges */}
              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between z-10 gap-2">
                <span className="px-3 py-1.5 bg-[#0c1712]/80 backdrop-blur-md text-[10px] uppercase tracking-wider text-[#e5e8e4] font-medium border border-white/15 shadow-sm">
                  Shitalakhya Loom Archive
                </span>

                <button
                  type="button"
                  onClick={() =>
                    onNotify?.(
                      "Weave Inspector: 100-count Dhakai Muslin weft, genuine 24K gold zardozi bullion wire."
                    )
                  }
                  className="px-3 py-1.5 bg-[#0c1712]/85 hover:bg-[#0c1712] backdrop-blur-md text-[10px] uppercase tracking-wider text-[#d4af37] font-medium border border-[#b89758]/50 transition-all flex items-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
                >
                  <Eye className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span>Inspect Weave</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
