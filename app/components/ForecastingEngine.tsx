export default function ForecastingEngine() {
  const forecasts = [
    {
      hotel: "Mountain View Resort",
      forecast: 1450,
      parLevel: 1200,
      status: "Above Par",
    },
    {
      hotel: "Riverside Lodge",
      forecast: 980,
      parLevel: 1100,
      status: "Below Par",
    },
    {
      hotel: "Summit Suites",
      forecast: 1200,
      parLevel: 1200,
      status: "On Target",
    },
  ];

  function getColor(
    status: string
  ) {
    switch (status) {
      case "Above Par":
        return "#10b981";

      case "Below Par":
        return "#ef4444";

      default:
        return "#3b82f6";
    }
  }

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
      <h2>
        Forecasting Engine
      </h2>

      <table
        style={{
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>Hotel</th>
            <th>
              Forecast Pounds
            </th>
            <th>Par Level</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {forecasts.map(
            (forecast) => (
              <tr
                key={
                  forecast.hotel
                }
              >
                <td>
                  {forecast.hotel}
                </td>

                <td>
                  {
                    forecast.forecast
                  }{" "}
                  lbs
                </td>

                <td>
                  {
                    forecast.parLevel
                  }{" "}
                  lbs
                </td>

                <td>
                  <span
                    style={{
                      color:
                        getColor(
                          forecast.status
                        ),
                      fontWeight:
                        "bold",
                    }}
                  >
                    {
                      forecast.status
                    }
                  </span>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}