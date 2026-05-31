import heroImage from '../../assets/sustainability/hero.jpg'
import printerImage from '../../assets/sustainability/printer.png'
import boxesImage from '../../assets/sustainability/boxes.png'
import pagesImage from '../../assets/sustainability/pages.jpg'
import moverImage from '../../assets/sustainability/mover.jpg'

function Pill(text: string) {
    return (
        <div>
            <p>{text}</p>
        </div>
    )
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
                    <h2 className="text-3xl mt-4">Our commitment to creating sustainable products.</h2>
                </div>
            </div>
            {/* mission */}
            <div className="relative flex flex-col px-8 py-12 gap-6">
                <h3 className="font-semibold text-5xl text-[var(--primary)]">Mission</h3>
                <h4 className="font-regular text-lg w-1/2">Avision labs is committed to conserving natural resources and minimizing our impact on the environment. We actively implement measures to increase efficiency, conserve energy and water, improve air quality, and reduce waste through our office building operations, waste management, product development, and recycling programs.</h4>
            </div>

            {/* TODO: stats */}
            {/* energy efficient products */}
            <div className="relative flex flex-col px-8 py-12 gap-6">
                <h3 className="font-semibold text-5xl text-[var(--primary)]">Energy Efficient Products</h3>
                <h4 className="font-regular text-lg">Avision Scanners meet and exceed applicable environmental regulatory requirements, including ENERGY STAR® and RoHS (Restriction of Hazardous Substances), and are manufactured under ISO 9001 and ISO 14001 certified quality and environmental management systems. Visioneer is an EPEAT Participating Manufacturer, with eligible products registered in the EPEAT program of the Global Electronics Council, supporting more sustainable electronics.</h4>
            </div>
            <img src={printerImage} alt="printer" className="w-full h-[35em] object-cover" />
            <div className="relative flex flex-col px-8 py-12 gap-6 bg-[var(--primary)] text-white">
                <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-8 px-16 py-10">
                    {/* clean delivery & recycling */}
                    <div className="flex flex-col gap-10 p-4">
                        <h3 className="font-semibold text-5xl">Clean Delivery & Recycling</h3>
                        <p className="text-xl">All products packaged with 100% recyclable materials. Installation services include removal, re-use, and environmentally sensitive disposal.</p>
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
                    </div>
                    {/* images */}
                    <div>
                        <div className="flex flex-row gap-6">
                            <img src={boxesImage} alt="printer" className="w-1/2 h-[15em] object-cover" />
                            <img src={moverImage} alt="printer" className="w-1/2 h-[15em] object-cover" />
                        </div>
                        <div className="flex flex-row gap-4 mt-4">
                            <img src={pagesImage} alt="printer" className="w-full h-[15em] object-cover" />
                        </div>
                    </div>
                </div>
            </div>


        </main>
    )
}