type PlantUtilizationHeatMapProps = {
  plants: any[];
};

export default function PlantUtilizationHeatMap({
  plants,
}: PlantUtilizationHeatMapProps) {
  function getColor(
    utilization: number
  ) {
    if (utilization >= 80) {
      return "#ef4444";
    }

    if (utilization >= 50) {
      return "#f59e0b";
    }

    return "#10b981";
  }

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
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent:
                  "space-between",
                marginBottom: "5px",
              }}
            >
              <span>
                {plant.plant_name}
              </span>

              <span>
                {utilization}%
              </span>
            </div>

            <div
              style={{
                width: "100%",
                height: "16px",
                background:
                  "#e5e7eb",
                borderRadius: "8px",
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
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}