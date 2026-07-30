import StatusBadge from "./StatusBadge";

type PlantRoutingDashboardProps = {
  plants: any[];
};

export default function PlantRoutingDashboard({
  plants,
}: PlantRoutingDashboardProps) {
  function getUtilization(
    plant: any
  ) {
    return Math.round(
      (plant.current_load /
        plant.max_capacity) *
        100
    );
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

  const availablePlants =
    plants.filter((plant) => {
      const utilization =
        plant.current_load /
        plant.max_capacity;

      return utilization < 0.95;
    });

  const recommendedPlant =
    availablePlants.length > 0
      ? availablePlants.reduce(
          (lowest, current) => {
            const currentPct =
              current.current_load /
              current.max_capacity;

            const lowestPct =
              lowest.current_load /
              lowest.max_capacity;

            return currentPct <
              lowestPct
              ? current
              : lowest;
          }
        )
      : null;

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "24px",
        border: "1px solid #e5e7eb",
      }}
    >
      <h2>
        Plant Routing Dashboard
      </h2>

      <div
        style={{
          background:
            recommendedPlant
              ? "#dcfce7"
              : "#fee2e2",
          padding: "16px",
          borderRadius: "12px",
          marginBottom: "24px",
        }}
      >
        <strong>
          Recommended Plant:
        </strong>{" "}
        {recommendedPlant
          ? recommendedPlant.plant_name
          : "No available plant below critical capacity"}
      </div>

      <table
        style={{
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>Plant</th>
            <th>Load</th>
            <th>Capacity</th>
            <th>Utilization</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {plants.map((plant) => {
            const utilization =
              getUtilization(plant);

            return (
              <tr key={plant.id}>
                <td>
                  {plant.plant_name}
                </td>

                <td>
                  {plant.current_load}
                </td>

                <td>
                  {plant.max_capacity}
                </td>

                <td>
                  {utilization}%
                </td>

                <td>
                  <StatusBadge
                    status={getStatus(
                      utilization
                    )}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}