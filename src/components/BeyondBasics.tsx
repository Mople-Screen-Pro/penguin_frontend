"use client";

import { useState, useRef } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

const miniFeatures = [
  {
    title: "Presets for Every Platform",
    description: "YouTube, TikTok, desktop — one click to match any format.",
    video: "/videos/features/preset.mp4",
  },
  {
    title: "Custom Zoom",
    description: "Adjust zoom scale and position exactly where you want.",
    video: "/videos/features/zoom.mp4",
  },
  {
    title: "History Management",
    description: "Go back to any previous state whenever you need.",
    video: "/videos/features/history.mp4",
  },
];

export default function BeyondBasics() {
  const sectionRef = useScrollReveal();
  const [playingVideo, setPlayingVideo] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const toggleVideo = (i: number) => {
    if (playingVideo !== null && playingVideo !== i) {
      const prev = videoRefs.current[playingVideo];
      if (prev) {
        prev.pause();
        prev.currentTime = 0;
      }
    }
    const video = videoRefs.current[i];
    if (!video) return;
    if (playingVideo === i) {
      video.pause();
      video.currentTime = 0;
      setPlayingVideo(null);
    } else {
      video.currentTime = 0;
      video.play().catch(() => {});
      setPlayingVideo(i);
      video.onended = () => setPlayingVideo(null);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-glow ambient-blue py-[40px] md:py-[80px] px-6 bg-[#0C0C14]"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="animate-on-scroll text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
          Beyond the basics.
        </h2>
        <p className="animate-on-scroll text-lg text-white/50 mb-16 max-w-xl">
          Simple tools that quietly make your recordings better.
        </p>

        <div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6 sm:overflow-x-auto pb-4 hide-scrollbar"
          style={{ scrollbarWidth: "none" }}
        >
          {miniFeatures.map((feature, i) => (
            <div
              key={feature.title}
              className={`animate-on-scroll sm:shrink-0 w-full ${i === 0 ? "sm:w-[500px]" : "sm:w-[340px]"} glass-card cursor-pointer`}
              data-delay={String(Math.min(i * 0.06, 0.4))}
              onClick={() => toggleVideo(i)}
            >
              <div
                className={`aspect-video ${i === 0 ? "sm:aspect-[5/4]" : "sm:aspect-[3/4]"} bg-white/5 relative rounded-[17px] overflow-hidden`}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[i] = el;
                  }}
                  className={`w-full h-full object-cover transition-all duration-300 ${playingVideo === i ? "contrast-110 brightness-105 saturate-110" : ""}`}
                  muted
                  playsInline
                >
                  <source src={feature.video} type="video/mp4" />
                </video>
                <div
                  className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${playingVideo === i ? "opacity-0" : "opacity-100"}`}
                />
                <div
                  className={`absolute top-4 left-4 sm:top-5 sm:left-5 transition-opacity duration-300 ${playingVideo === i ? "opacity-0" : "opacity-100"}`}
                >
                  <h4 className="text-xl sm:text-3xl font-bold text-white mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-[13px] text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div
                  className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${playingVideo === i ? "opacity-0" : "opacity-100"}`}
                >
                  <div className="w-10 h-10 rounded-full bg-black/10 backdrop-blur-sm flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white ml-0.5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
