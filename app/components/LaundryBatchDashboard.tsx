export default function LaundryBatchDashboard() {
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
              <td>{batch.id}</td>
              <td>{batch.plant}</td>
              <td>
                {batch.pounds} lbs
              </td>
              <td>{batch.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
