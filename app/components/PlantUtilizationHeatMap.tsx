import StatusBadge from "./StatusBadge";

type PlantUtilizationHeatMapProps = {
  plants: any[];
};

export default function PlantUtilizationHeatMap({
  plants,
}: PlantUtilizationHeatMapProps) {
  function getColor(
    utilization: number
  ) {
    if (utilization >= 100) {
      return "#7f1d1d";
    }

    if (utilization >= 95) {
      return "#ef4444";
    }

    if (utilization >= 80) {
      return "#f59e0b";
    }

    return "#10b981";
  }

  function getStatus(
    utilization: number
  ) {
    if (utilization >= 100) {
      return "STOP ROUTING";
    }

    if (utilization >= 95) {
      return "CRITICAL";
    }

    if (utilization >= 80) {
      return "WARNING";
    }

    return "NORMAL";
  }

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        border: "1px solid #e5e7eb",
      }}
    >
      <h2>
        Plant Utilization Heat Map
      </h2>

      {plants.map((plant) => {
        const utilization =
          Math.round(
            (plant.current_load /
              plant.max_capacity) *
              100
          );

        return (
          <div
            key={plant.id}
            style={{
              marginBottom: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div>
                <strong>
                  {plant.plant_name}
                </strong>
              </div>

              <StatusBadge
                status={getStatus(
                  utilization
                )}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                marginBottom: "8px",
              }}
            >
              <span>
                Utilization
              </span>

              <strong>
                {utilization}%
              </strong>
            </div>

            <div
              style={{
                width: "100%",
                height: "18px",
                background:
                  "#e5e7eb",
                borderRadius: "999px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width:
                    `${utilization}%`,
                  height: "100%",
                  background:
                    getColor(
                      utilization
                    ),
                  transition:
                    "width 0.3s ease",
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}