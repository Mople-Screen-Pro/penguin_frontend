"use client";

import { useEffect, useRef } from "react";
import { analytics } from "../lib/analytics";

export default function Hero() {
  const logoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    analytics.pageVisit();
  }, []);

  // Logo: play, wait 1s, repeat
  useEffect(() => {
    const video = logoRef.current;
    if (!video) return;
    const handleEnded = () => {
      setTimeout(() => {
        video.currentTime = 0;
        video.play().catch(() => {});
      }, 500);
    };
    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, []);

  const scrollToFeatures = () => {
    const el = document.getElementById("features-cta");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "end" });
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent("clipa:open-demo", { detail: { label: "Canva" } }));
      }, 800);
    }
  };

  return (
    <>
      {/* Hero — dark section with editor background */}
      <section className="relative bg-[#0C0C14] overflow-hidden select-none md:min-h-svh">
        {/* Background video */}
        <div className="absolute inset-0 flex items-center justify-center px-4" style={{ top: '3%', bottom: '18%' }}>
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain opacity-30 rounded-xl"
          >
            <source src="/videos/hero/hero-bg-v4.mp4" type="video/mp4" />
          </video>
        </div>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#0C0C14]/50" />

        <div className="relative max-w-7xl mx-auto px-5 pt-16 md:pt-32 pb-12 md:pb-64 md:min-h-svh flex flex-col justify-center md:-mt-12">
          {/* Content */}
          <div className="relative z-10 text-center max-w-3xl mx-auto" style={{ animation: 'fadeIn 0.6s ease-out forwards' }}>
            {/* App icon + name */}
            <div className="flex flex-col items-center gap-2 mb-6">
              <video
                ref={logoRef}
                autoPlay
                muted
                playsInline
                className="w-16 h-16 md:w-24 md:h-24"
              >
                <source src="/images/logo-anim.webm" type="video/webm" />
                <source src="/images/logo-anim.mp4" type="video/mp4" />
              </video>
              <p className="text-xl md:text-3xl font-semibold text-white/90">
                Clipa Studio
              </p>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6 md:mb-10 text-left mx-auto w-fit pt-3 pb-3">
              Easy to Record.<br />Easy to Edit.<br />Easy to Share.
            </h1>
            <p className="text-sm sm:text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-4 md:mb-6 leading-snug">
              Make your videos look professional.<br />
              Grow your audience effortlessly.<br />
              No editing skills required — that's Clipa Studio.
            </p>
            <p className="text-[13px] text-white/40 mb-8 md:mb-16">
              macOS 15.0+ &middot; Apple Silicon optimized &middot; No account required
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 md:mb-0">
              <a
                href="https://grkyrqhgfgthpghircbu.supabase.co/functions/v1/download"
                onClick={() => analytics.downloadClick("hero")}
                rel="noopener"
                className="btn-block text-white font-semibold px-8 py-3.5 text-base"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Download Free for Mac
              </a>
              <button
                onClick={scrollToFeatures}
                className="btn-block-ghost text-white/80 font-semibold px-8 py-3.5 text-base !border-white/20 !bg-white/5 hover:!bg-white/10"
              >
                See it in action
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 5v14m-7-7 7 7 7-7" />
                </svg>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom fade to page bg */}
        <div className="absolute bottom-0 left-0 right-0 h-[10%] bg-gradient-to-t from-[#0C0C14] to-transparent" />
      </section>

      {/* Whatever you build — marquee */}
      <div className="pt-[60px] pb-[40px] md:pt-[120px] md:pb-[80px] bg-[#0C0C14] text-center overflow-hidden">
        <p className="text-white/50 font-light mb-10 px-6 whitespace-nowrap text-[clamp(1rem,4vw,2.25rem)]">
          Whatever you build,{" "}
          <span className="inline-block"><span className="gradient-text font-medium">Clipa</span> fits right
          in.</span>
        </p>
        <div className="relative">
          {/* Fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-r from-[#0C0C14] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 md:w-24 bg-gradient-to-l from-[#0C0C14] to-transparent z-10 pointer-events-none" />
          <div
            className="flex whitespace-nowrap"
            style={{ animation: "workflow-marquee 60s linear infinite" }}
          >
            {[...Array(4)].map((_, setIndex) => (
              <div
                key={setIndex}
                className="inline-flex items-center gap-8 md:gap-16 shrink-0 pr-8 md:pr-16"
              >
                {[
                  { name: "GitHub", path: "M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" },
                  { name: "Figma", path: "M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zM8.172 24c-2.489 0-4.515-2.014-4.515-4.49s2.014-4.49 4.49-4.49h4.588v4.441c0 2.503-2.047 4.539-4.563 4.539zm-.024-7.51a3.023 3.023 0 00-3.019 3.019c0 1.678 1.368 3.07 3.088 3.07 1.691 0 3.068-1.378 3.068-3.07v-3.019H8.148zm7.704 0h-.098c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h.098c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49zm-.098-7.509a3.023 3.023 0 00-3.019 3.019 3.023 3.023 0 003.019 3.019h.098a3.023 3.023 0 003.019-3.019 3.023 3.023 0 00-3.019-3.019h-.098z" },
                  { name: "VS Code", path: "M23.15 2.587L18.21.21a1.494 1.494 0 00-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 00-1.276.057L.327 7.261A1 1 0 00.326 8.74L3.899 12 .326 15.26a1 1 0 00.001 1.479L1.65 17.94a.999.999 0 001.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 001.704.29l4.942-2.377A1.5 1.5 0 0024 20.06V3.939a1.5 1.5 0 00-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z" },
                  { name: "YouTube", path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
                  { name: "TikTok", path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" },
                  { name: "Instagram", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" },
                  { name: "Notion", path: "M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L18.29 2.168c-.42-.326-.98-.7-2.055-.607L3.01 2.721c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.886l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.886.747-.933zM1.936 1.035l13.86-1.026c1.7-.14 2.1.047 2.8.56l3.876 2.707c.56.42.746.933.746 1.54v15.09c0 .98-.373 1.54-1.215 1.634l-15.503.933c-.654.046-1.026-.046-1.4-.466L1.43 19.1c-.42-.56-.607-1.026-.607-1.634V2.575c0-.748.28-1.4 1.12-1.54z" },
                  { name: "Slack", path: "M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" },
                  { name: "Canva", path: "M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.14 16.09c-.564.94-1.88 1.51-3.36 1.51-2.72 0-5.28-2.1-5.28-5.52 0-3.18 2.28-6.48 6.12-6.48 1.68 0 2.88.84 2.88 1.92 0 .84-.6 1.32-1.14 1.32-.42 0-.78-.24-.78-.72 0-.36.18-.6.18-.96 0-.42-.42-.72-1.08-.72-2.16 0-3.78 2.34-3.78 4.92 0 2.16 1.32 3.96 3.48 3.96 1.14 0 2.04-.54 2.64-1.26l.12.03z" },
                ].map((brand) => (
                  <span key={brand.name} className="inline-flex items-center gap-2 md:gap-3 text-white/40">
                    <svg className="w-6 h-6 md:w-9 md:h-9" viewBox="0 0 24 24" fill="currentColor">
                      <path d={brand.path} />
                    </svg>
                    <span className="text-base md:text-xl font-medium">{brand.name}</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
