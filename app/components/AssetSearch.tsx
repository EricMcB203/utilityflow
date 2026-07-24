"use client";

export default function AssetSearch({
  assets,
  onSelectAsset,
}: {
  assets: any[];
  onSelectAsset: (asset: any) => void;
}) {
  return (
    <div
      style={{
        marginBottom: "20px",
      }}
    >
      <input
        type="text"
        placeholder="Search Assets..."
        style={{
          width: "100%",
          padding: "12px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
        onChange={(e) => {
          const search =
            e.target.value.toLowerCase();

          const match = assets.find(
            (asset) =>
              asset.asset_name
                ?.toLowerCase()
                .includes(search) ||
              asset.asset_number
                ?.toLowerCase()
                .includes(search)
          );

          if (match) {
            onSelectAsset(match);
          }
        }}
      />
    </div>
  );
}