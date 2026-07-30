import StatusBadge from "./StatusBadge";

type PlantHealthScoreProps = {
  plants: any[];
};

export default function PlantHealthScore({
  plants,
}: PlantHealthScoreProps) {
  function calculateScore(
    plant: any
  ) {
    const utilization =
      (plant.current_load /
        plant.max_capacity) *
      100;

    return Math.max(
      0,
      Math.round(100 - utilization)
    );
  }

  function getStatus(
    score: number
  ) {
    if (score < 10) {
      return "CRITICAL";
    }

    if (score < 25) {
      return "WARNING";
    }

    return "NORMAL";
  }

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
        Plant Health Scores
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        {plants.map((plant) => {
          const score =
            calculateScore(plant);

          return (
            <div
              key={plant.id}
              style={{
                background:
                  "#ffffff",
                borderRadius:
                  "16px",
                padding:
                  "18px",
                border:
                  "1px solid #e5e7eb",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.06)",
              }}
            >
              <div
                style={{
                  marginBottom:
                    "12px",
                  fontWeight:
                    700,
                }}
              >
                {plant.plant_name}
              </div>

              <div
                style={{
                  fontSize:
                    "42px",
                  fontWeight:
                    800,
                  color:
                    "#2563eb",
                  marginBottom:
                    "10px",
                }}
              >
                {score}
              </div>

              <div
                style={{
                  marginBottom:
                    "10px",
                }}
              >
                <StatusBadge
                  status={getStatus(
                    score
                  )}
                />
              </div>

              <div
                style={{
                  color:
                    "#6b7280",
                  fontSize:
                    "13px",
                }}
              >
                Health Score
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
``