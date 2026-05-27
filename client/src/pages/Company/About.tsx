import { useEffect, useRef, useState } from "react";
import heroPrinter from "../../assets/hero/hero-printer.png";
import xeroxLogo from "../../assets/about/xerox-logo.png";
import visioneerLogo from "../../assets/about/visioneer-logo.png";
import pandigitalLogo from "../../assets/about/pandigital-logo.png";
import map from "../../assets/about/map.png";
import location from "../../assets/about/location.png";

import {
  BuildingOffice2Icon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

function useCountUp(target: number, inView: boolean, duration = 1400) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView || target === 0) return;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(2, -10 * t)) * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return count;
}

function Blobs({ flip = false }: { flip?: boolean }) {
  return (
    <>
      <div
        aria-hidden="true"
        className={`absolute -z-10 top-0 ${flip ? "right-[-4rem]" : "left-[-4rem]"} w-[16rem] h-[16rem] sm:w-[26rem] sm:h-[26rem] lg:w-[36rem] lg:h-[36rem] lg:${flip ? "right-[-8rem]" : "left-[-8rem]"} rounded-full opacity-25 blur-3xl`}
        style={{ background: "radial-gradient(circle, var(--primary), transparent 70%)" }}
      />
      <div
        aria-hidden="true"
        className={`absolute -z-10 bottom-0 ${flip ? "left-[-4rem]" : "right-[-4rem]"} w-[16rem] h-[16rem] sm:w-[26rem] sm:h-[26rem] lg:w-[36rem] lg:h-[36rem] lg:${flip ? "left-[-8rem]" : "right-[-8rem]"} rounded-full opacity-25 blur-3xl`}
        style={{ background: "radial-gradient(circle, var(--secondary), transparent 70%)" }}
      />
    </>
  );
}

export default function Company() {
  const [inView, setInView] = useState(false);
  const numbersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = numbersRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const years = useCountUp(33, inView);
  const warranty = useCountUp(1, inView);
  const units = useCountUp(300, inView);

  return (
    <main className="w-full bg-[var(--bg)]">
      {/* hero section */}
      <div className="relative isolate w-full py-4 px-6 lg:px-8 overflow-hidden">
        <Blobs />
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* left: text content */}
          <div className="w-full">
            <h1 className="mt-24 lg:mt-28 text-center lg:text-left text-4xl lg:text-6xl font-bold tracking-tight leading-tight text-[var(--text-h)]">
              Founded by{" "}
              <span style={{ color: "var(--primary)" }}>Engineers</span>
              {", "}driven by{" "}
              <span style={{ color: "var(--secondary)" }}>Innovation</span>
              {"."}
            </h1>

            <p className="mt-4 text-lg text-center lg:text-left text-[var(--text-2)]">
              For over three decades, Avision has delivered dependable,
              high-performance scanning solutions to customers around the world.
            </p>

            {/* founded badge */}
            <div className="flex justify-center lg:justify-start mt-6">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-light text-[var(--text-2)] tracking-widest"
                style={{ border: "1px dashed var(--text-2)", borderRadius: "4px", opacity: 0.7 }}
              >
                FOUNDED · April 29, 1991
              </div>
            </div>

            {/* we manufacture + company logos */}
            <div className="mt-16 flex flex-col items-center lg:items-start">
              <p className="text-xs font-semibold tracking-widest uppercase text-[var(--text-2)] mb-4">
                We Manufacture
              </p>
              <div className="flex mb-16 items-center gap-6 flex-col md:flex-row">
                <img src={xeroxLogo} alt="Xerox" className="h-8 object-contain" />
                <img src={visioneerLogo} alt="Visioneer" className="h-9 object-contain" />
                <img src={pandigitalLogo} alt="Pandigital" className="h-8 object-contain" />
              </div>
            </div>
          </div>

          {/* right: photo */}
          <div className="relative overflow-hidden animate-fade-slide-up rounded-2xl shadow-lg" style={{ animationDelay: "0.15s" }}>
            <img src={heroPrinter} alt="Person using an Avision scanner" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      {/* by the numbers */}
      <div className="bg-[#F0F0F0] w-full flex items-center justify-center flex-col gap-8 mt-5 py-12 px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-24 w-full max-w-7xl items-center">
          <p className="text-xs font-light tracking-widest text-[#616262]">BY THE NUMBERS</p>
          <div className="h-px w-full lg:flex-1 bg-[#616262]" />
        </div>
        <div
          ref={numbersRef}
          className="grid grid-cols-2 gap-10 lg:flex lg:justify-between lg:items-start max-w-7xl w-full"
        >
          {[
            { value: `${years}+`, label: "YEARS IN OPERATION" },
            {
              value: (
                <>ISO<span className="text-2xl lg:text-3xl" style={{ color: "var(--secondary)" }}>x2</span></>
              ),
              label: "CERTIFIED QUALITY",
            },
            {
              value: (
                <>{warranty}<span className="text-2xl lg:text-3xl" style={{ color: "var(--secondary)" }}>yr</span></>
              ),
              label: "WARRANTY",
            },
            { value: `${units}k`, label: "UNITS PER MONTH" },
          ].map((stat, i) => (
            <div key={i} className="flex flex-col gap-1">
              <p className="font-extrabold text-4xl lg:text-6xl leading-none tracking-tight text-black">
                {stat.value}
              </p>
              <p className="text-xs font-medium tracking-widest text-black mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* our story */}
      <div className="w-full py-16 px-6 lg:px-8">
        <div className="relative isolate mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[2fr_5fr] gap-10 lg:gap-24 py-8 items-start">
          <Blobs flip />
          <div>
            <h2 className="font-bold text-4xl lg:text-6xl tracking-tight text-black leading-none">
              OUR<br />STORY
            </h2>
          </div>

          <div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-16 w-full items-center">
              <p className="text-xs font-light tracking-widest text-[#616262]">COMPANY BACKGROUND</p>
              <div className="h-px w-full lg:flex-1 bg-[#616262]" />
            </div>

            <div className="mt-8 space-y-4 text-sm lg:text-base leading-relaxed text-[var(--text-2)]">
              <p>
                Founded in April 1991 by a group of engineers with strong
                engineering expertise, Avision designs, manufactures, and
                markets a complete range of quality, high performance scanners
                and key components for multi-function products. Through
                innovative product development, strategic partnerships and
                successful business models, Avision has become a leading
                supplier in the scanner industry.
              </p>
              <p>
                To ensure the world class product quality and reliability,
                Avision attained ISO-9001 certification in 1993 and ISO-14001
                certification in early 2002. The implementation of ISO-9001
                significantly helps every employee build quality into every
                aspect of the company's operation.
              </p>

              <blockquote className="my-8 pl-4 border-l-4 border-[var(--secondary)]">
                <p className="italic text-lg lg:text-xl text-[var(--text-h)]" style={{ fontFamily: "var(--sans)" }}>
                  "Avision understands that continuous innovation is the key to success."
                </p>
              </blockquote>

              <p>
                We unceasingly encourage creative ideas and invest a significant
                portion of our revenue in research and development to enhance
                our product quality and features. Due to these efforts, our
                business success is achieved.
              </p>
              <p>
                To meet the strong demand from the market, Avision has expanded
                its scanner capacity to 300,000 units each month and also
                extended its factories overseas. As a reputable company
                committed to providing complete customer satisfaction, Avision
                will continue to provide high-performance and innovative
                products for its worldwide customers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* distribution */}
      <div className="w-full py-12 px-6 lg:px-8 bg-[#616262]">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-16 w-full items-center">
            <p className="text-xs font-bold tracking-widest text-white">DISTRIBUTION</p>
            <div className="h-px w-full lg:flex-1 bg-white" />
          </div>

          <div className="relative mt-4">
            <img src={map} className="w-full" alt="Distribution map" loading="lazy" decoding="async" />

            <div className="rounded-xl static lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-0 bg-white p-6 lg:p-10 w-full lg:w-[460px] shadow-xl mt-4 lg:mt-0">
              <h2 className="font-bold text-2xl lg:text-3xl tracking-tight text-black mb-4">
                Serving customers, from{" "}
                <span style={{ color: "var(--primary)" }} className="underline">coast</span>{" "}
                to{" "}
                <span style={{ color: "var(--secondary)" }} className="underline">coast.</span>
              </h2>

              <p className="text-sm lg:text-base leading-relaxed text-[var(--text-2)] my-6">
                Avision sells and supports its full line of scanners and imaging
                products across the entire North American market — including the
                United States, Canada, and Mexico. Whether you're a reseller,
                systems integrator, or enterprise buyer, our sales and
                distribution network ensures fast access to our products and local
                support wherever you operate.
              </p>

              <div
                className="inline-flex flex-col gap-1 px-4 py-3 text-xs text-[var(--text-2)] tracking-widest"
                style={{ border: "1px dashed var(--text-2)", borderRadius: "4px", opacity: 0.7, fontFamily: "var(--heading)" }}
              >
                <span className="font-light">United States · Mexico · Canada</span>
                <span className="font-semibold">NORTH AMERICA</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* visit us */}
      <div className="w-full py-24 px-6 lg:px-8">
        <div className="relative isolate mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <Blobs />
          <div>
            <h2 className="font-bold text-4xl lg:text-5xl tracking-tight text-[var(--text-h)]">VISIT US</h2>
            <div className="flex flex-col gap-0 mt-8 max-w-md">
              {[
                {
                  icon: BuildingOffice2Icon,
                  href: "https://www.google.com/maps/place/5694+Stewart+Ave,+Fremont,+CA+94538/@37.5158922,-121.9849446,815m/data=!3m2!1e3!4b1!4m6!3m5!1s0x808fc751ce0c0211:0xf05beae8974d39e3!8m2!3d37.515888!4d-121.9823697!16s%2Fg%2F11pcnfm6rk?entry=ttu&g_ep=EgoyMDI2MDQyMC4wIKXMDSoASAFQAw%3D%3D",
                  label: "COMPANY ADDRESS",
                  external: true,
                },
                { icon: PhoneIcon, href: "tel:510-739-2369", label: "COMPANY PHONE" },
                { icon: EnvelopeIcon, href: "mailto:support@avision-labs.com", label: "COMPANY EMAIL" },
              ].map(({ icon: Icon, href, label, external }) => (
                <div key={label} className="flex flex-row items-center gap-6 min-h-16 py-4 border-b border-[#8A8A8A] last:border-0">
                  <Icon className="w-5 h-5 text-[var(--text-h)] shrink-0" />
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="text-sm lg:text-base font-light tracking-widest text-[#616262] hover:text-[var(--text-h)] transition-colors"
                  >
                    {label}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div>
            <img
              src={location}
              alt="Company location"
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
