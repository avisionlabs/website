import heroPrinter from "../assets/hero-printer.png";
import xeroxLogo from "../assets/xerox-logo.png";
import visioneerLogo from "../assets/visioneer-logo.png";
import pandigitalLogo from "../assets/pandigital-logo.png";

export default function Company() {
  return (
    <main className="w-full bg-[var(--bg)]">
      {/* hero section */}
      <div className="relative isolate w-full lg:px-0 py-4 overflow-hidden">
        <div className="px-6 mx-auto lg:max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-0 items-center">
          {/* left: text content */}
          <div className="animate-fade-slide-up w-full">
            <h1 className="mt-30 lg:mt-[120px] text-center lg:text-left text-[40px] lg:text-[62px] tracking-[0.08em] font-bold leading-[110%] lg:leading-[80px] text-[var(--text-h)] max-w-[650px]">
              Founded by{" "}
              <span style={{ color: "var(--primary)" }}>Engineers</span>
              {", "}driven{"\n"}by{" "}
              <span style={{ color: "var(--secondary)" }}>Innovation</span>
              {"."}
            </h1>

            <p className="mt-3 text-[16px] lg:text-[32px] text-center lg:text-left tracking-[0.08em] leading-[100%] text-black leading-relaxed max-w-[600px]">
              For over three decades, Avision has delivered dependable,
              high-performance scanning solutions to customers around the world.
            </p>

            {/* founded badge */}
            <div className="justify-center lg:justify-start w-full flex">
              <div
                className="mt-2 lg:mt-10 font-light inline-flex items-center gap-2 px-4 lg:px-8 py-2 lg:py-4 text-[12px] lg:text-[24px] text-[var(--text-2)] tracking-[0.08em] mx-auto lg:mx-0"
                style={{
                  border: "1px dashed var(--text-2)",
                  borderRadius: "4px",
                  opacity: 0.7,
                }}
              >
                FOUNDED · April 29, 1991
              </div>
            </div>

            {/* we manufacture + company logos*/}
            <div className="mt-20">
              <p className="text-[24px] font-medium tracking-[0.08em] uppercase text-black mb-3">
                We Manufacture
              </p>
              <div className="flex mb-20 items-center gap-2 flex-wrap lg:flex-nowrap">
                <img
                  src={xeroxLogo}
                  alt="Xerox"
                  className="h-8 object-contain"
                />
                <img
                  src={visioneerLogo}
                  alt="Visioneer"
                  className="h-9 object-contain"
                />
                <img
                  src={pandigitalLogo}
                  alt="Pandigital"
                  className="h-8 object-contain"
                />
              </div>
            </div>
          </div>

          {/* right: photo */}
          <div
            className="relative overflow-hidden animate-fade-slide-up rounded-2xl shadow-2xl"
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

      {/* by the numbers */}
      <div className="bg-[#CECECE] w-full flex items-center justify-center flex-col gap-10 py-10 px-8">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-[100px] w-full items-center px-8">
          <p className="font-light text-[24px] leading-[100%] tracking-[0.08em] text-[#616262]">
            {" "}
            BY THE NUMBERS{" "}
          </p>
          <div className="h-[1px] w-full lg:flex-1 bg-[#616262]"></div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-40 items-center pt-0 lg:pt-4 px-8 justify-center">
          <div className="flex flex-col justify-center gap-2">
            <p className="font-extrabold text-[40px] lg:text-[70px] leading-[100%] tracking-[-0.02em] text-black]">
              33+
            </p>
            <p className="font-medium text-[14px] lg:text-[24px] leading-[100%] tracking-[-0.02em] text-black">
              YEARS IN OPERATION
            </p>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <p className="font-extrabold text-[40px] lg:text-[70px] leading-[100%] tracking-[-0.02em] text-black]">
              ISO
              <span
                className="font-extrabold  text-[20px] lg:text-[35px] leading-[100%] tracking-[-0.02em]"
                style={{ color: "var(--secondary)" }}
              >
                x2
              </span>
            </p>
            <p className="font-medium text-[14px] lg:text-[24px] leading-[100%] tracking-[-0.02em] text-black">
              CERTIFIED QUALITY
            </p>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <p className="font-extrabold text-[40px] lg:text-[70px] leading-[100%] tracking-[-0.02em] text-black]">
              1
              <span
                className="font-extrabold  text-[20px] lg:text-[35px] leading-[100%] tracking-[-0.02em]"
                style={{ color: "var(--secondary)" }}
              >
                yr
              </span>
            </p>
            <p className="font-medium text-[14px] lg:text-[24px] leading-[100%] tracking-[-0.02em] text-black">
              WARRANTY
            </p>
          </div>
          <div className="flex flex-col justify-center gap-2">
            <p className="font-extrabold text-[40px] lg:text-[70px] leading-[100%] tracking-[-0.02em] text-black">
              300k
            </p>
            <p className="font-medium text-[14px] lg:text-[24px] leading-[100%] tracking-[-0.02em] text-black">
              UNITS PER MONTH
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
