import StatusBadge from "./StatusBadge";

type PlantBalancingEngineProps = {
  plants: any[];
};

export default function PlantBalancingEngine({
  plants,
}: PlantBalancingEngineProps) {
  const totalLoad = plants.reduce(
    (sum, plant) =>
      sum + Number(plant.current_load),
    0
  );

  const totalCapacity = plants.reduce(
    (sum, plant) =>
      sum + Number(plant.max_capacity),
    0
  );

  const networkUtilization =
    totalCapacity > 0
      ? Math.round(
          (totalLoad / totalCapacity) * 100
        )
      : 0;

  const mostLoadedPlant =
    plants.length > 0
      ? plants.reduce(
          (highest, current) => {
            const currentPct =
              current.current_load /
              current.max_capacity;

            const highestPct =
              highest.current_load /
              highest.max_capacity;

            return currentPct > highestPct
              ? current
              : highest;
          }
        )
      : null;

  const leastLoadedPlant =
    plants.length > 0
      ? plants.reduce(
          (lowest, current) => {
            const currentPct =
              current.current_load /
              current.max_capacity;

            const lowestPct =
              lowest.current_load /
              lowest.max_capacity;

            return currentPct < lowestPct
              ? current
              : lowest;
          }
        )
      : null;

  function getNetworkStatus() {
    if (networkUtilization >= 95) {
      return {
        label: "CRITICAL",
        color: "#ef4444",
        message:
          "Network is near total capacity. Additional routing should be restricted.",
      };
    }

    if (networkUtilization >= 80) {
      return {
        label: "WARNING",
        color: "#f59e0b",
        message:
          "Network is under heavy load. Route new work carefully.",
      };
    }

    return {
      label: "NORMAL",
      color: "#10b981",
      message:
        "Network has available processing capacity.",
    };
  }

  const status =
    getNetworkStatus();

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "18px",
        padding: "24px",
        border: "1px solid #e5e7eb",
      }}
    >
      <h2>
        Plant Balancing Engine
      </h2>

      <div
        style={{
          background: "#f8fafc",
          borderRadius: "14px",
          padding: "20px",
          marginBottom: "24px",
          borderLeft:
            `6px solid ${status.color}`,
        }}
      >
        <div
          style={{
            marginBottom: "12px",
          }}
        >
          <StatusBadge
            status={
              status.label
            }
          />
        </div>

        <p>
          {status.message}
        </p>

        <div
          style={{
            fontSize: "42px",
            fontWeight: 800,
            color: "#2563eb",
            marginTop: "10px",
          }}
        >
          {networkUtilization}%
        </div>

        <div
          style={{
            color: "#6b7280",
            fontWeight: 600,
          }}
        >
          Network Utilization
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, 1fr)",
          gap: "16px",
        }}
      >
        <MetricCard
          icon="🏭"
          title="Most Loaded Plant"
          value={
            mostLoadedPlant
              ?.plant_name ??
            "N/A"
          }
        />

        <MetricCard
          icon="✅"
          title="Best Routing Target"
          value={
            leastLoadedPlant
              ?.plant_name ??
            "N/A"
          }
        />

        <MetricCard
          icon="📊"
          title="Network Capacity"
          value={`${totalCapacity}`}
        />
      </div>
    </div>
  );
}

function MetricCard({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: string;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "18px",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.06)",
        border: "1px solid #e5e7eb",
      }}
    >
      <div
        style={{
          fontSize: "28px",
          marginBottom: "10px",
        }}
      >
        {icon}
      </div>

      <div
        style={{
          color: "#6b7280",
          fontSize: "13px",
          marginBottom: "6px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "24px",
          fontWeight: 700,
        }}
      >
        {value}
      </div>
    </div>
  );
}