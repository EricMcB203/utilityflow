type AssetPanelProps = {
  asset: any;
};

export default function AssetPanel({
  asset,
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
        <h2>Select an Asset</h2>
        <p>
          Click a marker on the map to view
          details.
        </p>
      </div>
    );
  }

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
    </div>
  );
}