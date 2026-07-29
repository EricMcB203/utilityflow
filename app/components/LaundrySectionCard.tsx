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
        background: "#fff",
        borderRadius: "12px",
        border: "1px solid #ddd",
        marginTop: "20px",
        padding: "0",
        overflow: "hidden",
      }}
    >
      <summary
        style={{
          cursor: "pointer",
          padding: "16px 20px",
          fontWeight: "bold",
          fontSize: "18px",
          background: "#f9fafb",
          borderBottom: "1px solid #ddd",
        }}
      >
        {title}
      </summary>

      <div
        style={{
          padding: "20px",
        }}
      >
        {children}
      </div>
    </details>
  );
}