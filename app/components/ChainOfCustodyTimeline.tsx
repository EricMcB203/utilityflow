type ChainOfCustodyTimelineProps = {
  events: any[];
};

export default function ChainOfCustodyTimeline({
  events,
}: ChainOfCustodyTimelineProps) {
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
      <h2>Chain Of Custody Timeline</h2>

      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <strong>
          Events Loaded:
        </strong>{" "}
        {events.length}
      </div>

      {events.map((event) => (
        <div
          key={event.id}
          style={{
            borderLeft:
              "3px solid #2563eb",
            paddingLeft: "15px",
            marginBottom: "15px",
          }}
        >
          <strong>
            {new Date(
              event.event_time
            ).toLocaleString(
              "en-US",
              {
                timeZone:
                  "America/Denver",
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
              }
            )}
          </strong>

          <br />

          {event.event_text}
        </div>
      ))}
    </div>
  );
}