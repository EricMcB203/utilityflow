import type { ReactNode } from "react";

type LaundrySectionCardProps = {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export default function LaundrySectionCard({
  title,
  children,
  defaultOpen = true,
}: LaundrySectionCardProps) {
  return (
    <details
      open={defaultOpen}
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        border: "1px solid #e5e7eb",
        marginTop: "24px",
        overflow: "hidden",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.06)",
      }}
    >
      <summary
        style={{
          cursor: "pointer",
          padding: "18px 24px",
          fontWeight: 700,
          fontSize: "20px",
          background:
            "linear-gradient(to right, #f8fafc, #eef2ff)",
          borderBottom:
            "1px solid #e5e7eb",
          listStyle: "none",
        }}
      >
        {title}
      </summary>

      <div
        style={{
          padding: "24px",
        }}
      >
        {children}
      </div>
    </details>
  );
}