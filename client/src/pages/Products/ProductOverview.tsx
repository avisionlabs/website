import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { apiUrl } from "../../lib/api";
import Button from "../../components/Button";
import { ProductOverviewSkeleton } from "../../components/Skeletons";

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

type DriverItem = {
  name: string;
  version?: string;
  size?: string;
  os?: string;
  url: string;
};
type DownloadFile = {
  language?: string;
  resolution?: string;
  size?: string;
  url: string;
};
type Downloads = {
  drivers?: DriverItem[];
  software?: DriverItem[];
  manuals?: DownloadFile[];
  brochures?: DownloadFile[];
  quickGuides?: DownloadFile[];
  productPhotos?: DownloadFile[];
};

type Feature = { title: string; description: string };

type Tab = "features" | "specs" | "downloads";

export default function ProductOverview() {
  const { model } = useParams<{ model: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [specs, setSpecs] = useState<Spec[]>([]);
  const [downloads, setDownloads] = useState<Downloads>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<Tab>("specs");

  useEffect(() => {
    if (!model) return;
    const controller = new AbortController();
    let active = true;

    setLoading(true);
    setError(null);

    window.scrollTo(0, 0);

    async function load() {
      try {
        const [productRes, featuresRes, specsRes, downloadsRes] = await Promise.all([
          fetch(apiUrl(`/api/products/${encodeURIComponent(model!)}`), { signal: controller.signal }),
          fetch(apiUrl(`/api/products/${encodeURIComponent(model!)}/features`), { signal: controller.signal }),
          fetch(apiUrl(`/api/products/${encodeURIComponent(model!)}/specs`), { signal: controller.signal }),
          fetch(apiUrl(`/api/products/${encodeURIComponent(model!)}/downloads`), { signal: controller.signal }),
        ]);

        if (!productRes.ok) throw new Error("Product not found");
        if (active) {
          setProduct(await productRes.json());
          const feats: Feature[] = featuresRes.ok ? await featuresRes.json() : [];
          setFeatures(feats);
          setActiveTab(feats.length > 0 ? "features" : "specs");
          if (specsRes.ok) setSpecs(await specsRes.json());
          if (downloadsRes.ok) setDownloads(await downloadsRes.json());
        }
      } catch (err) {
        if (active && (err as DOMException).name !== "AbortError") {
          setError((err as Error).message);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
      controller.abort();
    };
  }, [model]);

  if (loading) return <ProductOverviewSkeleton />;

  if (error || !product) {
    return (
      <div className="mx-auto max-w-7xl px-6 pt-24">
        <p className="text-red-500">{error ?? "Product not found."}</p>
      </div>
    );
  }

  const tabs: { id: Tab; label: string }[] = [
    ...(features.length > 0 ? [{ id: "features" as Tab, label: "Features" }] : []),
    { id: "specs", label: "Product Specifications" },
    { id: "downloads", label: "Product\nDownloads" },
  ];

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-4xl px-6 py-12">
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
                loading="lazy"
                decoding="async"
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
                  .map((s) => s!.replace(/([a-z])([A-Z])/g, "$1 $2"))
                  .join(" / ")}
              </p>
            )}

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.model}
            </h1>

            {product.description && (
              <p className="text-sm mt-4 flex gap-3 text-base leading-relaxed text-black">
                {product.description}
              </p>
            )}

            <div className="mt-8 flex gap-3">
              <Button
                onClick={() =>
                  navigate(
                    `/contact?tab=sales&model=${encodeURIComponent(product.model)}`,
                  )
                }
                style={{ fontSize: "16px", boxShadow: "none" }}
              >
                Request a Quote
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom: full-width tabs */}
        <div className="mt-16">
          <div>
            {/* Tab bar */}
            <div className="flex w-full border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 whitespace-pre-line leading-tight pb-3 text-center text-sm font-medium transition-colors sm:flex-none sm:whitespace-normal sm:mr-6 sm:text-left ${
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
              {activeTab === "features" && (
                <ul className="space-y-6">
                  {features.map((f, i) => (
                    <li key={i}>
                      <p className="text-sm font-semibold text-gray-900">{f.title}</p>
                      <p className="mt-1 text-sm text-gray-600">{f.description}</p>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === "specs" &&
                (specs.length > 0 ? (() => {
                  const groups = specs.reduce<Record<string, Spec[]>>((acc, spec) => {
                    const cat = spec.specCategory || 'General Specification'
                    ;(acc[cat] ??= []).push(spec)
                    return acc
                  }, {})
                  const sortedEntries = Object.entries(groups).sort(([a], [b]) =>
                    a === 'General Specification' ? -1 : b === 'General Specification' ? 1 : 0
                  )
                  return (
                    <div className="space-y-6">
                      {sortedEntries.map(([category, items]) => (
                        <div key={category} className="overflow-hidden rounded-lg border border-gray-200">
                          <div className="px-4 py-2.5 text-sm font-semibold text-white" style={{ backgroundColor: 'var(--accent)' }}>
                            <h2>{category}</h2>
                          </div>
                          <table className="w-full text-sm">
                            <tbody>
                              {items.map((spec, i) => (
                                <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                  <td className="w-1/2 px-4 py-2.5 text-gray-500">{spec.specName}</td>
                                  <td className="w-1/2 px-4 py-2.5 font-medium text-gray-900">{spec.specValue}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ))}
                    </div>
                  )
                })() : (
                  <p className="text-sm text-gray-400">
                    No specifications available.
                  </p>
                ))}

              {activeTab === "downloads" &&
                (() => {
                  const sections: {
                    label: string;
                    items: { title: string; subtitle?: string; url: string }[];
                  }[] = [
                    {
                      label: "Drivers",
                      items: (downloads.drivers ?? []).map((d) => ({
                        title: `${d.name}${d.version ? ` v${d.version}` : ""}`,
                        subtitle: [d.os, d.size].filter(Boolean).join(" · "),
                        url: d.url,
                      })),
                    },
                    {
                      label: "Software",
                      items: (downloads.software ?? []).map((d) => ({
                        title: `${d.name}${d.version ? ` v${d.version}` : ""}`,
                        subtitle: [d.os, d.size].filter(Boolean).join(" · "),
                        url: d.url,
                      })),
                    },
                    {
                      label: "Manuals",
                      items: (downloads.manuals ?? []).map((f) => ({
                        title: f.language ?? "Manual",
                        subtitle: f.size,
                        url: f.url,
                      })),
                    },
                    {
                      label: "Brochures",
                      items: (downloads.brochures ?? []).map((f) => ({
                        title: f.language ?? "Brochure",
                        subtitle: f.size,
                        url: f.url,
                      })),
                    },
                    {
                      label: "Quick Guides",
                      items: (downloads.quickGuides ?? []).map((f) => ({
                        title: f.language ?? "Quick Guide",
                        subtitle: f.size,
                        url: f.url,
                      })),
                    },
                    {
                      label: "Product Photos",
                      items: (downloads.productPhotos ?? []).map((f) => ({
                        title: f.resolution ?? "Photo",
                        subtitle: f.size,
                        url: f.url,
                      })),
                    },
                  ].filter((s) => s.items.length > 0);

                  if (sections.length === 0)
                    return (
                      <p className="text-sm text-gray-400">
                        No downloads available.
                      </p>
                    );

                  return (
                    <div className="space-y-8">
                      {sections.map((section) => (
                        <div key={section.label}>
                          <h2
                            className="mb-2 text-sm font-semibold"
                            style={{ color: "var(--primary)" }}
                          >
                            {section.label}
                          </h2>
                          <ul className="divide-y divide-gray-100">
                            {section.items.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-center justify-between py-3"
                              >
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    {item.title}
                                  </p>
                                  {item.subtitle && (
                                    <p className="text-xs text-gray-400">
                                      {item.subtitle}
                                    </p>
                                  )}
                                </div>
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1.5 rounded-md border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
                                >
                                  <ArrowDownTrayIcon className="h-3.5 w-3.5" />
                                  Download
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  );
                })()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
