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
      className="w-max rounded-full border px-4 py-2"
      style={{ borderColor, color: textColor }}
    >
      <p>{text}</p>
    </div>
  );
}

export default function Sustainability() {
  return (
    <main className="w-full bg-[var(--bg)]">
      {/* hero section */}
      <div
        className="relative flex h-[40em] items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-8xl font-bold tracking-normal">Sustainability</h1>
          <h2 className="text-3xl mt-4">
            Our commitment to creating sustainable products.
          </h2>
        </div>
      </div>
      {/* mission */}
      <div className="relative flex flex-col px-10 py-12 gap-6">
        <h3 className="font-semibold text-5xl text-[var(--primary)]">
          Mission
        </h3>
        <h4 className="font-regular text-lg lg:w-1/2">
          Avision labs is committed to conserving natural resources and
          minimizing our impact on the environment. We actively implement
          measures to increase efficiency, conserve energy and water, improve
          air quality, and reduce waste through our office building operations,
          waste management, product development, and recycling programs.
        </h4>

        <div className="flex gap-20 px-10 py-10 grid sm:grid-cols-1 lg:grid-cols-3">
            <div
              className="relative flex-1 flex flex-col items-center justify-center py-10 px-6 gap-4"
            >
              {/* Corner brackets */}
              <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[var(--primary)]" />
              <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[var(--primary)]" />
              <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[var(--primary)]" />
              <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[var(--primary)]" />

              <span className="text-6xl font-bold text-[var(--primary)]">
                95%
              </span>
              <span className="text-base text-gray-500 text-center">
                Waste diverted from landfills
              </span>
            </div>
            <div
              className="relative flex-1 flex flex-col items-center justify-center py-10 px-6 gap-4"
            >
              {/* Corner brackets */}
              <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[var(--primary)]" />
              <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[var(--primary)]" />
              <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[var(--primary)]" />
              <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[var(--primary)]" />

              <span className="text-6xl font-bold text-[var(--primary)]">
                100%
              </span>
              <span className="text-base text-gray-500 text-center">
                Recyclable packaging
              </span>
            </div>
            <div
              className="relative flex-1 flex flex-col items-center justify-center py-10 px-6 gap-4"
            >
              {/* Corner brackets */}
              <span className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-[var(--primary)]" />
              <span className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-[var(--primary)]" />
              <span className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-[var(--primary)]" />
              <span className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-[var(--primary)]" />

              <span className="text-6xl font-bold text-[var(--primary)]">
                ISO
              </span>
              <span className="text-base text-gray-500 text-center">
                9001 & 14001 Certified
              </span>
            </div>
        </div>
      </div>
      {/* energy efficient products */}
      <section className="relative flex flex-col px-10 py-12 gap-6">
        <h3 className="font-semibold text-5xl text-[var(--primary)]">
          Energy Efficient Products
        </h3>
        <h4 className="font-regular text-lg">
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
          className="w-full h-[35em] object-cover"
        />
      </section>
      <section className="relative flex flex-col px-8 py-12 gap-6 bg-[var(--primary)] text-white">
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 px-16 py-10">
          {/* clean delivery & recycling */}
          <div className="flex flex-col gap-10 p-4">
            <h3 className="font-semibold text-5xl">
              Clean Delivery & Recycling
            </h3>
            <p className="text-xl">
              All products packaged with 100% recyclable materials. Installation
              services include removal, re-use, and environmentally sensitive
              disposal.
            </p>
            <div className="grid grid-cols-2 gap-4 py-2">
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-5xl">100%</h3>
                <p>Recyclable Packaging</p>
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-semibold text-5xl">0</h3>
                <p>Waste to landfills</p>
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <Pill text="100% Recyclable" />
              <Pill text="Installation Service" />
              <Pill text="Eco-Disposal" />
            </div>
          </div>
          {/* images */}
          <div className="grid grid-cols-2 gap-6">
            <img
              src={boxesImage}
              alt="boxes being delivered"
              className="h-[15em] w-full object-cover"
            />
            <img
              src={moverImage}
              alt="mover carrying a box"
              className="h-[15em] w-full object-cover"
            />
            <img
              src={pagesImage}
              alt="stack of recyclable paper"
              className="col-span-2 h-[15em] w-full object-cover"
            />
          </div>
        </div>
      </section>
      {/* green facilities */}
      <section className="relative px-10 py-12 flex flex-col gap-6">
        <img
          src={mover2Image}
          alt="mover carrying a box"
          className="h-[35em] w-full object-cover my-6"
        />
        <h3 className="font-semibold text-5xl text-[var(--primary)]">
          Green Facilities
        </h3>
        <h4 className="font-regular text-lg w-full">
          Active recycling programs divert up to 95% of solid waste from
          landfills across all facilities.
        </h4>
        <h4 className="font-semibold text-lg capitalize">
          Materials Recycled:
        </h4>
        <div className="flex flex-row gap-3">
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
      </section>
      {/* image carousel */}
      <section className="sustainability-carousel relative my-10 h-[30em] w-full overflow-x-auto overflow-y-hidden">
        <div className="sustainability-carousel-track flex h-full w-max gap-4 pr-4">
          {[
            ...sustainabilityCarouselImages,
            ...sustainabilityCarouselImages,
          ].map((image, index) => (
            <img
              key={`${image.alt}-${index}`}
              src={image.src}
              alt={image.alt}
              className="h-[30em] min-w-[85vw] object-cover md:min-w-[55vw] lg:min-w-[45vw]"
            />
          ))}
        </div>
      </section>
    </main>
  );
}