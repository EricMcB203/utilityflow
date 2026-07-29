export default function LaundrySectionNav() {
  const sections = [
    {
      label: "Overview",
      href: "#overview",
    },
    {
      label: "Carts",
      href: "#carts",
    },
    {
      label: "Custody",
      href: "#custody",
    },
    {
      label: "Production",
      href: "#production",
    },
    {
      label: "Delivery",
      href: "#delivery",
    },
    {
      label: "Routing",
      href: "#routing",
    },
    {
      label: "Forecasting",
      href: "#forecasting",
    },
    {
      label: "Plant Status",
      href: "#plant-status",
    },
  ];

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: "#ffffff",
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "12px",
        marginBottom: "20px",
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
      }}
    >
      {sections.map((section) => (
        <a
          key={section.href}
          href={section.href}
          style={{
            textDecoration: "none",
            color: "#333",
            fontWeight: "500",
            padding: "8px 12px",
            borderRadius: "6px",
            backgroundColor: "#f5f5f5",
            border: "1px solid #ddd",
          }}
        >
          {section.label}
        </a>
      ))}
    </div>
  );
}
