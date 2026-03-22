"use client";

import { useEffect, useRef } from "react";

const keywords = [
  "Tutorials",
  "SaaS Demos",
  "Product Updates",
  "Design Reviews",
  "Code Walkthroughs",
  "Startup Pitches",
  "Team Updates",
  "Social Content",
  "Bug Reports",
  "Onboarding",
  "Release Notes",
  "App Previews",
  "YouTube",
  "Prototypes",
];

function MarqueeBand({
  speed,
  reverse,
  opacity,
  top,
}: {
  speed: number;
  reverse?: boolean;
  opacity: number;
  top: string;
}) {
  const repeated = [...keywords, ...keywords, ...keywords, ...keywords];
  return (
    <div
      className="absolute left-[-10%] w-[120%] overflow-hidden whitespace-nowrap pointer-events-none select-none"
      style={{ top, opacity, transform: "rotate(-12deg)" }}
      aria-hidden="true"
    >
      <div
        className="inline-flex gap-8"
        style={{
          animation: `hero-marquee ${speed}s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {repeated.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="text-[3.5rem] md:text-[5rem] font-bold text-gray-900/[0.028] tracking-tight shrink-0"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = (entry.target as HTMLElement).dataset.delay || "0";
            setTimeout(
              () => entry.target.classList.add("visible"),
              parseFloat(delay) * 1000,
            );
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );
    if (sectionRef.current) {
      sectionRef.current
        .querySelectorAll(".animate-on-scroll")
        .forEach((el) => observer.observe(el));
    }
    return () => observer.disconnect();
  }, []);

  // Scroll-driven video reveal + autoplay
  useEffect(() => {
    const container = videoContainerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    video.pause();

    const videoObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            container.classList.add("hero-video-visible");
            video.play().catch(() => {});
            videoObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    videoObserver.observe(container);

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowH = window.innerHeight;
      const progress = Math.min(
        Math.max((windowH - rect.top) / (windowH * 0.6), 0),
        1,
      );
      container.style.setProperty("--scroll-progress", String(progress));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      videoObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="pt-24 pb-16 px-6 bg-[#f5f7ff] relative overflow-hidden"
    >
      {/* 3D Marquee bands */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true"
        style={{ perspective: "1200px" }}
      >
        <div style={{ transformStyle: "preserve-3d", transform: "rotateX(8deg)" }} className="absolute inset-0">
          <MarqueeBand speed={525} opacity={0.9} top="8%" />
          <MarqueeBand speed={455} reverse opacity={0.7} top="30%" />
          <MarqueeBand speed={595} opacity={0.5} top="52%" />
          <MarqueeBand speed={490} reverse opacity={0.6} top="74%" />
          <MarqueeBand speed={560} opacity={0.4} top="92%" />
        </div>
      </div>

      {/* Gradient orbs */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.15]"
          style={{
            background: "radial-gradient(circle, #b9ddff 0%, transparent 70%)",
            top: "-10%",
            right: "-5%",
            animation: "hero-orb 20s ease-in-out infinite",
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-[0.12]"
          style={{
            background: "radial-gradient(circle, #a3bffa 0%, transparent 70%)",
            bottom: "5%",
            left: "-8%",
            animation: "hero-orb 25s ease-in-out 3s infinite reverse",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Main Headline */}
        <h1 className="animate-on-load text-5xl md:text-7xl lg:text-[84px] font-bold tracking-tight text-gray-900 leading-[1.05] mb-10 max-w-5xl mx-auto">
          Expert Edits.
          <br className="hidden md:block" />
          <span className="gradient-text">In Record Time.</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-on-load delay-2 text-xl md:text-[22px] text-gray-600 mb-16 max-w-3xl mx-auto font-light leading-relaxed">
          Record your screen, polish it with built-in editing tools,
          <br />
          and export a pro-quality video — all in minutes.
        </p>

        {/* Features */}
        <div className="animate-on-load delay-3 flex items-center justify-center gap-12 md:gap-16 max-w-3xl mx-auto mb-16 text-left" id="download">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">Record</h3>
            <p className="text-base text-gray-400 mt-1.5 leading-snug">Screen, mic, and camera — captured in one click.</p>
          </div>
          <div className="w-px h-16 bg-gray-200" />
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">Edit</h3>
            <p className="text-base text-gray-400 mt-1.5 leading-snug">Auto-zoom, cursor effects, subtitles, and pro backgrounds.</p>
          </div>
          <div className="w-px h-16 bg-gray-200" />
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">Export</h3>
            <p className="text-base text-gray-400 mt-1.5 leading-snug">AI-upscaled 4K. YouTube, Instagram, TikTok-ready.</p>
          </div>
        </div>


        {/* Main Dashboard Mockup with Video — scroll reveal */}
        <div
          ref={videoContainerRef}
          className="hero-video-container relative max-w-6xl mx-auto"
        >
          <div className="hero-video-glow" aria-hidden="true" />

          <div className="relative rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden z-10">
            <div className="relative w-full">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                loop
                muted
                playsInline
              >
                <source src="/hero.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
