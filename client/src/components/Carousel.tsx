import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

type CarouselSlide = {
  src: string;
  alt: string;
  /** Optional heading shown over the slide */
  caption?: string;
  /** Optional sub-text */
  sub?: string;
};

type CarouselProps = {
  slides: CarouselSlide[];
  /** autoadvance = Set to 0 to disable. Default: 5000 */
  interval?: number;
  className?: string;
  actions?: React.ReactNode;
};

export default function Carousel({ slides, interval = 5000, className = "", actions }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [animDir, setAnimDir] = useState<"left" | "right">("right");
  const [transitioning, setTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const goTo = useCallback(
    (index: number, dir: "left" | "right" = "right") => {
      if (transitioning || index === current) return;
      setAnimDir(dir);
      setTransitioning(true);
      setCurrent(index);
    },
    [transitioning, current]
  );

  const prev = useCallback(() => {
    const idx = (current - 1 + slides.length) % slides.length;
    goTo(idx, "left");
  }, [current, slides.length, goTo]);

  const next = useCallback(() => {
    const idx = (current + 1) % slides.length;
    goTo(idx, "right");
  }, [current, slides.length, goTo]);

  useEffect(() => {
    if (interval <= 0) return;
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(next, interval);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, interval, next]);

  const handleTransitionEnd = () => setTransitioning(false);

  const enterClass = animDir === "right" ? "carousel-enter-right" : "carousel-enter-left";
  const exitClass = animDir === "right" ? "carousel-exit-left" : "carousel-exit-right";

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
    >
      {/* Slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          onTransitionEnd={i === current ? handleTransitionEnd : undefined}
          className={[
            "carousel-slide absolute inset-0 w-full h-full",
            i === current
              ? `carousel-active ${transitioning ? enterClass : ""}`
              : `carousel-inactive ${i === (current - 1 + slides.length) % slides.length ? exitClass : ""}`,
          ].join(" ")}
        >
          <img
            src={slide.src}
            alt={slide.alt}
            className="w-full h-full object-cover"
            draggable={false}
          />
          {/* Gradient overlay for captions */}
          {(slide.caption || slide.sub) && (
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          )}
          {/* Caption */}
          {(slide.caption || slide.sub || actions) && (
            <div className="absolute bottom-0 left-0 right-0 pb-10 text-white">
              <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-0">
              {slide.caption && (
                <h1 className="text-3xl sm:text-6xl font-bold leading-tight">
                  {slide.caption}
                </h1>
              )}
              {slide.sub && (
                <p className="mt-1 text-sm text-white/80 sm:text-base">{slide.sub}</p>
              )}
              {actions && (
                <div className="mt-5 flex items-center gap-4 flex-wrap">
                  {actions}
                </div>
              )}
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Prev / Next arrows */}
      <button
        aria-label="Previous slide"
        onClick={prev}
        className="carousel-arrow left-6 lg:left-[max(1.5rem,calc((100%-1280px)/2))]"
      >
        <ChevronLeftIcon className="w-5 h-5 text-white" />
      </button>
      <button
        aria-label="Next slide"
        onClick={next}
        className="carousel-arrow right-6 lg:right-[max(1.5rem,calc((100%-1280px)/2))]"
      >
        <ChevronRightIcon className="w-5 h-5 text-white" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => goTo(i, i > current ? "right" : "left")}
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              borderRadius: 9999,
              background: i === current ? "var(--secondary)" : "rgba(255,255,255,0.55)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "width 0.3s ease, background 0.3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
