export default function LaundryPlantStatus() {
  const plants = [
    {
      name: "South Fork",
      status: "Online",
      utilization: "78%",
    },
    {
      name: "Alamosa",
      status: "Online",
      utilization: "65%",
    },
    {
      name: "Regional Hub",
      status: "Standby",
      utilization: "0%",
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
      <h2>Plant Status</h2>

      <table
        style={{
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>Plant</th>
            <th>Status</th>
            <th>Utilization</th>
          </tr>
        </thead>

        <tbody>
          {plants.map((plant) => (
            <tr key={plant.name}>
              <td>{plant.name}</td>
              <td>{plant.status}</td>
              <td>{plant.utilization}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}