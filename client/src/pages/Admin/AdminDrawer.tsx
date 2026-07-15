import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  XMarkIcon,
  PlusIcon,
  TrashIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import { apiUrl } from "../../lib/api";
import type { AdminProduct, DrawerProduct } from "./AdminPage";

// ── JSONB types ────────────────────────────────────────────────────────────────

type Feature = { title: string; description: string };
type SpecRow = { section: string; name: string; value: string };
type DownloadFile = {
  language?: string;
  resolution?: string;
  size?: string;
  url: string;
};
type DriverItem = {
  name: string;
  version?: string;
  size?: string;
  os?: string;
  url: string;
};
type Downloads = {
  drivers: DriverItem[];
  software: DriverItem[];
  manuals: DownloadFile[];
  brochures: DownloadFile[];
  quickGuides: DownloadFile[];
  productPhotos: DownloadFile[];
};

const EMPTY_DOWNLOADS: Downloads = {
  drivers: [],
  software: [],
  manuals: [],
  brochures: [],
  quickGuides: [],
  productPhotos: [],
};

// ── Form state ─────────────────────────────────────────────────────────────────

type FormState = {
  model: string;
  category: string;
  series: string;
  url: string;
  imageUrl: string;
  description: string;
  inStock: boolean;
  onWebsite: boolean;
  features: Feature[];
  specs: SpecRow[];
  downloads: Downloads;
};

const EMPTY_FORM: FormState = {
  model: "",
  category: "",
  series: "",
  url: "",
  imageUrl: "",
  description: "",
  inStock: false,
  onWebsite: true,
  features: [],
  specs: [],
  downloads: EMPTY_DOWNLOADS,
};

// ── Props ──────────────────────────────────────────────────────────────────────

type Tab = "basic" | "features" | "specs" | "downloads";

type Props = {
  mode: "create" | "edit";
  product: DrawerProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: (saved: AdminProduct) => void;
  categoryOptions: string[];
  seriesOptions: string[];
};

// ── Shared input styles ────────────────────────────────────────────────────────

const inputCls =
  "w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)]";
const labelCls = "block text-xs font-medium text-gray-500 mb-1";

// ── Subcomponents ──────────────────────────────────────────────────────────────

function Toggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ${
        value ? "bg-[var(--accent)]" : "bg-gray-200"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 translate-y-0.5 rounded-full bg-white shadow transition-transform duration-200 ${
          value ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

function FieldRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

function DeleteBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-500 transition"
    >
      <TrashIcon className="h-4 w-4" />
    </button>
  );
}

function AddBtn({
  label,
  onClick,
  className,
}: {
  label: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        className ??
        "flex w-full items-center justify-center gap-1.5 rounded-lg border border-dashed border-gray-300 px-3 py-2 text-sm text-gray-500 hover:border-[var(--accent)] hover:text-[var(--accent)] transition"
      }
    >
      <PlusIcon className="h-4 w-4" />
      {label}
    </button>
  );
}

function SkeletonRows() {
  return (
    <div className="animate-pulse space-y-3">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-16 rounded-lg bg-gray-100" />
      ))}
    </div>
  );
}

// ── Tab: Features ──────────────────────────────────────────────────────────────

function FeaturesTab({
  features,
  onChange,
  loading,
}: {
  features: Feature[];
  onChange: (f: Feature[]) => void;
  loading: boolean;
}) {
  if (loading) return <SkeletonRows />;

  function update(i: number, field: keyof Feature, value: string) {
    const next = [...features];
    next[i] = { ...next[i], [field]: value };
    onChange(next);
  }

  return (
    <div className="space-y-3">
      {features.map((f, i) => (
        <div key={i} className="rounded-lg border border-gray-200 p-3">
          <div className="flex items-start gap-2">
            <div className="flex-1 space-y-2">
              <input
                placeholder="Feature title"
                value={f.title}
                onChange={(e) => update(i, "title", e.target.value)}
                className={inputCls}
              />
              <textarea
                placeholder="Feature description"
                rows={4}
                value={f.description}
                onChange={(e) => update(i, "description", e.target.value)}
                className={inputCls + " resize-none"}
              />
            </div>
            <DeleteBtn
              onClick={() => onChange(features.filter((_, idx) => idx !== i))}
            />
          </div>
        </div>
      ))}
      <AddBtn
        label="Add feature"
        onClick={() => onChange([...features, { title: "", description: "" }])}
      />
    </div>
  );
}

// ── Tab: Specs ─────────────────────────────────────────────────────────────────

function SpecsTab({
  specs,
  onChange,
  loading,
}: {
  specs: SpecRow[];
  onChange: (s: SpecRow[]) => void;
  loading: boolean;
}) {
  if (loading) return <SkeletonRows />;

  const sections = Array.from(
    specs.reduce((acc, s) => {
      acc.add(s.section);
      return acc;
    }, new Set<string>()),
  );

  function updateSpec(i: number, field: keyof SpecRow, value: string) {
    const next = [...specs];
    next[i] = { ...next[i], [field]: value };
    onChange(next);
  }

  function removeSpec(i: number) {
    onChange(specs.filter((_, idx) => idx !== i));
  }

  function renameSection(oldName: string, newName: string) {
    onChange(
      specs.map((s) =>
        s.section === oldName ? { ...s, section: newName } : s,
      ),
    );
  }

  const [openSpec, setOpenSpec] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {sections.map((section, si) => {
        const items = specs
          .map((s, idx) => ({ ...s, _idx: idx }))
          .filter((s) => s.section === section);
        return (
          <div
            key={si}
            className="overflow-hidden rounded-lg border border-gray-200"
          >
            <div className="group flex items-center justify-between bg-gray-100 px-4 py-2.5">
              <div className="flex min-w-0 flex-1 items-center gap-1.5">
                <input
                  value={section}
                  onChange={(e) => renameSection(section, e.target.value)}
                  placeholder="Section name"
                  className="min-w-0 flex-1 rounded bg-white px-1 py-0.5 text-sm font-medium text-gray-700 outline-none placeholder:text-gray-400 ring-1 ring-gray-300 focus:ring-2 focus:ring-[var(--accent)] transition"
                />
                <PencilIcon className="h-3.5 w-3.5 shrink-0 text-gray-400" />
              </div>
              <span className="ml-2 rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">
                {items.length}
              </span>
            </div>
            <div className="space-y-3 p-3">
              {items.map((item, idx) => {
                const isOpen = openSpec === item._idx;

                return (
                  <div
                    key={item._idx}
                    className="overflow-hidden rounded-lg border border-gray-200 bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenSpec(isOpen ? null : item._idx)}
                      className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-gray-50"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                          {idx + 1}
                        </span>

                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium text-gray-900">
                            {item.name || `Spec ${idx + 1}`}
                          </div>

                          <div className="truncate text-xs text-gray-500">
                            {item.value || "No value entered"}
                          </div>
                        </div>
                      </div>

                      <svg
                        className={`h-4 w-4 text-gray-400 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className="border-t border-gray-100 p-4">
                        <div className="mb-3 flex justify-end">
                          <DeleteBtn onClick={() => removeSpec(item._idx)} />
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          <div>
                            <label className={labelCls}>Name</label>

                            <input
                              value={item.name}
                              onChange={(e) =>
                                updateSpec(item._idx, "name", e.target.value)
                              }
                              placeholder="e.g. Resolution"
                              className={inputCls}
                            />
                          </div>

                          <div>
                            <label className={labelCls}>Value</label>

                            <input
                              value={item.value}
                              onChange={(e) =>
                                updateSpec(item._idx, "value", e.target.value)
                              }
                              placeholder="e.g. 600 dpi"
                              className={inputCls}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <AddBtn
                label="Add spec"
                onClick={() =>
                  onChange([...specs, { section, name: "", value: "" }])
                }
                className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-gray-50 px-3 py-2 text-sm text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition"
              />
            </div>
          </div>
        );
      })}
      <AddBtn
        label="Add section"
        onClick={() =>
          onChange([...specs, { section: "New Section", name: "", value: "" }])
        }
      />
    </div>
  );
}

// ── Tab: Downloads ─────────────────────────────────────────────────────────────

type DownloadSection = {
  key: keyof Downloads;
  label: string;
  fields: {
    key: string;
    label: string;
    placeholder?: string;
    span2?: boolean;
  }[];
};

const DOWNLOAD_SECTIONS: DownloadSection[] = [
  {
    key: "drivers",
    label: "Drivers",
    fields: [
      { key: "name", label: "Name", placeholder: "TWAIN Driver" },
      { key: "version", label: "Version", placeholder: "2.1.0" },
      { key: "size", label: "Size", placeholder: "45 MB" },
      {
        key: "os",
        label: "OS",
        placeholder: "Windows 7-11, macOS 10.13+",
        span2: true,
      },
      { key: "url", label: "URL *", placeholder: "https://…", span2: true },
    ],
  },
  {
    key: "software",
    label: "Software",
    fields: [
      { key: "name", label: "Name", placeholder: "Scanner Utility" },
      { key: "version", label: "Version" },
      { key: "size", label: "Size" },
      { key: "os", label: "OS", span2: true },
      { key: "url", label: "URL *", placeholder: "https://…", span2: true },
    ],
  },
  {
    key: "manuals",
    label: "Manuals",
    fields: [
      { key: "language", label: "Language", placeholder: "English" },
      { key: "size", label: "Size" },
      { key: "url", label: "URL *", placeholder: "https://…", span2: true },
    ],
  },
  {
    key: "brochures",
    label: "Brochures",
    fields: [
      { key: "language", label: "Language" },
      { key: "size", label: "Size" },
      { key: "url", label: "URL *", placeholder: "https://…", span2: true },
    ],
  },
  {
    key: "quickGuides",
    label: "Quick Guides",
    fields: [
      { key: "language", label: "Language" },
      { key: "size", label: "Size" },
      { key: "url", label: "URL *", placeholder: "https://…", span2: true },
    ],
  },
  {
    key: "productPhotos",
    label: "Product Photos",
    fields: [
      { key: "resolution", label: "Resolution", placeholder: "High" },
      { key: "size", label: "Size" },
      { key: "url", label: "URL *", placeholder: "https://…", span2: true },
    ],
  },
];

function DownloadsTab({
  downloads,
  onChange,
  loading,
}: {
  downloads: Downloads;
  onChange: (d: Downloads) => void;
  loading: boolean;
}) {
  if (loading) return <SkeletonRows />;

  function updateItem(
    section: keyof Downloads,
    i: number,
    field: string,
    value: string,
  ) {
    const items = [...(downloads[section] as Record<string, string>[])];
    items[i] = { ...items[i], [field]: value };
    onChange({ ...downloads, [section]: items });
  }
  function removeItem(section: keyof Downloads, i: number) {
    onChange({
      ...downloads,
      [section]: (downloads[section] as unknown[]).filter(
        (_, idx) => idx !== i,
      ),
    });
  }
  function addItem(section: DownloadSection) {
    const blank = Object.fromEntries(
      section.fields.map((f) => [f.key, ""]),
    ) as Record<string, string>;
    onChange({
      ...downloads,
      [section.key]: [...(downloads[section.key] as unknown[]), blank],
    });
  }

  const [openDownload, setOpenDownload] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {DOWNLOAD_SECTIONS.map((section) => {
        const items = downloads[section.key] as Record<string, string>[];
        return (
          <div
            key={section.key}
            className="overflow-hidden rounded-lg border border-gray-200"
          >
            <div className="flex items-center justify-between bg-gray-100 px-4 py-2.5">
              <span className="text-sm font-medium text-gray-700">
                {section.label}
              </span>
              <span className="rounded-full bg-gray-200 px-2 py-0.5 text-xs text-gray-600">
                {items.length}
              </span>
            </div>
            <div className="space-y-3 p-3">
              {items.map((item, i) => {
                const itemKey = `${section.key}-${i}`;
                const isOpen = openDownload === itemKey;

                return (
                  <div
                    key={itemKey}
                    className="overflow-hidden rounded-lg border border-gray-200 bg-white"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenDownload(isOpen ? null : itemKey)}
                      className="flex w-full items-center justify-between px-4 py-3 text-left transition hover:bg-gray-50"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-green-100 text-xs font-semibold text-green-700">
                          {i + 1}
                        </span>

                        <div className="min-w-0">
                          <div className="truncate text-sm font-medium text-gray-900">
                            {item.name ||
                              item.language ||
                              `${section.label.slice(0, -1)} ${i + 1}`}
                          </div>

                          <div className="truncate text-xs text-gray-500">
                            {item.version ||
                              item.size ||
                              item.resolution ||
                              "Click to edit"}
                          </div>
                        </div>
                      </div>

                      <svg
                        className={`h-4 w-4 text-gray-400 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className="border-t border-gray-100 p-4">
                        <div className="mb-3 flex justify-end">
                          <DeleteBtn
                            onClick={() => removeItem(section.key, i)}
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          {section.fields.map((f) => (
                            <div
                              key={f.key}
                              className={f.span2 ? "md:col-span-2" : ""}
                            >
                              <label className={labelCls}>{f.label}</label>

                              <input
                                value={item[f.key] ?? ""}
                                onChange={(e) =>
                                  updateItem(
                                    section.key,
                                    i,
                                    f.key,
                                    e.target.value,
                                  )
                                }
                                placeholder={f.placeholder}
                                className={inputCls}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
              <AddBtn
                label={`Add ${section.label.toLowerCase().replace(/s$/, "")}`}
                onClick={() => addItem(section)}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function AdminDrawer({
  mode,
  product,
  isOpen,
  onClose,
  onSaved,
  categoryOptions,
  seriesOptions,
}: Props) {
  const [tab, setTab] = useState<Tab>("basic");
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [jsonbLoading, setJsonbLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    setTab("basic");
    setSaveError(null);

    if (mode === "edit" && product) {
      setForm({
        model: product.model,
        category: product.category,
        series: product.series,
        url: product.url,
        imageUrl: product.imageUrl ?? "",
        description: product.description ?? "",
        inStock: product.inStock,
        onWebsite: product.onWebsite,
        features: [],
        specs: [],
        downloads: EMPTY_DOWNLOADS,
      });
      setJsonbLoading(true);
      const m = encodeURIComponent(product.model);
      const noCache = { cache: "no-store" as const };
      Promise.all([
        fetch(apiUrl(`/api/products/${m}/features`), noCache).then((r) =>
          r.json(),
        ),
        fetch(apiUrl(`/api/products/${m}/specs`), noCache).then((r) =>
          r.json(),
        ),
        fetch(apiUrl(`/api/products/${m}/downloads`), noCache).then((r) =>
          r.json(),
        ),
      ])
        .then(([features, specsArr, downloads]) => {
          const specs: SpecRow[] = (
            specsArr as {
              specCategory: string;
              specName: string;
              specValue: string;
            }[]
          ).map((s) => ({
            section: s.specCategory ?? "",
            name: s.specName,
            value: s.specValue,
          }));
          setForm((prev) => ({
            ...prev,
            features: Array.isArray(features) ? features : [],
            specs,
            downloads:
              downloads && typeof downloads === "object"
                ? { ...EMPTY_DOWNLOADS, ...downloads }
                : EMPTY_DOWNLOADS,
          }));
        })
        .catch(() => {})
        .finally(() => setJsonbLoading(false));
    } else {
      setForm(EMPTY_FORM);
      setJsonbLoading(false);
    }
  }, [isOpen, mode, product]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSave() {
    if (!form.model.trim() || !form.category || !form.url.trim()) {
      setSaveError("Model, category, and URL are required.");
      setTab("basic");
      return;
    }
    const driversAndSoftware = [
      ...form.downloads.drivers,
      ...form.downloads.software,
    ] as DriverItem[];
    const otherDownloads = [
      ...form.downloads.manuals,
      ...form.downloads.brochures,
      ...form.downloads.quickGuides,
      ...form.downloads.productPhotos,
    ] as DownloadFile[];
    if (
      driversAndSoftware.some((d) => !d.url?.trim()) ||
      otherDownloads.some((d) => !d.url?.trim())
    ) {
      setSaveError("All download entries require a URL.");
      setTab("downloads");
      return;
    }

    setSaving(true);
    setSaveError(null);

    const payload = {
      model: form.model.trim(),
      category: form.category,
      series: form.series.trim(),
      url: form.url.trim(),
      imageUrl: form.imageUrl.trim() || null,
      description: form.description.trim() || null,
      inStock: form.inStock,
      onWebsite: form.onWebsite,
      features: form.features,
      specs: Object.fromEntries(
        form.specs.map((r) => [
          r.section ? `${r.section} / ${r.name}` : r.name,
          r.value,
        ]),
      ),
      downloads: form.downloads,
    };

    const endpoint =
      mode === "edit"
        ? apiUrl(`/api/admin/products/${product!.id}`)
        : apiUrl("/api/admin/products");

    try {
      const res = await fetch(endpoint, {
        method: mode === "edit" ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = (await res.json().catch(() => ({}))) as { error?: string };
        setSaveError(err.error ?? "Save failed. Please try again.");
        return;
      }
      const saved: AdminProduct = await res.json();
      onSaved(saved);
      onClose();
    } catch {
      setSaveError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const TABS: { key: Tab; label: string }[] = [
    { key: "basic", label: "Basic Info" },
    { key: "features", label: "Features", },
    { key: "specs", label: "Specs", },
    { key: "downloads", label: "Downloads" },
  ];

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[55] bg-black/30 transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`fixed left-0 top-0 z-[60] flex h-full w-[520px] max-w-[95vw] flex-col bg-white shadow-xl transition-transform duration-[250ms] ease-out isolate ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {mode === "edit"
              ? `Edit — ${product?.model ?? "Product"}`
              : "Add Product"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 hover:text-gray-600 transition"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Tab bar */}
        <div className="flex shrink-0 border-b border-gray-200">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`px-5 py-3 text-sm font-medium transition border-b-2 whitespace-nowrap ${
                tab === t.key
                  ? "border-[var(--accent)] text-[var(--accent)]"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {tab === "basic" && (
            <div className="space-y-4">
              <FieldRow label="Model *">
                <input
                  value={form.model}
                  onChange={(e) => set("model", e.target.value)}
                  placeholder="e.g. AD-1650W"
                  className={inputCls}
                />
              </FieldRow>

              <FieldRow label="Category *">
                <select
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                  className={inputCls}
                >
                  <option value="" disabled>
                    Select category…
                  </option>
                  {categoryOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </FieldRow>

              <FieldRow label="Series">
                <input
                  list="series-datalist"
                  value={form.series}
                  onChange={(e) => set("series", e.target.value)}
                  placeholder="e.g. Carry-One Series"
                  className={inputCls}
                />
                <datalist id="series-datalist">
                  {seriesOptions.map((s) => (
                    <option key={s} value={s} />
                  ))}
                </datalist>
              </FieldRow>

              <FieldRow label="URL *">
                <input
                  type="url"
                  value={form.url}
                  onChange={(e) => set("url", e.target.value)}
                  placeholder="https://www.avision.com/…"
                  className={inputCls}
                />
              </FieldRow>

              <FieldRow label="Image URL">
                <input
                  type="url"
                  value={form.imageUrl}
                  onChange={(e) => set("imageUrl", e.target.value)}
                  placeholder="https://…"
                  className={inputCls}
                />
                {form.imageUrl && (
                  <img
                    src={form.imageUrl}
                    alt="preview"
                    className="mt-2 h-24 w-24 rounded-lg border border-gray-200 bg-gray-50 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}
              </FieldRow>

              <FieldRow label="Description">
                <textarea
                  rows={7}
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  placeholder="Short product description…"
                  className={inputCls + " resize-none"}
                />
              </FieldRow>

              <div className="flex gap-8 pt-1">
                <div className="flex items-center gap-3">
                  <Toggle
                    value={form.inStock}
                    onChange={(v) => set("inStock", v)}
                  />
                  <span className="text-sm text-gray-700">In Stock</span>
                </div>
                <div className="flex items-center gap-3">
                  <Toggle
                    value={form.onWebsite}
                    onChange={(v) => set("onWebsite", v)}
                  />
                  <span className="text-sm text-gray-700">
                    Visible on website
                  </span>
                </div>
              </div>
            </div>
          )}

          {tab === "features" && (
            <FeaturesTab
              features={form.features}
              onChange={(v) => set("features", v)}
              loading={jsonbLoading}
            />
          )}
          {tab === "specs" && (
            <SpecsTab
              specs={form.specs}
              onChange={(v) => set("specs", v)}
              loading={jsonbLoading}
            />
          )}
          {tab === "downloads" && (
            <DownloadsTab
              downloads={form.downloads}
              onChange={(v) => set("downloads", v)}
              loading={jsonbLoading}
            />
          )}
        </div>

        {/* Footer */}
        <div className="flex shrink-0 items-center justify-between border-t border-gray-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-gray-500 hover:text-gray-700 transition"
          >
            Cancel
          </button>
          {saveError && (
            <p className="mx-4 flex-1 text-center text-sm text-red-500">
              {saveError}
            </p>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving
              ? "Saving…"
              : mode === "edit"
                ? "Save changes"
                : "Create product"}
          </button>
        </div>
      </div>
    </>,
    document.body,
  );
}
