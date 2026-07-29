type BatchAssignmentEngineProps = {
  batches: any[];
};

export default function BatchAssignmentEngine({
  batches,
}: BatchAssignmentEngineProps) {
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
      <h2>Batch Assignment Engine</h2>

      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <strong>
          Batches Loaded:
        </strong>{" "}
        {batches.length}
      </div>

      <table
        style={{
          width: "100%",
        }}
      >
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
              <td>
                {batch.batch_number}
              </td>

              <td>
                {batch.plant_name}
              </td>

              <td>
                {batch.pounds} lbs
              </td>

              <td>
                {batch.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}