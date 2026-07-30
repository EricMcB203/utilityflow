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
        background: "#ffffff",
        borderRadius: "18px",
        padding: "24px",
        border: "1px solid #e5e7eb",
      }}
    >
      <h2>
        Laundry Operations Alerts
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, 1fr)",
          gap: "16px",
        }}
      >
        <AlertCard
          icon="🔴"
          title="Critical Plants"
          value={criticalPlants.length}
          color="#ef4444"
        />

        <AlertCard
          icon="⚫"
          title="Stop Routing"
          value={stoppedPlants.length}
          color="#111827"
        />

        <AlertCard
          icon="📦"
          title="Active Carts"
          value={activeCarts.length}
          color="#2563eb"
        />

        <AlertCard
          icon="🚚"
          title="Ready Deliveries"
          value={readyDeliveries.length}
          color="#8b5cf6"
        />
      </div>

      <div
        style={{
          marginTop: "24px",
          borderRadius: "12px",
          background: "#f8fafc",
          padding: "16px",
        }}
      >
        <p>
          <strong>
            Active Production Queue:
          </strong>{" "}
          {activeQueueItems.length}
        </p>

        <p>
          <strong>
            Routing Status:
          </strong>{" "}
          {stoppedPlants.length > 0
            ? "One or more plants are blocked from routing."
            : criticalPlants.length > 0
            ? "One or more plants are approaching capacity."
            : "Routing network operating normally."}
        </p>
      </div>
    </div>
  );
}

function AlertCard({
  icon,
  title,
  value,
  color,
}: {
  icon: string;
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "20px",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.06)",
        borderTop:
          `5px solid ${color}`,
      }}
    >
      <div
        style={{
          fontSize: "30px",
          marginBottom: "12px",
        }}
      >
        {icon}
      </div>

      <div
        style={{
          color: "#6b7280",
          fontSize: "14px",
          fontWeight: 600,
          marginBottom: "10px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          color,
          fontSize: "36px",
          fontWeight: 800,
        }}
      >
        {value}
      </div>
    </div>
  );
}
``