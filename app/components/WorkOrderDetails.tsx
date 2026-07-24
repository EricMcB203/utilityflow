"use client";

type WorkOrderDetailsProps = {
  workOrder: any;
};

export default function WorkOrderDetails({
  workOrder,
}: WorkOrderDetailsProps) {
  if (!workOrder) {
    return (
      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        Select a work order.
      </div>
    );
  }

  async function updateStatus(
    status: string
  ) {
    const response = await fetch(
      "/api/workorders",
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          id: workOrder.id,
          status,
        }),
      }
    );

    if (response.ok) {
      alert(
        "Status Updated"
      );

      window.location.reload();
    } else {
      alert(
        "Error Updating Status"
      );
    }
  }

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        backgroundColor: "#fff",
      }}
    >
      <h2>Work Order Details</h2>

      <p>
        <strong>Work Type:</strong>{" "}
        {workOrder.work_type}
      </p>

      <p>
        <strong>Priority:</strong>{" "}
        {workOrder.priority}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {workOrder.status}
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        <button
          onClick={() =>
            updateStatus("Open")
          }
        >
          Open
        </button>

        <button
          onClick={() =>
            updateStatus(
              "In Progress"
            )
          }
        >
          In Progress
        </button>

        <button
          onClick={() =>
            updateStatus(
              "Completed"
            )
          }
        >
          Completed
        </button>
      </div>

      <hr />

      <h3>Recommended Crew</h3>

      <p>Leak Team A</p>

      <h3>Required PPE</h3>

      <ul>
        <li>Hard Hat</li>
        <li>Safety Glasses</li>
        <li>Gloves</li>
      </ul>
    </div>
  );
}