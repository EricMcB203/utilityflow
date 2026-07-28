import LaundryPlantStatus from "../components/LaundryPlantStatus";

export default function LaundryPage() {
  const carts = [
    {
      id: "CART-001",
      hotel: "Mountain View Resort",
      weight: 245,
      status: "Collecting",
    },
    {
      id: "CART-002",
      hotel: "Riverside Lodge",
      weight: 190,
      status: "Ready For Pickup",
    },
    {
      id: "CART-003",
      hotel: "Summit Suites",
      weight: 315,
      status: "Processing",
    },
  ];

  const chainEvents = [
    {
      time: "08:15",
      event: "Cart CART-001 Collected",
    },
    {
      time: "08:45",
      event: "Batch B-100 Built",
    },
    {
      time: "09:02",
      event: "South Fork Plant Received Load",
    },
    {
      time: "09:18",
      event: "Wash Cycle Started",
    },
  ];

  const batches = [
    {
      id: "B-100",
      plant: "South Fork",
      pounds: 850,
      status: "Building",
    },
    {
      id: "B-101",
      plant: "Alamosa",
      pounds: 1250,
      status: "Ready",
    },
    {
      id: "B-102",
      plant: "South Fork",
      pounds: 920,
      status: "Processing",
    },
  ];

  return (
    <main
      style={{
        padding: "30px",
        backgroundColor: "#f7f7f7",
        minHeight: "100vh",
      }}
    >
      <h1>
        UtilityFlow Laundry Division
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <DashboardCard
          title="Carts Active"
          value="12"
          color="#2563eb"
        />

        <DashboardCard
          title="Open Batches"
          value="8"
          color="#f59e0b"
        />

        <DashboardCard
          title="Pounds Today"
          value="14,250"
          color="#10b981"
        />

        <DashboardCard
          title="Hotels Online"
          value="5"
          color="#8b5cf6"
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "2fr 1fr",
          gap: "20px",
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid #ddd",
          }}
        >
          <h2>Smart Cart Dashboard</h2>

          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th>Cart</th>
                <th>Hotel</th>
                <th>Weight</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {carts.map((cart) => (
                <tr key={cart.id}>
                  <td>{cart.id}</td>
                  <td>{cart.hotel}</td>
                  <td>{cart.weight} lbs</td>
                  <td>{cart.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "20px",
            border: "1px solid #ddd",
          }}
        >
          <h2>Chain Of Custody</h2>

          {chainEvents.map((event, i) => (
            <div
              key={i}
              style={{
                marginBottom: "10px",
              }}
            >
              <strong>
                {event.time}
              </strong>

              <br />

              {event.event}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          padding: "20px",
          border: "1px solid #ddd",
          marginTop: "20px",
        }}
      >
        <h2>Batch Builder</h2>

        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th>Batch</th>
              <th>Plant</th>
              <th>Pounds</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {batches.map((batch) => (
              <tr key={batch.id}>
                <td>{batch.id}</td>
                <td>{batch.plant}</td>
                <td>{batch.pounds} lbs</td>
                <td>{batch.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <LaundryPlantStatus />
    </main>
  );
}

function DashboardCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderLeft: `8px solid ${color}`,
        borderRadius: "12px",
        padding: "20px",
      }}
    >
      <div>{title}</div>

      <h2>{value}</h2>
    </div>
  );
}