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
          minHeight: "700px",
        }}
      >
        <h2>Asset Details</h2>

        <p>
          Click a marker on the map to view asset
          details.
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

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "12px",
        backgroundColor: "#fff",
        minHeight: "700px",
      }}
    >
      <h2>{asset.asset_name}</h2>

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

      <p>
        <strong>Latitude:</strong>{" "}
        {asset.latitude}
      </p>

      <p>
        <strong>Longitude:</strong>{" "}
        {asset.longitude}
      </p>

      <hr />

      <h3>Open Work Orders</h3>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
        }}
      >
        {assetWorkOrders.length === 0 ? (
          <li>No work orders.</li>
        ) : (
          assetWorkOrders.map((wo) => (
            <li
              key={wo.id}
              onClick={() =>
                onSelectWorkOrder(wo)
              }
              style={{
                cursor: "pointer",
                padding: "8px",
                marginBottom: "8px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f5f5f5",
              }}
            >
              {wo.work_type} - {wo.priority}
            </li>
          ))
        )}
      </ul>

      <hr />

      <h3>Inspection History</h3>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
        }}
      >
        {assetInspections.length === 0 ? (
          <li>No inspections.</li>
        ) : (
          assetInspections.map(
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