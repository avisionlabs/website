export default function Footer() {
  return (
    <footer style={{ background: "var(--primary)" }}>
      <div
        className="px-6 lg:px-0"
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "14px", margin: 0 }}>
          © 2026 Avision Labs. All rights reserved.
        </p>
        <img src="/logo.svg" alt="Avision Labs" style={{ height: "28px", width: "auto", filter: "brightness(0) invert(1)" }} />
      </div>
    </footer>
  );
}
