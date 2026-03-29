import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import Button from "./Button";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const logoUrl = "/logo.svg";

// ─── Sub-components ───────────────────────────────────────────────────────────

function NavLink({
  children,
  href = "#",
}: {
  children: React.ReactNode;
  href?: string;
}) {
  const { pathname } = useLocation();
  const active = pathname === href;

  return (
    <a
      href={href}
      style={{
        fontSize: "18px",
        fontWeight: active ? 600 : 400,
        color: active ? "var(--text)" : "var(--text-2)",
        textDecoration: "none",
        whiteSpace: "nowrap",
        transition: "color 0.2s",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = "var(--text)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLAnchorElement).style.color = active
          ? "var(--text)"
          : "var(--text-2)")
      }
    >
      {children}
    </a>
  );
}

function DropdownNavItem({
  label,
  items,
}: {
  label: string;
  items: { name: string; href: string }[];
}) {
  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <PopoverButton
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
              background: "none",
              border: "none",
              outline: "none",
              cursor: "pointer",
              padding: 0,
              fontSize: "18px",
              fontWeight: 400,
              color: open ? "var(--text)" : "var(--text-2)",
              transition: "color 0.2s",
            }}
          >
            {label}
            <ChevronDownIcon
              style={{
                width: "16px",
                height: "16px",
                opacity: 0.6,
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s ease",
              }}
            />
          </PopoverButton>

          <PopoverPanel
            anchor="bottom"
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "12px",
              boxShadow: "var(--shadow)",
              minWidth: "160px",
              padding: "8px 0",
              marginTop: "12px",
              zIndex: 100,
            }}
          >
            {items.map((item) => (
              <a
                key={item.name}
                href={item.href}
                style={{
                  display: "block",
                  padding: "10px 20px",
                  fontSize: "15px",
                  color: "var(--text-2)",
                  textDecoration: "none",
                  transition: "background 0.15s, color 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "var(--border)";
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--primary)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-2)";
                }}
              >
                {item.name}
              </a>
            ))}
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}

// ─── Mobile menu ──────────────────────────────────────────────────────────────

function HamburgerIcon({ open }: { open: boolean }) {
  const barStyle: React.CSSProperties = {
    display: "block",
    width: "22px",
    height: "2px",
    background: "var(--text)",
    borderRadius: "2px",
    transition: "transform 0.25s, opacity 0.25s",
    transformOrigin: "center",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
      <span
        style={{
          ...barStyle,
          transform: open ? "translateY(7px) rotate(45deg)" : "none",
        }}
      />
      <span style={{ ...barStyle, opacity: open ? 0 : 1 }} />
      <span
        style={{
          ...barStyle,
          transform: open ? "translateY(-7px) rotate(-45deg)" : "none",
        }}
      />
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

const mobileNavItems = [
  { label: "Home", href: "/" },
  {
    label: "Company",
    items: [
      { name: "About Us", href: "/company" },
      { name: "Team", href: "/team" },
      { name: "Sustainability", href: "/sustainability" },
    ],
  },
  {
    label: "Products",
    items: [
      { name: "Printers & MFPs", href: "/printers" },
      { name: "Scanners", href: "/scanners" },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        width: "100%",
        background: scrolled ? "rgba(251, 251, 255, 0.6)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        transition: "background 0.3s ease, backdrop-filter 0.3s ease",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <nav
        className="px-6 lg:px-0"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
          maxWidth: "1280px",
          margin: "0 auto",
          boxSizing: "border-box",
        }}
      >
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0, border: "none", outline: "none" }}>
          <img
            src={logoUrl}
            alt="Avision Labs"
            style={{ height: "38px", width: "auto", display: "block", border: "none", outline: "none" }}
          />
        </a>

        {/* Desktop nav links */}
        <div
          className="desktop-nav"
          style={{ display: "flex", alignItems: "center", gap: "48px" }}
        >
          <NavLink href="/">Home</NavLink>
          <DropdownNavItem
            label="Company"
            items={[
              { name: "About Us", href: "/company" },
              { name: "Team", href: "/team" },
              { name: "Sustainability", href: "/sustainability" },
            ]}
          />
          <DropdownNavItem
            label="Products"
            items={[
              { name: "Printers & MFPs", href: "/printers" },
              { name: "Scanners", href: "/scanners" },
            ]}
          />
          <NavLink href="/contact">Contact</NavLink>
        </div>

        {/* CTA Button */}
        <Button href="/support" className="desktop-nav">
          Support
        </Button>

        {/* Hamburger (mobile) */}
        <button
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="mobile-menu-btn"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px",
            display: "none",
          }}
        >
          <HamburgerIcon open={mobileOpen} />
        </button>
      </nav>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          className="mobile-menu"
          style={{
            display: "none",
            flexDirection: "column",
            background: "var(--bg)",
            borderTop: "1px solid var(--border)",
            padding: "16px 24px 24px",
          }}
        >
          {mobileNavItems.map((item) =>
            'items' in item ? (
              <div key={item.label} style={{ borderBottom: "1px solid var(--border)" }}>
                <button
                  onClick={() => setExpandedSection(expandedSection === item.label ? null : item.label)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "14px 0",
                    background: "none",
                    border: "none",
                    fontSize: "17px",
                    color: "var(--text-2)",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  {item.label}
                  <ChevronDownIcon style={{ width: "16px", height: "16px", opacity: 0.6, transform: expandedSection === item.label ? "rotate(180deg)" : "none", transition: "transform 0.2s" }} />
                </button>
                {expandedSection === item.label && (
                  <div style={{ paddingBottom: "8px", paddingLeft: "12px" }}>
                    {item.items.map((sub) => (
                      <a
                        key={sub.name}
                        href={sub.href}
                        onClick={() => setMobileOpen(false)}
                        style={{ display: "block", padding: "8px 0", fontSize: "15px", color: "var(--text-2)", textDecoration: "none" }}
                      >
                        {sub.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "14px 0",
                  borderBottom: "1px solid var(--border)",
                  fontSize: "17px",
                  color: "var(--text-2)",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </a>
            )
          )}
          <Button href="/support" className="mt-5">
            Support
          </Button>
        </div>
      )}

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .mobile-menu { display: flex !important; }
        }
      `}</style>
    </header>
  );
}