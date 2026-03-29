"use client";
import Button from "../components/Button";
import heroPrinter from "../assets/hero-printer.png";
import heroP from "../assets/hero-p.png";
import heroMfp from "../assets/hero-mfp.png";
import heroS from "../assets/hero-s.png";
import { BoltIcon, LockClosedIcon, PrinterIcon } from "@heroicons/react/24/outline";

import { useRef } from "react";

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

export default function Home() {

  const ProductsRef = useRef<HTMLDivElement>(null);

  const scrollToProducts = () => {
    ProductsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full bg-[var(--bg)]">
      <div className="relative isolate min-h-screen flex flex-col items-center px-6 lg:px-8">
        <Blobs />

        {/* Centered content */}
        <div className="flex-1 flex items-start justify-center w-full pt-50">
          <div className="max-w-2xl text-center animate-fade-slide-up">
            <div className="scan-line-wrapper">
              <h1 className="text-5xl font-bold tracking-tight text-balance text-[var(--text-h)] sm:text-7xl">
                A Smarter Vision for Every Workspace
              </h1>
              <h1 aria-hidden="true" className="scan-text-reveal text-5xl font-bold tracking-tight text-balance sm:text-7xl">
                A Smarter Vision for Every Workspace
              </h1>
            </div>
            <p
              className="mt-8 text-lg font-regular text-pretty text-[var(--text-2)] sm:text-xl/8 animate-fade-slide-up"
              style={{ animationDelay: "0.15s" }}
            >
              From document scanners to large-format digitizers, Avision manufactures a complete range of imaging solutions engineered for reliability, speed, and precision.
            </p>
            <div
              className="mt-10 flex items-center justify-center gap-x-6 animate-fade-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Button href="#products">
                Get Started
              </Button>
              <Button href="/contact" variant="outline">
                About Us
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features + screenshot section */}
      <div className="relative isolate w-full px-6 lg:px-16 py-24">
        <Blobs flip />
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — text */}
          <div>
            <h2 className="text-4xl font-bold text-[var(--text-h)] lg:text-5xl">
              Built for speed.<br />Engineered for precision.
            </h2>
            <p className="mt-6 text-lg text-[var(--text-2)]">
              Every Avision device is designed to fit seamlessly into your workflow, from small offices to enterprise document centers.
            </p>
            <hr className="my-8 border-[var(--secondary)]" />
            <ul className="space-y-6">
              {[
                { icon: BoltIcon, label: "High-speed scanning.", desc: "Process hundreds of pages per minute without sacrificing quality." },
                { icon: LockClosedIcon, label: "Secure by default.", desc: "Enterprise-grade encryption keeps your documents safe at every step." },
                { icon: PrinterIcon, label: "Wide format support.", desc: "From A4 to large-format prints, Avision covers every size you need." },
              ].map(({ icon: Icon, label, desc }) => (
                <li key={label} className="flex gap-4 items-start">
                  <div className="mt-1 p-2 rounded-lg shrink-0" style={{ background: "var(--accent)" }}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <p className="text-[var(--text-2)]">
                    <span className="font-bold text-[var(--text-h)]">{label}</span>{" "}{desc}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right — product mockup */}
          <div
            className="rounded-2xl overflow-hidden shadow-2xl"
            style={{ background: "var(--primary)" }}
          >
            <img
              src={heroPrinter}
              alt="Avision printer"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>

      {/* Explore Our Products section */}
      <div ref={ProductsRef} id="products" className="w-full px-6 lg:px-16 py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-bold text-[var(--text-h)] lg:text-5xl">Explore Our Products.</h2>
          <p className="mt-6 text-lg text-[var(--text-2)]">
            Avision designs, manufactures, and markets a complete range of quality, high performance scanners, printers and multi-function printers. We're one of the world's leading provider of image processing equipment and digital office solutions.
          </p>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { img: heroP, alt: "Avision Printer", name: "Printers", desc: "Reliable printing solutions designed for fast, high-quality everyday output" },
              { img: heroMfp, alt: "Avision Multi-Function Printer", name: "Multi-Function Printers", desc: "All-in-one devices that print, scan, copy, and streamline your workflow" },
              { img: heroS, alt: "Avision Scanner", name: "Scanners", desc: "Precise technology for capturing documents with clarity and efficiency" },
            ].map(({ img, alt, name, desc }) => (
              <div key={name} className="flex flex-col items-center text-center">
                <div className="w-full flex items-end justify-center h-64">
                  <img src={img} alt={alt} className="max-h-full object-contain" />
                </div>
                <h3 className="mt-8 text-xl font-bold text-[var(--text-h)]">{name}</h3>
                <p className="mt-2 text-[var(--text-2)] max-w-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="relative isolate w-full py-56 flex items-center justify-center overflow-hidden">
        <Blobs />
        {/* Concentric rings */}
        {[480, 360, 240, 120].map((size) => (
          <div
            key={size}
            className="absolute rounded-full border border-[var(--text-h)] opacity-[0.06]"
            style={{ width: size, height: size }}
          />
        ))}

        <div className="relative z-10 flex flex-col items-center text-center gap-8">
          <h2 className="text-4xl font-bold text-[var(--text-h)] sm:text-5xl">
            Looking for assistance?<br />Get started below.
          </h2>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Button href="/support">
              Explore Support Resources
            </Button>
            <Button href="/contact" variant="outline">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

