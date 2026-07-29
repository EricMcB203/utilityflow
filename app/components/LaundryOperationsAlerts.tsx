type LaundryOperationsAlertsProps = {
  carts: any[];
  plants: any[];
  deliveries: any[];
  queueItems: any[];
};

export default function LaundryOperationsAlerts({
  carts,
  plants,
  deliveries,
  queueItems,
}: LaundryOperationsAlertsProps) {
  const criticalPlants =
    plants.filter((plant) => {
      const utilization =
        (plant.current_load /
          plant.max_capacity) *
        100;

      return utilization >= 95;
    });

  const stoppedPlants =
    plants.filter((plant) => {
      const utilization =
        (plant.current_load /
          plant.max_capacity) *
        100;

      return utilization >= 100;
    });

  const activeCarts =
    carts.filter(
      (cart) =>
        cart.status !== "Complete"
    );

  const readyDeliveries =
    deliveries.filter(
      (delivery) =>
        delivery.delivery_status ===
        "Ready For Delivery"
    );

  const activeQueueItems =
    queueItems.filter(
      (item) =>
        item.queue_stage !==
        "Ready For Delivery"
    );

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        border: "1px solid #ddd",
        marginTop: "20px",
        marginBottom: "20px",
      }}
    >
      <h2>Laundry Operations Alerts</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, 1fr)",
          gap: "15px",
        }}
      >
        <AlertCard
          title="Critical Plants"
          value={criticalPlants.length}
          color={
            criticalPlants.length > 0
              ? "#ef4444"
              : "#10b981"
          }
        />

        <AlertCard
          title="Stop Routing"
          value={stoppedPlants.length}
          color={
            stoppedPlants.length > 0
              ? "#7f1d1d"
              : "#10b981"
          }
        />

        <AlertCard
          title="Active Carts"
          value={activeCarts.length}
          color="#2563eb"
        />

        <AlertCard
          title="Ready Deliveries"
          value={readyDeliveries.length}
          color="#f59e0b"
        />
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          background: "#f9fafb",
          borderRadius: "8px",
        }}
      >
        <strong>
          Production Queue Active:
        </strong>{" "}
        {activeQueueItems.length}

        <br />

        <strong>
          Routing Status:
        </strong>{" "}
        {stoppedPlants.length > 0
          ? "One or more plants are blocked from routing."
          : criticalPlants.length > 0
          ? "One or more plants are near capacity."
          : "Routing network is currently healthy."}
      </div>
    </div>
  );
}

function AlertCard({
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
        borderLeft:
          `8px solid ${color}`,
        background: "#f9f9f9",
        padding: "15px",
        borderRadius: "8px",
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
          fontSize: "28px",
          fontWeight: "bold",
          color,
        }}
      >
        {value}
      </div>
    </div>
  );
}
``