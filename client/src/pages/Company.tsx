import heroPrinter from "../assets/hero-printer.png";
import xeroxLogo from "../assets/xerox-logo.png";
import visioneerLogo from "../assets/visioneer-logo.png";
import pandigitalLogo from "../assets/pandigital-logo.png";


export default function Company() {
  return (
    <main className="w-full bg-[var(--bg)]">

      {/* Hero section */}
      <div className="relative isolate w-full lg:px-0 py-4 overflow-hidden">
        <div className="mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">

          {/* Left — text content */}
          <div className="animate-fade-slide-up w-full">
            <h1 className="mt-[120px] text-[62px] tracking-[0.08em] font-bold leading-[80px] text-[var(--text-h)] max-w-[650px]">
              Founded by{" "}
              <span style={{ color: "var(--primary)" }}>Engineers</span>
              {", "}driven{"\n"}by{" "}
              <span style={{ color: "var(--secondary)" }}>Innovation</span>
              {"."}
            </h1>

            <p className="mt-6 text-[32px] tracking-[0.08em] leading-[100%] text-black leading-relaxed max-w-[600px]">
              For over three decades, Avision has delivered dependable, high-performance
              scanning solutions to customers around the world.
            </p>

            {/* Founded badge */}
            <div
              className="mt-10 font-light inline-flex items-center gap-2 px-8 py-4 text-[24px] text-[var(--text-2)] tracking-[0.08em]"
              style={{
                border: "1px dashed var(--text-2)",
                borderRadius: "4px",
                opacity: 0.7,
              }}
            >
              FOUNDED · April 29, 1991
            </div>

            {/* We Manufacture */}
            <div className="mt-20">
              <p className="text-[24px] font-medium tracking-[0.08em] uppercase text-black mb-3">
                We Manufacture
              </p>
              <div className="flex mb-20 items-center gap-2 flex-wrap">
                <img src={xeroxLogo} alt="Xerox" className="h-8 object-contain" />
                <img src={visioneerLogo} alt="Visioneer" className="h-8 object-contain" />
                <img src={pandigitalLogo} alt="Pandigital" className="h-8 object-contain" />
              </div>
            </div>
          </div>

          {/* Right — photo */}
          <div
            className="relative overflow-hidden animate-fade-slide-up"
            style={{ animationDelay: "0.15s" }}
          >
            <img
              src={heroPrinter}
              alt="Person using an Avision scanner"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </div>

    </main>
  );
}