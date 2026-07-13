import heroImage from "../../assets/sustainability/hero.jpg";
import printerImage from "../../assets/sustainability/printer.png";
import boxesImage from "../../assets/sustainability/boxes.png";
import pagesImage from "../../assets/sustainability/pages.jpg";
import moverImage from "../../assets/sustainability/mover.jpg";
import mover2Image from "../../assets/sustainability/mover2.jpg";

const sustainabilityCarouselImages = [
  { src: heroImage, alt: "Sustainability hero banner" },
  { src: printerImage, alt: "Energy efficient printer" },
  { src: boxesImage, alt: "Recyclable delivery boxes" },
  { src: pagesImage, alt: "Recycled paper stack" },
  { src: moverImage, alt: "Mover handling recycled boxes" },
  { src: mover2Image, alt: "Facility recycling operations" },
];

function Pill({
  text,
  borderColor = "rgba(255, 255, 255, 0.3)",
  textColor = "inherit",
}: {
  text: string;
  borderColor?: string;
  textColor?: string;
}) {
  return (
    <div
      className="w-max whitespace-nowrap rounded-full border px-3 py-1.5 text-sm sm:px-4 sm:py-2 sm:text-base"
      style={{ borderColor, color: textColor }}
    >
      <p>{text}</p>
    </div>
  );
}

export default function Sustainability() {
  return (
    <main className="w-full overflow-x-hidden bg-[var(--bg)]">
      {/* hero section */}
      <section
        className="relative flex h-[28em] items-center justify-center bg-cover bg-center sm:h-[34em] lg:h-[40em]"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        <div className="relative z-10 text-center text-white">
          <h1 className="px-4 text-4xl font-bold tracking-normal sm:text-6xl lg:text-8xl">
            Sustainability
          </h1>
          <h2 className="mt-3 px-4 text-lg sm:mt-4 sm:text-2xl lg:text-3xl">
            Our commitment to creating sustainable products.
          </h2>
        </div>
      </section>
      {/* mission */}
      <section className="relative py-8 sm:py-10 lg:py-12">
        <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-0 flex flex-col gap-8">
          <div className="flex flex-col gap-5 sm:gap-6 text-center items-center">
            <h3 className="text-3xl font-semibold text-[var(--primary)] sm:text-4xl lg:text-5xl">
              Mission
            </h3>
            <h4 className="font-regular text-base sm:text-lg">
              Avision labs is committed to conserving natural resources and
              minimizing our impact on the environment. We actively implement
              measures to increase efficiency, conserve energy and water, improve
              air quality, and reduce waste through our office building
              operations, waste management, product development, and recycling
              programs.
            </h4>
          </div>
          <div className="grid grid-cols-1 justify-items-center gap-4 py-4 sm:grid-cols-2 sm:gap-6 sm:py-6 lg:grid-cols-3 lg:gap-8 lg:py-8">
            <div className="relative flex w-full max-w-[15rem] flex-col items-center justify-center gap-2 px-3 py-6 sm:max-w-[20rem] sm:gap-3 sm:px-4 sm:py-7">
              {/* Corner brackets */}
              <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[var(--primary)]" />
              <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[var(--primary)]" />
              <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[var(--primary)]" />
              <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[var(--primary)]" />

              <span className="text-4xl font-bold text-[var(--primary)] sm:text-5xl">
                95%
              </span>
              <span className="text-sm text-center text-gray-500 sm:text-base">
                Waste diverted from landfills
              </span>
            </div>
            <div className="relative flex w-full max-w-[15rem] flex-col items-center justify-center gap-2 px-3 py-6 sm:max-w-[20rem] sm:gap-3 sm:px-4 sm:py-7">
              {/* Corner brackets */}
              <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[var(--primary)]" />
              <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[var(--primary)]" />
              <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[var(--primary)]" />
              <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[var(--primary)]" />

              <span className="text-4xl font-bold text-[var(--primary)] sm:text-5xl">
                100%
              </span>
              <span className="text-sm text-center text-gray-500 sm:text-base">
                Recyclable packaging
              </span>
            </div>
            <div className="relative flex w-full max-w-[15rem] flex-col items-center justify-center gap-2 px-3 py-6 sm:col-span-2 sm:max-w-[20rem] sm:gap-3 sm:px-4 sm:py-7 lg:col-span-1">
              {/* Corner brackets */}
              <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[var(--primary)]" />
              <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[var(--primary)]" />
              <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[var(--primary)]" />
              <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[var(--primary)]" />

              <span className="text-4xl font-bold text-[var(--primary)] sm:text-5xl">
                ISO
              </span>
              <span className="text-sm text-center text-gray-500 sm:text-base">
                9001 & 14001 Certified
              </span>
            </div>
          </div>
        </div>
      </section>
      {/* energy efficient products */}
      <section className="relative py-8 sm:py-10 lg:py-12">
        <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-0 flex flex-col gap-5 sm:gap-6">
          <h3 className="text-3xl font-semibold text-[var(--primary)] sm:text-4xl lg:text-5xl">
            Energy Efficient Products
          </h3>
          <h4 className="font-regular text-base sm:text-lg">
            Avision Scanners meet and exceed applicable environmental regulatory
            requirements, including ENERGY STAR® and RoHS (Restriction of
            Hazardous Substances), and are manufactured under ISO 9001 and ISO
            14001 certified quality and environmental management systems.
            Visioneer is an EPEAT Participating Manufacturer, with eligible
            products registered in the EPEAT program of the Global Electronics
            Council, supporting more sustainable electronics.
          </h4>
          <img
            src={printerImage}
            alt="printer"
            className="h-[18em] w-full object-cover sm:h-[24em] lg:h-[35em]"
          />
        </div>
      </section>
      <section className="relative bg-[var(--primary)] py-8 text-white sm:py-10 lg:py-12">
        <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-0">
          <div className="grid gap-6 py-3 lg:grid-cols-2 lg:py-10">
            {/* clean delivery & recycling */}
            <div className="flex flex-col gap-6 p-0 sm:gap-8 sm:p-2 lg:gap-10 lg:p-4">
              <h3 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
                Clean Delivery & Recycling
              </h3>
              <p className="text-base sm:text-lg lg:text-xl">
                All products packaged with 100% recyclable materials.
                Installation services include removal, re-use, and
                environmentally sensitive disposal.
              </p>
              <div className="grid grid-cols-2 gap-3 py-2 sm:gap-4">
                <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
                  <h3 className="text-4xl font-semibold sm:text-5xl">100%</h3>
                  <p>Recyclable Packaging</p>
                </div>
                <div className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
                  <h3 className="text-4xl font-semibold sm:text-5xl">0</h3>
                  <p>Waste to landfills</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <Pill text="100% Recyclable" />
                <Pill text="Installation Service" />
                <Pill text="Eco-Disposal" />
              </div>
            </div>
            {/* images */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              <img
                src={boxesImage}
                alt="boxes being delivered"
                className="h-[10em] w-full object-cover sm:h-[12em] lg:h-[15em]"
              />
              <img
                src={moverImage}
                alt="mover carrying a box"
                className="h-[10em] w-full object-cover sm:h-[12em] lg:h-[15em]"
              />
              <img
                src={pagesImage}
                alt="stack of recyclable paper"
                className="col-span-2 h-[10em] w-full object-cover sm:h-[12em] lg:h-[15em]"
              />
            </div>
          </div>
        </div>
      </section>
      {/* green facilities */}
      <section className="relative py-8 mt-8 sm:py-10 lg:py-12">
        <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-0 flex flex-col gap-5 sm:gap-4">
          <img
            src={mover2Image}
            alt="mover carrying a box"
            className="h-[18em] w-full object-cover sm:h-[24em] lg:h-[35em]"
          />
          <h3 className="text-3xl font-semibold text-[var(--primary)] mt-5  sm:text-4xl lg:text-5xl">
            Green Facilities
          </h3>
          <h4 className="font-regular w-full text-base sm:text-lg">
            Active recycling programs divert up to 95% of solid waste from
            landfills across all facilities.
          </h4>
          <h4 className="font-semibold text-lg capitalize">
            Materials Recycled:
          </h4>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Pill text="Paper" borderColor="#CAD5E2" textColor="#616262" />
            <Pill text="Cardboard" borderColor="#CAD5E2" textColor="#616262" />
            <Pill text="Plastic" borderColor="#CAD5E2" textColor="#616262" />
            <Pill text="Glass" borderColor="#CAD5E2" textColor="#616262" />
            <Pill text="Cans" borderColor="#CAD5E2" textColor="#616262" />
            <Pill
              text="Printer Toner"
              borderColor="#CAD5E2"
              textColor="#616262"
            />
            <Pill text="Batteries" borderColor="#CAD5E2" textColor="#616262" />
          </div>
        </div>
      </section>
      {/* image carousel */}
      <section className="sustainability-carousel relative my-8 h-[14em] w-full overflow-x-auto overflow-y-hidden sm:my-10 sm:h-[20em] lg:h-[25em]">
        <div className="sustainability-carousel-track flex h-full w-max gap-4 pr-4">
          {[
            ...sustainabilityCarouselImages,
            ...sustainabilityCarouselImages,
          ].map((image, index) => (
            <img
              key={`${image.alt}-${index}`}
              src={image.src}
              alt={image.alt}
              className="h-[14em] min-w-[85vw] object-cover sm:h-[20em] md:min-w-[55vw] lg:h-[25em] lg:min-w-[45vw]"
            />
          ))}
        </div>
      </section>
      <section>
        <div className="mx-auto w-full max-w-[1280px] px-6 lg:px-0">
          <h4 className="font-regular w-full py-4 text-center text-base sm:text-lg">
            Avision labs is committed to sustainable electronics and
            environmental responsibility
          </h4>
        </div>
      </section>
    </main>
  );
}
