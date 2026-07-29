type BatchAutomationStatusProps = {
  carts: any[];
};

export default function BatchAutomationStatus({
  carts,
}: BatchAutomationStatusProps) {
  const assigned =
    carts.filter(
      (cart) => cart.batch_id
    ).length;

  const unassigned =
    carts.length - assigned;

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
      <h2>Batch Automation Status</h2>

      <p>
        <strong>
          Assigned Carts:
        </strong>{" "}
        {assigned}
      </p>

      <p>
        <strong>
          Unassigned Carts:
        </strong>{" "}
        {unassigned}
      </p>
    </div>
  );
}