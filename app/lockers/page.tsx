"use client";

export default function LockersPage() {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "30px",
      }}
    >
      <h1>Locker Management</h1>

      <p
        style={{
          color: "#6b7280",
          marginBottom: "30px",
        }}
      >
        UtilityFlow Residential Smart Lockers
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "20px",
        }}
      >
        <LockerCard
          locker="L-001"
          status="AVAILABLE"
          color="#10b981"
        />

        <LockerCard
          locker="L-002"
          status="AVAILABLE"
          color="#10b981"
        />

        <LockerCard
          locker="L-003"
          status="AVAILABLE"
          color="#10b981"
        />
      </div>
    </div>
  );
}

function LockerCard({
  locker,
  status,
  color,
}: {
  locker: string;
  status: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        borderTop: `5px solid ${color}`,
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          fontSize: "24px",
          fontWeight: 700,
        }}
      >
        {locker}
      </div>

      <div
        style={{
          marginTop: "10px",
          color,
          fontWeight: 600,
        }}
      >
        {status}
      </div>
    </div>
  );
}