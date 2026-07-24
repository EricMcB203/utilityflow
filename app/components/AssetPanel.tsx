import CreateInspection from "./CreateInspection";
import CreateWorkOrder from "./CreateWorkOrder";
import AIPlan from "./AIPlan";

type AssetPanelProps = {
  asset: any;
  workOrders: any[];
  inspections: any[];
  onSelectWorkOrder: (wo: any) => void;
};

export default function AssetPanel({
  asset,
  workOrders,
  inspections,
  onSelectWorkOrder,
}: AssetPanelProps) {
  if (!asset) {
    return (
      <div
        style={{
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "12px",
          backgroundColor: "#fff",
        }}
      >
        <h2>Asset Details</h2>

        <p>
          Click a marker on the map to view
          asset details.
        </p>
      </div>
    );
  }

  const assetWorkOrders =
    workOrders?.filter(
      (wo) => wo.asset_id === asset.id
    ) ?? [];

  const assetInspections =
    inspections?.filter(
      (inspection) =>
        inspection.asset_id === asset.id
    ) ?? [];

  function getHealthScore() {
    switch (asset.asset_type) {
      case "Valve":
        return {
          score: 92,
          color: "#10b981",
          icon: "🟢",
        };

      case "Regulator":
        return {
          score: 78,
          color: "#f59e0b",
          icon: "🟡",
        };

      case "Meter":
        return {
          score: 96,
          color: "#10b981",
          icon: "🟢",
        };

      default:
        return {
          score: 85,
          color: "#3b82f6",
          icon: "🔵",
        };
    }
  }

  const health = getHealthScore();

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        backgroundColor: "#fff",
      }}
    >
      <h2>{asset.asset_name}</h2>

      <div
        style={{
          background: "#f5f5f5",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            fontSize: "14px",
            color: "#666",
          }}
        >
          Asset Health Score
        </div>

        <div
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            color: health.color,
          }}
        >
          {health.icon} {health.score}%
        </div>
      </div>

      <p>
        <strong>Asset Number:</strong>{" "}
        {asset.asset_number}
      </p>

      <p>
        <strong>Type:</strong>{" "}
        {asset.asset_type}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        {asset.status}
      </p>

      <hr />

      <h3>Open Work Orders</h3>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
        }}
      >
        {assetWorkOrders.map((wo) => (
          <li
            key={wo.id}
            onClick={() =>
              onSelectWorkOrder(wo)
            }
            style={{
              cursor: "pointer",
              padding: "10px",
              marginBottom: "10px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              backgroundColor: "#f5f5f5",
            }}
          >
            <strong>
              {wo.work_type}
            </strong>

            <br />

            Priority: {wo.priority}

            <br />

            Status: {wo.status}
          </li>
        ))}
      </ul>

      <hr />

      <h3>Inspection History</h3>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
        }}
      >
        {assetInspections.map(
          (inspection) => (
            <li
              key={inspection.id}
              style={{
                padding: "8px",
                marginBottom: "8px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <strong>
                {inspection.inspection_type}
              </strong>

              {" - "}

              {inspection.result}

              <br />

              <small>
                {inspection.notes}
              </small>
            </li>
          )
        )}
      </ul>

      <hr />

      <h3>Create Inspection</h3>

      <CreateInspection
        assetId={asset.id}
      />

      <hr />

      <CreateWorkOrder
        assetId={asset.id}
      />

      <hr />

      <AIPlan
        assetType={asset.asset_type}
      />
    </div>
  );
}