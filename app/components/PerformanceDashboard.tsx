type PerformanceDashboardProps = {
  carts: any[];
  deliveries: any[];
  plants: any[];
  queueItems: any[];
};

export default function PerformanceDashboard({
  carts,
  deliveries,
  plants,
  queueItems,
}: PerformanceDashboardProps) {
  const throughput =
    carts.length;

  const activeDeliveries =
    deliveries.filter(
      (delivery) =>
        delivery.delivery_status !==
        "Delivered"
    ).length;

  const averageUtilization =
    plants.length > 0
      ? Math.round(
          plants.reduce(
            (sum, plant) =>
              sum +
              (plant.current_load /
                plant.max_capacity) *
                100,
            0
          ) / plants.length
        )
      : 0;

  const efficiency =
    throughput > 0
      ? Math.round(
          ((throughput -
            queueItems.length) /
            throughput) *
            100
        )
      : 100;

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "18px",
        padding: "24px",
        border: "1px solid #e5e7eb",
        marginBottom: "24px",
      }}
    >
      <h2>
        Performance Dashboard
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, 1fr)",
          gap: "16px",
        }}
      >
        <MetricCard
          icon="📦"
          label="Throughput"
          value={throughput}
          color="#2563eb"
        />

        <MetricCard
          icon="🚚"
          label="Active Deliveries"
          value={activeDeliveries}
          color="#8b5cf6"
        />

        <MetricCard
          icon="🏭"
          label="Avg Utilization"
          value={`${averageUtilization}%`}
          color="#10b981"
        />

        <MetricCard
          icon="⚙️"
          label="Efficiency"
          value={`${efficiency}%`}
          color="#f59e0b"
        />
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: string | number;
  color: string;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "20px",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.06)",
        borderTop:
          `5px solid ${color}`,
      }}
    >
      <div
        style={{
          fontSize: "30px",
          marginBottom: "10px",
        }}
      >
        {icon}
      </div>

      <div
        style={{
          color: "#6b7280",
          fontSize: "13px",
          marginBottom: "8px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: "36px",
          fontWeight: 800,
          color,
        }}
      >
        {value}
      </div>
    </div>
  );
}