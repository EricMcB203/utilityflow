type StatusBadgeProps = {
  status: string;
};

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const normalized =
    status.toUpperCase();

  const styles: Record<
    string,
    {
      background: string;
      color: string;
      icon: string;
    }
  > = {
    NORMAL: {
      background: "#dcfce7",
      color: "#166534",
      icon: "🟢",
    },

    WARNING: {
      background: "#fef3c7",
      color: "#92400e",
      icon: "🟡",
    },

    CRITICAL: {
      background: "#fee2e2",
      color: "#991b1b",
      icon: "🔴",
    },

    "STOP ROUTING": {
      background: "#e5e7eb",
      color: "#111827",
      icon: "⚫",
    },

    QUEUED: {
      background: "#dbeafe",
      color: "#1d4ed8",
      icon: "🔵",
    },

    DELIVERED: {
      background: "#dcfce7",
      color: "#166534",
      icon: "✅",
    },

    "READY FOR DELIVERY": {
      background: "#ede9fe",
      color: "#6d28d9",
      icon: "🟣",
    },
  };

  const badge =
    styles[normalized] ??
    {
      background: "#f3f4f6",
      color: "#374151",
      icon: "📌",
    };

  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        background:
          badge.background,
        color: badge.color,
        fontWeight: 700,
        fontSize: "12px",
        padding: "6px 12px",
        borderRadius: "999px",
      }}
    >
      <span>
        {badge.icon}
      </span>

      <span>
        {normalized}
      </span>
    </span>
  );
}
