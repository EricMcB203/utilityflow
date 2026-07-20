import { supabase } from "../lib/supabase";
import Map from "./components/Map";
import CreateInspection from "./components/CreateInspection";
import AIPlan from "./components/AIPlan";

export default async function Home() {
  const { data: assets, error: assetsError } =
    await supabase
      .from("assets")
      .select("*");

  const { data: workOrders } =
    await supabase
      .from("work_orders")
      .select("*");

  const { data: inspections } =
    await supabase
      .from("inspections")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

  console.log("ASSETS:", assets);
  console.log("ASSETS ERROR:", assetsError);

  return (
    <main style={{ padding: "30px" }}>
      <h1>UtilityFlow Asset Dashboard</h1>

      <h2>Debug Information</h2>

      <pre
        style={{
          background: "#f3f3f3",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        Assets Count: {assets?.length ?? 0}
      </pre>

      <pre
        style={{
          background: "#f3f3f3",
          padding: "10px",
          borderRadius: "8px",
        }}
      >
        {JSON.stringify(
          assetsError,
          null,
          2
        )}
      </pre>

      <Map assets={assets ?? []} />

      {assets?.map((asset) => (
        <div
          key={asset.id}
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginTop: "20px",
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

          <h3>Open Work Orders</h3>

          <ul>
            {workOrders
              ?.filter(
                (wo) =>
                  wo.asset_id === asset.id
              )
              .map((wo) => (
                <li key={wo.id}>
                  {wo.work_type} -{" "}
                  {wo.priority}
                </li>
              ))}
          </ul>

          <h3>Inspection History</h3>

          <ul>
            {inspections
              ?.filter(
                (inspection) =>
                  inspection.asset_id ===
                  asset.id
              )
              .map((inspection) => (
                <li
                  key={inspection.id}
                >
                  <strong>
                    {
                      inspection.inspection_type
                    }
                  </strong>

                  {" - "}

                  {inspection.result}

                  <br />

                  <small>
                    {inspection.notes}
                  </small>
                </li>
              ))}
          </ul>

          <CreateInspection
            assetId={asset.id}
          />

          <div
            style={{
              marginTop: "20px",
            }}
          >
            <AIPlan />
          </div>
        </div>
      ))}
    </main>
  );
}