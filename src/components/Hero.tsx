"use client";

import { useEffect, useRef } from "react";
import { analytics } from "../lib/analytics";

const DOWNLOAD_URL =
  "https://grkyrqhgfgthpghircbu.supabase.co/functions/v1/download";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section
      ref={sectionRef}
      className="pt-24 pb-16 px-6 bg-[#f5f7ff] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Main Headline */}
        <h1 className="animate-on-load text-5xl md:text-7xl lg:text-[84px] font-bold tracking-tight text-gray-900 leading-[1.05] mb-6 max-w-5xl mx-auto">
          Expert Edits.
          <br className="hidden md:block" />
          <span className="gradient-text">In Record Time.</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-on-load delay-2 text-xl md:text-[22px] text-gray-600 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
          Penguin makes screen recording effortless. Record your screen, polish
          it with built-in editing tools, and export a pro-quality video — all
          in minutes.
        </p>

        {/* Feature Cards */}
        <div className="animate-on-load delay-3 grid grid-cols-1 md:grid-cols-3 gap-3 max-w-5xl mx-auto mb-28" id="download">
            {/* Record */}
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex flex-col justify-between h-[150px]">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Quick Recording</h3>
                <p className="text-sm text-gray-500">One click to start. Full screen or custom area — no setup needed.</p>
              </div>
              <div className="flex items-center gap-2 mt-auto pt-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                <div className="flex-1 h-[3px] bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-gray-300 rounded-full" />
                </div>
              </div>
            </div>

            {/* Edit */}
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex flex-col justify-between h-[150px]">
              <div>
                <div className="flex items-center justify-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900">Built-in Editing</h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">New</span>
                </div>
                <p className="text-sm text-gray-500">Trim, adjust, and fine-tune your recordings right inside Penguin.</p>
              </div>
              <div className="flex items-center gap-0.5 mt-auto pt-3">
                <div className="h-5 flex-[2] bg-primary-100 rounded-l" />
                <div className="h-5 w-px bg-primary-300" />
                <div className="h-5 flex-[3] bg-primary-50" />
                <div className="h-5 w-px bg-primary-300" />
                <div className="h-5 flex-[2] bg-primary-100 rounded-r" />
              </div>
            </div>

            {/* Export */}
            <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group flex flex-col justify-between h-[150px]">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Instant Export</h3>
                <p className="text-sm text-gray-500">Export as MP4 and share instantly. Works everywhere.</p>
              </div>
              <div className="flex items-center gap-2 mt-auto pt-3">
                <div className="h-4 w-4 rounded bg-gray-200 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="h-[3px] flex-1 bg-gray-100 rounded-full" />
                <span className="text-[11px] text-gray-300 font-mono">.mp4</span>
              </div>
            </div>
        </div>

        {/* Main Dashboard Mockup with Video */}
        <div className="animate-on-load delay-5 relative max-w-6xl mx-auto">
          <div className="relative rounded-t-2xl md:rounded-t-3xl border-t border-l border-r border-gray-200 bg-[#1e1e1e] shadow-2xl overflow-hidden z-10">
            {/* Browser Chrome */}
            <div className="h-10 bg-[#2d2d2d] border-b border-[#3d3d3d] flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-amber-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="mx-auto bg-[#1e1e1e] border border-[#3d3d3d] rounded-md h-6 w-1/3 flex items-center justify-center">
                <span className="text-[10px] text-gray-400 font-mono">
                  penguin.app/recorder
                </span>
              </div>
            </div>
            {/* Video Content */}
            <div className="relative w-full bg-[#1e1e1e]">
              <video
                className="w-full h-full object-cover"
                autoPlay
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
