type RouteOptimizationDashboardProps = {
  deliveries: any[];
};

export default function RouteOptimizationDashboard({
  deliveries,
}: RouteOptimizationDashboardProps) {
  const totalStops =
    deliveries.length;

  const delivered =
    deliveries.filter(
      (delivery) =>
        delivery.delivery_status ===
        "Delivered"
    ).length;

  const remaining =
    totalStops - delivered;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        border: "1px solid #ddd",
        marginTop: "20px",
      }}
    >
      <h2>
        Route Optimization Dashboard
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        <MetricCard
          title="Total Stops"
          value={String(
            totalStops
          )}
          color="#2563eb"
        />

        <MetricCard
          title="Delivered"
          value={String(
            delivered
          )}
          color="#10b981"
        />

        <MetricCard
          title="Remaining"
          value={String(
            remaining
          )}
          color="#f59e0b"
        />
      </div>
    </div>
  );
}

function MetricCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div
      style={{
        borderLeft:
          `6px solid ${color}`,
        background: "#f9f9f9",
        padding: "15px",
        borderRadius: "8px",
      }}
    >
      <div>{title}</div>

      <h2>{value}</h2>
    </div>
  );
}