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
          backgroundColor: "#f9f9f9",
        }}
      >
        Select a work order.
      </div>
    );
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

      <hr />

      <h3>Recommended Crew</h3>

      <p>Leak Team A</p>

      <h3>Required PPE</h3>

      <ul>
        <li>Hard Hat</li>
        <li>Safety Glasses</li>
        <li>Gloves</li>
      </ul>

      <h3>Immediate Actions</h3>

      <ol>
        <li>Verify leak location</li>
        <li>Establish safe work zone</li>
        <li>Perform inspection</li>
        <li>Document findings</li>
      </ol>
    </div>
  );
}