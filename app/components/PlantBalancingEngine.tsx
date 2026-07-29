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
        label: "Critical",
        color: "#ef4444",
        message:
          "Network is near total capacity. Additional routing should be restricted.",
      };
    }

    if (networkUtilization >= 80) {
      return {
        label: "Warning",
        color: "#f59e0b",
        message:
          "Network is under heavy load. Route new work carefully.",
      };
    }

    return {
      label: "Balanced",
      color: "#10b981",
      message:
        "Network has available processing capacity.",
    };
  }

  const status = getNetworkStatus();

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
      <h2>Plant Balancing Engine</h2>

      <div
        style={{
          background: "#f9fafb",
          borderRadius: "10px",
          padding: "15px",
          marginBottom: "20px",
          borderLeft: `8px solid ${status.color}`,
        }}
      >
        <h3
          style={{
            color: status.color,
            marginTop: 0,
          }}
        >
          Network Status: {status.label}
        </h3>

        <p>{status.message}</p>

        <p>
          <strong>
            Network Utilization:
          </strong>{" "}
          {networkUtilization}%
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2, 1fr)",
          gap: "20px",
        }}
      >
        <div
          style={{
            background: "#f5f5f5",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h3>Most Loaded Plant</h3>

          <p>
            {mostLoadedPlant
              ? mostLoadedPlant.plant_name
              : "No plant data"}
          </p>
        </div>

        <div
          style={{
            background: "#f5f5f5",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h3>Best Routing Target</h3>

          <p>
            {leastLoadedPlant
              ? leastLoadedPlant.plant_name
              : "No plant data"}
          </p>
        </div>
      </div>
    </div>
  );
}