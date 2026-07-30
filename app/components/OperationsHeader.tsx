export default function OperationsHeader() {
  const lastUpdated =
    new Date().toLocaleString();

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #ffffff, #f8fafc)",
        borderRadius: "20px",
        padding: "10px",
        marginBottom: "24px",
        border: "1px solid #e5e7eb",
        boxShadow:
          "0 8px 20px rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <img
            src="/utilityflow-logo.png"
            alt="UtilityFlow Logo"
            style={{
              width: "300px",
              height: "200px",
            }}
          />

          <div>
            <h1
              style={{
                margin: 0,
                fontSize: "36px",
              }}
            >
              Laundry Division
            </h1>

            <div
              style={{
                color: "#6b7280",
                marginTop: "4px",
                fontSize: "18px",
              }}
            >
              Operations Command Center
            </div>
          </div>
        </div>

        <div
          style={{
            textAlign: "right",
          }}
        >
          <div
            style={{
              fontSize: "12px",
              color: "#6b7280",
            }}
          >
            Environment
          </div>

          <div
            style={{
              fontWeight: 700,
              color: "#10b981",
              marginBottom: "8px",
            }}
          >
            PRODUCTION
          </div>

          <div
            style={{
              fontSize: "12px",
              color: "#6b7280",
            }}
          >
            Last Updated
          </div>

          <div>{lastUpdated}</div>
        </div>
      </div>
    </div>
  );
}