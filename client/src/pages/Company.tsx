import heroPrinter from "../assets/hero-printer.png";
import xeroxLogo from "../assets/xerox-logo.png";
import visioneerLogo from "../assets/visioneer-logo.png";
import pandigitalLogo from "../assets/pandigital-logo.png";
import map from "../assets/map.png";
import location from "../assets/location.png";

import {
  BuildingOffice2Icon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

function Blobs({ flip = false }: { flip?: boolean }) {
  return (
    <>
      <div
        aria-hidden="true"
        className={`absolute -z-10 top-0 ${flip ? "right-[-4rem]" : "left-[-4rem]"} w-[16rem] h-[16rem] sm:w-[26rem] sm:h-[26rem] lg:w-[36rem] lg:h-[36rem] lg:${flip ? "right-[-8rem]" : "left-[-8rem]"} rounded-full opacity-25 blur-3xl`}
        style={{
          background:
            "radial-gradient(circle, var(--primary), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className={`absolute -z-10 bottom-0 ${flip ? "left-[-4rem]" : "right-[-4rem]"} w-[16rem] h-[16rem] sm:w-[26rem] sm:h-[26rem] lg:w-[36rem] lg:h-[36rem] lg:${flip ? "left-[-8rem]" : "right-[-8rem]"} rounded-full opacity-25 blur-3xl`}
        style={{
          background:
            "radial-gradient(circle, var(--secondary), transparent 70%)",
        }}
      />
    </>
  );
}

export default function Company() {
  return (
    <main className="w-full bg-[var(--bg)]">
      {/* hero section */}
      <div className="relative isolate w-full lg:px-0 py-4 overflow-hidden">
        <Blobs />
        <div className="px-6 mx-auto lg:max-w-[1400px] grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-8 items-center">
          {/* left: text content */}
          <div className="animate-fade-slide-up w-full">
            <h1 className="mt-30 lg:mt-[120px] md:px-40 lg:px-0 text-center lg:text-left text-[40px] lg:text-[62px] tracking-[0.08em] font-bold leading-[110%] lg:leading-[80px] text-[var(--text-h)]">
              Founded by{" "}
              <span style={{ color: "var(--primary)" }}>Engineers</span>
              {", "}driven{"\n"}by{" "}
              <span style={{ color: "var(--secondary)" }}>Innovation</span>
              {"."}
            </h1>

            <p className="mt-4 md:px-60 lg:px-0 text-[18px] lg:text-[32px] text-center lg:text-left tracking-[0.08em] leading-[100%] text-black">
              For over three decades, Avision has delivered dependable,
              high-performance scanning solutions to customers around the world.
            </p>

            {/* founded badge */}
            <div className="justify-center lg:justify-start w-full flex">
              <div
                className="mt-4 lg:mt-10 font-light inline-flex items-center gap-2 px-4 lg:px-8 py-2 lg:py-4 text-[12px] lg:text-[24px] text-[var(--text-2)] tracking-[0.08em] mx-auto lg:mx-0"
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
            <div className="mt-20 flex flex-col items-center lg:items-start">
              <p className="text-[24px] font-medium tracking-[0.08em] uppercase text-black mb-3">
                We Manufacture
              </p>
              <div className="flex mb-20 items-center gap-6 flex-col md:flex-row lg:flex-row">
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
      <div className="bg-[#CECECE] w-full flex items-center justify-center flex-col gap-10 py-10 lg:py-20 px-10 lg:px-20">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-[100px] w-full items-center">
          <p className="font-light text-[24px] leading-[100%] tracking-[0.08em] text-[#616262]">
            {" "}
            BY THE NUMBERS{" "}
          </p>
          <div className="h-[1px] w-full lg:flex-1 bg-[#616262]"></div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-40 items-center pt-0 lg:pt-4 px-0 justify-center">
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
      <div className="w-full flex flex-col gap-10 py-15 px-8 lg:px-16">
        <div className="relative isolate grid grid-cols-1 lg:grid-cols-[30%_70%] gap-10 lg:gap-50 py-10 items-start">
          <Blobs flip />
          <div className="flex flex-col gap-2 mx-auto">
            {/* left: our story */}
            <div className="flex flex-col gap-2 mx-auto">
              {/* mobile: one line */}
              <p className="lg:hidden font-extrabold text-[40px] leading-[100%] tracking-[0.08em] text-black">
                OUR STORY
              </p>
              {/* desktop: two lines */}
              <div className="hidden lg:flex flex-col gap-2">
                <p className="font-extrabold text-[62px] leading-[100%] tracking-[0.08em] text-black">
                  OUR
                </p>
                <p className="font-extrabold text-[62px] leading-[100%] tracking-[0.08em] text-black">
                  STORY
                </p>
              </div>
            </div>
          </div>
          {/* right: company background */}
          <div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-[80px] w-full items-center lg:max-w-[650px]">
              <p className="font-light text-[24px] leading-[100%] tracking-[0.08em] text-[#616262] text-center lg:text-left">
                COMPANY BACKGROUND
              </p>
              <div className="h-[1px] w-full lg:flex-1 bg-[#616262]"></div>
            </div>

            <div className="lg:max-w-[650px] mt-5 lg:mt-10">
              <p className="mt-5 text-[14px] lg:text-[19px] font-regular leading-[24px] lg:leading-[28px] tracking-[0.08em] text-black mt-4">
                Founded in April 1991 by a group of engineers with strong
                engineering expertise, Avision designs, manufactures, and
                markets a complete range of quality, high performance scanners
                and key components for multi-function products. Through
                innovative product development, strategic partnerships and
                successful business models, Avision has become a leading
                supplier in the scanner industry.
              </p>
              <p className="mt-5 text-[14px] lg:text-[19px] font-regular leading-[24px] lg:leading-[28px] tracking-[0.08em] text-black mt-4">
                To ensure the world class product quality and reliability,
                Avision attained ISO-9001 certification in 1993 and ISO-14001
                certification in early 2002. The implementation of ISO-9001
                significantly helps every employee build quality into every
                aspect of the company’s operation.
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
                portion of our revenue in research and development to enhance
                our product quality and features. Due to these efforts, our
                business success is achieved.
              </p>
              <p className="mt-5 text-[14px] lg:text-[19px] font-regular leading-[24px] lg:leading-[28px] tracking-[0.08em] text-black mt-4">
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
      <div className="w-full py-15 px-5 lg:px-20 bg-[#616262]">
        {/* header */}
        <div className="flex flex-col py-0 lg:py-4 lg:flex-row gap-4 lg:gap-[80px] w-full items-center">
          <p className="font-bold text-[24px] leading-[100%] tracking-[0.08em] text-white">
            DISTRIBUTION
          </p>
          <div className="h-[1px] w-full lg:flex-1 bg-white"></div>
        </div>

        {/* map + floating card */}
        <div className="relative py-2">
          <img src={map} className="w-full" alt="Distribution map" />

          {/* floating card */}
          <div className="rounded-md static lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-16 bg-white p-6 lg:p-12 w-full lg:w-[550px] lg:h-[650px] shadow-xl mt-4 lg:mt-0">
            <h2 className="font-bold text-[24px] lg:text-[38px] leading-[48px] tracking-[0.08em] text-black mb-4">
              Serving customers, from{" "}
              <span style={{ color: "var(--primary)" }} className="underline">
                coast
              </span>{" "}
              to <br />
              <span style={{ color: "var(--secondary)" }} className="underline">
                coast.
              </span>
            </h2>

            <p className="text-[14px] lg:text-[20px] leading-[24px] lg:leading-[28px] tracking-[0.08em] text-black my-5 lg:my-10">
              Avision sells and supports its full line of scanners and imaging
              products across the entire North American market — including the
              United States, Canada, and Mexico. Whether you're a reseller,
              systems integrator, or enterprise buyer, our sales and
              distribution network ensures fast access to our products and local
              support wherever you operate.
            </p>

            <div className="justify-start w-full flex">
              <div
                className="flex flex-col font-light inline-flex gap-3 px-4 lg:px-6 py-2 lg:py-4 text-[12px] lg:text-[24px] text-[var(--text-2)] tracking-[0.08em] lg:mx-0"
                style={{
                  border: "1px dashed var(--text-2)",
                  borderRadius: "4px",
                  opacity: 0.7,
                  fontFamily: "var(--heading)",
                }}
              >
                <p className="text-[12px] font-light leading-[100%] tracking-[0.08em] text-[#616262]">
                  United States · Mexico · Canada
                </p>
                <p className="text-[18px] font-light leading-[100%] tracking-[0.08em] text-[#616262]">
                  NORTH AMERICA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* visit us */}
      <div className="w-full py-15 px-5 lg:px-20">
        <div className="relative isolate mx-auto grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-0 items-start">
          <Blobs />
          {/* left */}
          <div>
            <h2 className="font-bold text-[32px] lg:text-[62px] leading-[40px] lg:leading-[80px] tracking-[0.08em] text-black">
              VISIT US
            </h2>
            <div className="flex flex-col gap-4 mt-10 lg:max-w-[400px]">
              <div className="flex flex-row items-center gap-8 h-[50px] py-8 border-b border-[#8A8A8A]">
                <BuildingOffice2Icon className="w-6 h-6 text-black" />
                <a
                  href="https://www.google.com/maps/place/5694+Stewart+Ave,+Fremont,+CA+94538/@37.5158922,-121.9849446,815m/data=!3m2!1e3!4b1!4m6!3m5!1s0x808fc751ce0c0211:0xf05beae8974d39e3!8m2!3d37.515888!4d-121.9823697!16s%2Fg%2F11pcnfm6rk?entry=ttu&g_ep=EgoyMDI2MDQyMC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-light text-[18px] lg:text-[24px] leading-[100%] tracking-[0.08em] text-[#616262]"
                >
                  COMPANY ADDRESS
                </a>
              </div>
              <div className="flex flex-row items-center gap-8 h-[50px] py-8 border-b border-[#8A8A8A]">
                <PhoneIcon className="w-6 h-6 text-black" />
                <a
                  href="tel:510-739-2369"
                  className="font-light text-[18px] lg:text-[24px] leading-[100%] tracking-[0.08em] text-[#616262]"
                >
                  COMPANY PHONE
                </a>
              </div>
              <div className="flex flex-row items-center gap-8 h-[50px] py-8">
                <EnvelopeIcon className="w-6 h-6 text-black" />
                <a
                  href="mailto:avision@gmail.com"
                  className="font-light text-[18px] lg:text-[24px] leading-[100%] tracking-[0.08em] text-[#616262]"
                >
                  COMPANY EMAIL
                </a>
              </div>
            </div>
          </div>
          {/* right */}
          <div>
            <img src={location} alt="Company location" className="w-full h-auto object-cover rounded-lg shadow-md" />
            {/* <iframe
              src="https://www.google.com/maps/place/5694+Stewart+Ave,+Fremont,+CA+94538/@37.5158922,-121.9849446,815m/data=!3m2!1e3!4b1!4m6!3m5!1s0x808fc751ce0c0211:0xf05beae8974d39e3!8m2!3d37.515888!4d-121.9823697!16s%2Fg%2F11pcnfm6rk?entry=ttu&g_ep=EgoyMDI2MDQyMC4wIKXMDSoASAFQAw%3D%3D"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg shadow-md"
            /> */}
          </div>
        </div>
      </div>
    </main>
  );
}
