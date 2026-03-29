import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";

type Product = {
  id: number;
  model: string;
  description: string | null;
  imageUrl: string | null;
  inStock: boolean | null;
  category: string | null;
  subcategory: string | null;
};

type Spec = {
  productId: number;
  specCategory: string;
  specName: string;
  specValue: string;
};

type Download = {
  name: string;
  type: string;
  size: string;
  href: string;
};

const PLACEHOLDER_DOWNLOADS: Download[] = [
  { name: "Windows Driver (64-bit)", type: "Driver", size: "42 MB", href: "#" },
  { name: "macOS Driver", type: "Driver", size: "38 MB", href: "#" },
  { name: "User Manual", type: "Manual", size: "4.2 MB", href: "#" },
  { name: "Brochure", type: "Manual", size: "1.1 MB", href: "#" },
  { name: "Firmware Update v2.1", type: "Firmware", size: "18 MB", href: "#" },
];

type Tab = "specs" | "downloads";

export default function ProductOverview() {
  const { model } = useParams<{ model: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [specs, setSpecs] = useState<Spec[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("specs");

  useEffect(() => {
    if (!model) return;
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [productRes, specsRes] = await Promise.all([
          fetch(`/api/products/${encodeURIComponent(model!)}`, {
            signal: controller.signal,
          }),
          fetch(`/api/products/${encodeURIComponent(model!)}/specs`, {
            signal: controller.signal,
          }),
        ]);

        if (!productRes.ok) throw new Error("Product not found");
        setProduct(await productRes.json());
        if (specsRes.ok) setSpecs(await specsRes.json());
      } catch (err) {
        if ((err as DOMException).name !== "AbortError") {
          setError((err as Error).message);
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [model]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-6 pt-24">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-7xl px-6 pt-24">
        <p className="text-red-500">{error ?? "Product not found."}</p>
      </div>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    { id: "specs", label: "Product Specifications" },
    { id: "downloads", label: "Product Downloads" },
  ];

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-0">
        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back
        </button>

        {/* Top: image + info */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left — image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl shadow-md">
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.model}
                className="h-full w-full object-contain p-8"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-gray-300">
                No image available
              </div>
            )}
          </div>

          {/* Right — info */}
          <div className="flex flex-col">
            {(product.category || product.subcategory) && (
              <p className="mb-2 text-sm text-gray-400">
                {[product.category, product.subcategory]
                  .filter(Boolean)
                  .join(" / ")}
              </p>
            )}

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.model}
            </h1>

            <div className="mt-3">
              <span
                className={`inline-block rounded-full px-3 py-0.5 text-xs font-medium ${
                  product.inStock
                    ? "bg-[var(--accent)] text-white"
                    : "bg-[var(--text-2)] text-black"
                }`}
              >
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {product.description && (
              <p className="mt-6 text-base leading-relaxed text-gray-600">
                {product.description}
              </p>
            )}

            <div className="mt-8 flex gap-3">
              <p>
                The Avision AP33Q Series is a compact monochrome laser printer
                designed to simplify your office life with reliable,
                high-quality printing at affordable operating costs. It produces
                professional black and white output at impressive print speeds
                of up to 33 pages per minute with built-in automatic duplex
                printing to help save paper and reduce costs. The printer
                features a 250-sheet input capacity, compact desktop design, and
                user-friendly operation for small to medium office environments.
                Key connectivity features include USB interface and built-in
                network capability with remote device management via embedded
                web page, allowing administrators to monitor supplies status,
                scan count, and copy count by simply entering the printer's IP
                address in a web browser. The AP33Q Series incorporates optional
                mobile printing capabilities that enable wireless connectivity
                to Android devices via Mopria or iOS devices via AirPrint for
                convenient on-the-go printing. The printer supports various
                media sizes and types including plain paper, envelopes, labels,
                and card stock. With its reliable performance, energy-efficient
                operation, and cost-effective consumables including EzRefill
                toner options, the AP33Q delivers exceptional value for
                businesses seeking dependable document output. The compact
                design makes it suitable for desktop placement while providing
                professional-quality results for everyday office printing needs.
              </p>
            </div>

            <div className="mt-8 flex gap-3">
              <a
                href="/contact"
                className="rounded-lg px-6 py-3 text-sm font-semibold text-white"
                style={{ background: "var(--primary)" }}
              >
                Request a Quote
              </a>
            </div>
          </div>
        </div>

        {/* Bottom: full-width tabs */}
        <div className="mt-16">
          <div>
            {/* Tab bar */}
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`mr-6 pb-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "border-b-2 text-[var(--primary)]"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                  style={
                    activeTab === tab.id
                      ? { borderColor: "var(--primary)" }
                      : {}
                  }
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="mt-6">
              {activeTab === "specs" &&
                (specs.length > 0 ? (
                  <dl className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-2 sm:divide-y-0 sm:gap-x-12">
                    {specs.map((spec, i) => (
                      <div
                        key={i}
                        className="flex justify-between border-b border-gray-100 py-3 text-sm"
                      >
                        <dt className="text-gray-500">{spec.specName}</dt>
                        <dd className="font-medium text-gray-900">
                          {spec.specValue}
                        </dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <p className="text-sm text-gray-400">
                    No specifications available.
                  </p>
                ))}

              {activeTab === "downloads" && (
                <ul className="divide-y divide-gray-100">
                  {PLACEHOLDER_DOWNLOADS.map((dl) => (
                    <li
                      key={dl.name}
                      className="flex items-center justify-between py-3"
                    >
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {dl.name}
                        </p>
                        <p className="text-xs text-gray-400">
                          {dl.type} · {dl.size}
                        </p>
                      </div>
                      <a
                        href={dl.href}
                        className="flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                      >
                        <ArrowDownTrayIcon className="h-3.5 w-3.5" />
                        Download
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
