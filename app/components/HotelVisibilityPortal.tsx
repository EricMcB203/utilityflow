export default function HotelVisibilityPortal() {
  const hotels = [
    {
      hotel: "Mountain View Resort",
      processing: 1250,
      ready: 850,
      batch: "B-105",
      eta: "3:30 PM",
    },
    {
      hotel: "Riverside Lodge",
      processing: 900,
      ready: 400,
      batch: "B-106",
      eta: "4:15 PM",
    },
    {
      hotel: "Summit Suites",
      processing: 600,
      ready: 300,
      batch: "B-107",
      eta: "5:00 PM",
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
      <h2>Hotel Visibility Portal</h2>

      <table
        style={{
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>Hotel</th>
            <th>Processing</th>
            <th>Ready</th>
            <th>Batch</th>
            <th>ETA</th>
          </tr>
        </thead>

        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel.hotel}>
              <td>{hotel.hotel}</td>

              <td>
                {hotel.processing} lbs
              </td>

              <td>
                {hotel.ready} lbs
              </td>

              <td>{hotel.batch}</td>

              <td>{hotel.eta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}