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
  const totalPlantLoad = plants.reduce(
    (sum, plant) =>
      sum + Number(plant.current_load),
    0
  );

  const totalPlantCapacity = plants.reduce(
    (sum, plant) =>
      sum + Number(plant.max_capacity),
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
    "Laundry operations are stable. Continue normal routing and monitor production queue activity.";

  if (criticalPlants.length > 0) {
    recommendation =
      "One or more plants are near or above critical capacity. Route new work to lower-utilization plants.";
  } else if (readyDeliveries.length > 0) {
    recommendation =
      "Deliveries are ready. Dispatch should prioritize driver assignment and outbound delivery.";
  } else if (queueItems.length > 5) {
    recommendation =
      "Production queue is growing. Review machine assignments and plant capacity.";
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        border: "1px solid #ddd",
        marginBottom: "20px",
        borderLeft: "8px solid #2563eb",
      }}
    >
      <h2>
        Laundry Command Summary
      </h2>

      <p>
        UtilityFlow is currently
        tracking{" "}
        <strong>
          {carts.length}
        </strong>{" "}
        carts,{" "}
        <strong>
          {batches.length}
        </strong>{" "}
        batches,{" "}
        <strong>
          {machineAssignments.length}
        </strong>{" "}
        machine assignments,{" "}
        <strong>
          {queueItems.length}
        </strong>{" "}
        production queue items, and{" "}
        <strong>
          {deliveries.length}
        </strong>{" "}
        deliveries.
      </p>

      <p>
        <strong>
          Network Utilization:
        </strong>{" "}
        {networkUtilization}%
      </p>

      <p>
        <strong>
          Recommendation:
        </strong>{" "}
        {recommendation}
      </p>
    </div>
  );
}