type PlantRoutingDashboardProps = {
  plants: any[];
};

export default function PlantRoutingDashboard({
  plants,
}: PlantRoutingDashboardProps) {
  function getStatus(
    utilization: number
  ) {
    if (utilization >= 100) {
      return "Stop Routing";
    }

    if (utilization >= 95) {
      return "Critical";
    }

    if (utilization >= 80) {
      return "Warning";
    }

    return "Normal";
  }

  const recommendedPlant =
    plants
      .filter((plant) => {
        const utilization =
          (plant.current_load /
            plant.max_capacity) *
          100;

        return utilization < 100;
      })
      .reduce(
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
        },
        plants[0]
      );

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
        Plant Routing Dashboard
      </h2>

      <div
        style={{
          background: "#dcfce7",
          padding: "12px",
          borderRadius: "8px",
          marginBottom: "20px",
        }}
      >
        <strong>
          Recommended Plant:
        </strong>{" "}
        {recommendedPlant?.plant_name}
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
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {plants.map((plant) => {
            const utilization =
              Math.round(
                (plant.current_load /
                  plant.max_capacity) *
                  100
              );

            return (
              <tr key={plant.id}>
                <td>
                  {
                    plant.plant_name
                  }
                </td>

                <td>
                  {
                    plant.current_load
                  }
                </td>

                <td>
                  {
                    plant.max_capacity
                  }
                </td>

                <td>
                  {getStatus(
                    utilization
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
