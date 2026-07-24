type OperationsDashboardProps = {
  assets: any[];
  workOrders: any[];
  inspections: any[];
};

export default function OperationsDashboard({
  assets,
  workOrders,
  inspections,
}: OperationsDashboardProps) {
  const openCount =
    workOrders.filter(
      (wo) => wo.status === "Open"
    ).length;

  const inProgressCount =
    workOrders.filter(
      (wo) =>
        wo.status === "In Progress"
    ).length;

  const completedCount =
    workOrders.filter(
      (wo) =>
        wo.status === "Completed"
    ).length;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(5, 1fr)",
        gap: "15px",
        marginBottom: "20px",
      }}
    >
      <DashboardCard
        title="Assets"
        value={assets.length}
        color="#2563eb"
      />

      <DashboardCard
        title="Open"
        value={openCount}
        color="#f59e0b"
      />

      <DashboardCard
        title="In Progress"
        value={inProgressCount}
        color="#3b82f6"
      />

      <DashboardCard
        title="Completed"
        value={completedCount}
        color="#10b981"
      />

      <DashboardCard
        title="Inspections"
        value={inspections.length}
        color="#8b5cf6"
      />
    </div>
  );
}

function DashboardCard({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        padding: "20px",
        borderLeft: `8px solid ${color}`,
        boxShadow:
          "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          fontSize: "14px",
          color: "#666",
          marginBottom: "8px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "32px",
          fontWeight: "bold",
          color,
        }}
      >
        {value}
      </div>
    </div>
  );
}