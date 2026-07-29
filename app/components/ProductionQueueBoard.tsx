export default function ProductionQueueBoard() {
  const washQueue = [
    "B-100",
    "B-103",
  ];

  const dryQueue = [
    "B-101",
  ];

  const foldQueue = [
    "B-102",
  ];

  const readyQueue = [
    "B-099",
  ];

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
      <h2>Production Queue Board</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, 1fr)",
          gap: "15px",
        }}
      >
        <QueueColumn
          title="Wash Queue"
          batches={washQueue}
          color="#3b82f6"
        />

        <QueueColumn
          title="Dry Queue"
          batches={dryQueue}
          color="#f59e0b"
        />

        <QueueColumn
          title="Fold Queue"
          batches={foldQueue}
          color="#8b5cf6"
        />

        <QueueColumn
          title="Ready"
          batches={readyQueue}
          color="#10b981"
        />
      </div>
    </div>
  );
}

function QueueColumn({
  title,
  batches,
  color,
}: {
  title: string;
  batches: string[];
  color: string;
}) {
  return (
    <div
      style={{
        border: `2px solid ${color}`,
        borderRadius: "12px",
        padding: "15px",
      }}
    >
      <h3>{title}</h3>

      {batches.map((batch) => (
        <div
          key={batch}
          style={{
            background: "#f5f5f5",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
          }}
        >
          {batch}
        </div>
      ))}
    </div>
  );
}