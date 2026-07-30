"use client";

export default function LaundrySectionNav() {
  const sections = [
    {
      label: "Overview",
      id: "overview",
    },
    {
      label: "Carts",
      id: "carts",
    },
    {
      label: "Custody",
      id: "custody",
    },
    {
      label: "Production",
      id: "production",
    },
    {
      label: "Delivery",
      id: "delivery",
    },
    {
      label: "Routing",
      id: "routing",
    },
    {
      label: "Forecasting",
      id: "forecasting",
    },
    {
      label: "Plant Status",
      id: "plant-status",
    },
  ];

  function scrollToSection(
    id: string
  ) {
    const element =
      document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  }

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "16px",
        marginBottom: "24px",
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() =>
            scrollToSection(section.id)
          }
          style={{
            border: "none",
            background:
              "#2563eb",
            color: "#ffffff",
            borderRadius: "999px",
            padding:
              "10px 16px",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          {section.label}
        </button>
      ))}
    </div>
  );
}