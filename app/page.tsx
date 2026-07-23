import { supabase } from "../lib/supabase";
import Map from "./components/Map";
import CreateInspection from "./components/CreateInspection";
import AIPlan from "./components/AIPlan";
import AssetPanel from "./components/AssetPanel";

export default async function Home() {
  const { data: assets } = await supabase
    .from("assets")
    .select("*");

  const { data: workOrders } = await supabase
    .from("work_orders")
    .select("*");

  const { data: inspections } = await supabase
    .from("inspections")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  const selectedAsset =
    assets && assets.length > 0
      ? assets[0]
      : null;

  return (
    <main style={{ padding: "30px" }}>
      <h1>UtilityFlow Asset Dashboard</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
          alignItems: "start",
        }}
      >
        <div>
          <Map assets={assets ?? []} />
        </div>

        <AssetPanel
          asset={selectedAsset}
        />
      </div>

      {selectedAsset && (
        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginTop: "20px",
            borderRadius: "12px",
            backgroundColor: "#fff",
          }}
        >
          <h2>
            {selectedAsset.asset_name}
          </h2>

          <p>
            <strong>
              Asset Number:
            </strong>{" "}
            {
              selectedAsset.asset_number
            }
          </p>

          <p>
            <strong>Type:</strong>{" "}
            {
              selectedAsset.asset_type
            }
          </p>

          <p>
            <strong>Status:</strong>{" "}
            {selectedAsset.status}
          </p>

          <h3>Open Work Orders</h3>

          <ul>
            {workOrders
              ?.filter(
                (wo) =>
                  wo.asset_id ===
                  selectedAsset.id
              )
              .map((wo) => (
                <li key={wo.id}>
                  {wo.work_type} -{" "}
                  {wo.priority}
                </li>
              ))}
          </ul>

          <h3>
            Inspection History
          </h3>

          <ul>
            {inspections
              ?.filter(
                (inspection) =>
                  inspection.asset_id ===
                  selectedAsset.id
              )
              .map((inspection) => (
                <li
                  key={inspection.id}
                  style={{
                    marginBottom:
                      "10px",
                  }}
                >
                  <strong>
                    {
                      inspection.inspection_type
                    }
                  </strong>

                  {" - "}

                  {
                    inspection.result
                  }

                  <br />

                  <small>
                    {inspection.notes}
                  </small>

                  <br />

                  <small>
                    {new Date(
                      inspection.created_at
                    ).toLocaleString()}
                  </small>
                </li>
              ))}
          </ul>

          <CreateInspection
            assetId={
              selectedAsset.id
            }
          />

          <div
            style={{
              marginTop: "20px",
            }}
          >
            <AIPlan />
          </div>
        </div>
      )}
    </main>
  );
}