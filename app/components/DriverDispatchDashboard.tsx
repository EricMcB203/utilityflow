type DriverDispatchDashboardProps = {
  deliveries: any[];
};

export default function DriverDispatchDashboard({
  deliveries,
}: DriverDispatchDashboardProps) {
  const completed =
    deliveries.filter(
      (delivery) =>
        delivery.delivery_status ===
        "Delivered"
    ).length;

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
        Driver Dispatch Dashboard
      </h2>

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <strong>
          Deliveries Assigned:
        </strong>{" "}
        {deliveries.length}

        <br />

        <strong>
          Deliveries Completed:
        </strong>{" "}
        {completed}
      </div>

      <table
        style={{
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>Driver</th>
            <th>Route</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {deliveries.map(
            (delivery) => (
              <tr
                key={delivery.id}
              >
                <td>
                  {
                    delivery.assigned_driver
                  }
                </td>

                <td>
                  {delivery.route_name}
                </td>

                <td>
                  {
                    delivery.delivery_status
                  }
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}