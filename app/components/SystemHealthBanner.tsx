import StatusBadge from "./StatusBadge";

type SystemHealthBannerProps = {
  plants: any[];
  deliveries: any[];
};

export default function SystemHealthBanner({
  plants,
  deliveries,
}: SystemHealthBannerProps) {
  const onlinePlants =
    plants.length;

  const activeDeliveries =
    deliveries.filter(
      (delivery) =>
        delivery.delivery_status !==
        "Delivered"
    ).length;

  const hasCriticalPlant =
    plants.some((plant) => {
      const utilization =
        (plant.current_load /
          plant.max_capacity) *
        100;

      return utilization >= 95;
    });

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #eff6ff, #f8fafc)",
        border: "1px solid #dbeafe",
        borderRadius: "18px",
        padding: "24px",
        marginBottom: "24px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
            }}
          >
            System Health
          </h2>

          <p
            style={{
              color: "#6b7280",
              marginTop: "8px",
            }}
          >
            Laundry Operations Command Center
          </p>
        </div>

        <StatusBadge
          status={
            hasCriticalPlant
              ? "CRITICAL"
              : "NORMAL"
          }
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, 1fr)",
          gap: "16px",
          marginTop: "20px",
        }}
      >
        <Metric
          label="Plants Online"
          value={onlinePlants}
          icon="🏭"
        />

        <Metric
          label="Active Deliveries"
          value={
            activeDeliveries
          }
          icon="🚚"
        />

        <Metric
          label="Routing"
          value="Available"
          icon="✅"
        />
      </div>
    </div>
  );
}

function Metric({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: string;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "14px",
        padding: "16px",
        border: "1px solid #e5e7eb",
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
          fontSize: "13px",
          color: "#6b7280",
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontSize: "24px",
          fontWeight: 700,
        }}
      >
        {value}
      </div>
    </div>
  );
}