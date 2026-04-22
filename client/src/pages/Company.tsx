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
      <div className="bg-[#CECECE] w-full flex items-center justify-center flex-col gap-10 py-20 px-8">
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

      {/* our story */}
      <div className="w-full flex flex-col gap-10 py-10 px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-10 lg:gap-50 px-8 py-10 items-start">
          <div className="flex flex-col gap-2 mx-auto">
            {/* left: our story */}
            <div className="flex flex-col gap-2 mx-auto">
              {/* mobile: one line */}
              <p className="lg:hidden font-extrabold text-[40px] leading-[100%] tracking-[-0.02em] text-black">
                OUR STORY
              </p>
              {/* desktop: two lines */}
              <div className="hidden lg:flex flex-col gap-2">
                <p className="font-extrabold text-[62px] leading-[100%] tracking-[-0.02em] text-black">
                  OUR
                </p>
                <p className="font-extrabold text-[62px] leading-[100%] tracking-[-0.02em] text-black">
                  STORY
                </p>
              </div>
            </div>
          </div>
          {/* right: company background */}
          <div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-[80px] w-full items-center lg:max-w-[650px]">
              <p className="font-medium text-[14px] lg:text-[24px] leading-[100%] tracking-[0.08em] text-[#616262]">
                COMPANY BACKGROUND
              </p>
              <div className="h-[1px] w-full lg:flex-1 bg-[#616262]"></div>
            </div>
              
            <div className="lg:max-w-[650px] mt-15">
            <p className="mt-5 text-[14px] lg:text-[19px] font-regular leading-[24px] lg:leading-[28px] tracking-[0.08em] text-black mt-4">
              Founded in April 1991 by a group of engineers with strong
              engineering expertise, Avision designs, manufactures, and markets
              a complete range of quality, high performance scanners and key
              components for multi-function products. Through innovative product
              development, strategic partnerships and successful business
              models, Avision has become a leading supplier in the scanner
              industry.
            </p>
            <p className="mt-5 text-[14px] lg:text-[19px] font-regular leading-[24px] lg:leading-[28px] tracking-[0.08em] text-black mt-4">
              To ensure the world class product quality and reliability, Avision
              attained ISO-9001 certification in 1993 and ISO-14001
              certification in early 2002. The implementation of ISO-9001
              significantly helps every employee build quality into every aspect
              of the company’s operation.
            </p>
            <div className="my-10 pl-10 border-l-4 border-[var(--secondary)] pl-4">
              <p
                className="font-light italic text-[20px] lg:text-[32px] leading-[24px] lg:leading-[28px] tracking-[0.08em] text-black"
                style={{ fontFamily: "var(--sans)" }}
              >
                “Avision understands that continuous innovation is the key to
                success.”
              </p>
            </div>
            <p className="text-[14px] lg:text-[19px] font-regular leading-[24px] lg:leading-[28px] tracking-[0.08em] text-black mt-4">
              We unceasingly encourage creative ideas and invest a significant
              portion of our revenue in research and development to enhance our
              product quality and features. Due to these efforts, our business
              success is achieved.
            </p>
            <p className="mt-5 text-[14px] lg:text-[19px] font-regular leading-[24px] lg:leading-[28px] tracking-[0.08em] text-black mt-4">
              To meet the strong demand from the market, Avision has expanded
              its scanner capacity to 300,000 units each month and also extended
              its factories overseas. As a reputable company committed to
              providing complete customer satisfaction, Avision will continue to
              provide high-performance and innovative products for its worldwide
              customers.
            </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
