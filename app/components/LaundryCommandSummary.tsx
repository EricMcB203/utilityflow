type LaundryCommandSummaryProps = {
  carts: any[];
  batches: any[];
  machineAssignments: any[];
  queueItems: any[];
  deliveries: any[];
  plants: any[];
};

export default function LaundryCommandSummary({
  carts,
  batches,
  machineAssignments,
  queueItems,
  deliveries,
  plants,
}: LaundryCommandSummaryProps) {
  const totalPlantLoad =
    plants.reduce(
      (sum, plant) =>
        sum +
        Number(
          plant.current_load
        ),
      0
    );

  const totalPlantCapacity =
    plants.reduce(
      (sum, plant) =>
        sum +
        Number(
          plant.max_capacity
        ),
      0
    );

  const networkUtilization =
    totalPlantCapacity > 0
      ? Math.round(
          (totalPlantLoad /
            totalPlantCapacity) *
            100
        )
      : 0;

  const criticalPlants =
    plants.filter((plant) => {
      const utilization =
        (plant.current_load /
          plant.max_capacity) *
        100;

      return utilization >= 95;
    });

  const readyDeliveries =
    deliveries.filter(
      (delivery) =>
        delivery.delivery_status ===
        "Ready For Delivery"
    );

  let recommendation =
    "Operations are stable. Continue normal routing and monitor production throughput.";

  let recommendationColor =
    "#166534";

  if (
    criticalPlants.length > 0
  ) {
    recommendation =
      "One or more plants are approaching critical capacity. Route work to lower-utilization facilities.";
    recommendationColor =
      "#991b1b";
  } else if (
    readyDeliveries.length > 0
  ) {
    recommendation =
      "Deliveries are ready for dispatch. Prioritize outbound logistics.";
    recommendationColor =
      "#6d28d9";
  } else if (
    queueItems.length > 5
  ) {
    recommendation =
      "Production queue volume is elevated. Review machine availability.";
    recommendationColor =
      "#92400e";
  }

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "18px",
        padding: "28px",
        border: "1px solid #e5e7eb",
        boxShadow:
          "0 8px 20px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
            }}
          >
            Operations Briefing
          </h2>

          <p
            style={{
              marginTop: "6px",
              color: "#6b7280",
            }}
          >
            UtilityFlow Laundry Network
          </p>
        </div>

        <div
          style={{
            textAlign: "right",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              color: "#6b7280",
            }}
          >
            Network Utilization
          </div>

          <div
            style={{
              fontSize: "42px",
              fontWeight: 800,
              color: "#2563eb",
            }}
          >
            {networkUtilization}%
          </div>
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, 1fr)",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <MetricCard
          label="Carts"
          value={carts.length}
          icon="📦"
        />

        <MetricCard
          label="Batches"
          value={batches.length}
          icon="🧺"
        />

        <MetricCard
          label="Machines"
          value={
            machineAssignments.length
          }
          icon="⚙️"
        />

        <MetricCard
          label="Deliveries"
          value={deliveries.length}
          icon="🚚"
        />
      </div>

      <div
        style={{
          background: "#f8fafc",
          borderLeft:
            `6px solid ${recommendationColor}`,
          borderRadius: "10px",
          padding: "16px",
        }}
      >
        <div
          style={{
            fontWeight: 700,
            marginBottom: "6px",
            color:
              recommendationColor,
          }}
        >
          Executive Recommendation
        </div>

        <div>
          {recommendation}
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: string;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "16px",
      }}
    >
      <div
        style={{
          fontSize: "24px",
          marginBottom: "8px",
        }}
      >
        {icon}
      </div>

      <div
        style={{
          color: "#6b7280",
          fontSize: "13px",
          marginBottom: "4px",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontWeight: 800,
          fontSize: "28px",
        }}
      >
        {value}
      </div>
    </div>
  );
}