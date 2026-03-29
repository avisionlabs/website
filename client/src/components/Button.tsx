type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: "solid" | "outline";
  style?: React.CSSProperties;
};

export default function Button({ href, onClick, children, className = "", variant = "solid", style: styleProp }: ButtonProps) {
  const isOutline = variant === "outline";

  const style: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px 16px",
    background: isOutline ? "transparent" : "var(--accent)",
    color: isOutline ? "var(--secondary)" : "#fff",
    fontFamily: "'Poppins', system-ui, sans-serif",
    fontWeight: 600,
    fontSize: "18px",
    borderRadius: "8px",
    textDecoration: "none",
    border: isOutline ? "2px solid var(--secondary)" : "none",
    cursor: "pointer",
    boxShadow: isOutline ? "none" : "0 0 10px 0 rgba(15, 49, 146, 0.5)",
    transition: "background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.15s",
    flexShrink: 0,
    ...styleProp,
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    if (isOutline) {
      (e.currentTarget as HTMLElement).style.background = "rgba(31, 154, 83, 0.1)";
    } else {
      (e.currentTarget as HTMLElement).style.background = "var(--primary)";
    }
    (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    (e.currentTarget as HTMLElement).style.background = isOutline ? "transparent" : "var(--accent)";
    (e.currentTarget as HTMLElement).style.transform = "none";
  };

  if (href) {
    return (
      <a
        href={href}
        className={className}
        style={style}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={className}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
}
