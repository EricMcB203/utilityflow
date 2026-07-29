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

  function scrollToSection(id: string) {
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
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
        <button
          key={section.id}
          onClick={() => scrollToSection(section.id)}
          style={{
            border: "1px solid #ddd",
            backgroundColor: "#f9fafb",
            borderRadius: "8px",
            padding: "8px 12px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {section.label}
        </button>
      ))}
    </div>
  );
}
