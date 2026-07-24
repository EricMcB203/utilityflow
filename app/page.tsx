import { supabase } from "../lib/supabase";
import Dashboard from "./components/Dashboard";

export default async function Home() {
  const { data: assets } = await supabase
    .from("assets")
    .select("*");

  const { data: workOrders } =
    await supabase
      .from("work_orders")
      .select("*");

  const { data: inspections } =
    await supabase
      .from("inspections")
      .select("*");

  return (
    <main
      style={{
        padding: "30px",
        backgroundColor: "#f7f7f7",
        minHeight: "100vh",
      }}
    >
      <h1>
        AI-Powered UtilityFlow Operations Center
      </h1>

      <Dashboard
        assets={assets ?? []}
        workOrders={workOrders ?? []}
        inspections={inspections ?? []}
      />
    </main>
  );
}