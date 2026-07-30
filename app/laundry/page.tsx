import { supabase } from "../../lib/supabase";
import LaundryDashboardContent from "../components/LaundryDashboardContent";

export default async function LaundryPage() {
  const { data: carts } = await supabase
    .from("carts")
    .select("*");

  const { data: custodyEvents } =
    await supabase
      .from("chain_of_custody")
      .select("*")
      .order("event_time", {
        ascending: false,
      });

  const { data: batches } = await supabase
    .from("batches")
    .select("*");

  const { data: machineAssignments } =
    await supabase
      .from("machine_assignments")
      .select("*");

  const { data: queueItems } =
    await supabase
      .from("production_queue")
      .select("*");

  const { data: deliveries } =
    await supabase
      .from("deliveries")
      .select("*");

  const { data: plants } = await supabase
    .from("plant_capacity")
    .select("*");

  return (
    <LaundryDashboardContent
      carts={carts ?? []}
      custodyEvents={custodyEvents ?? []}
      batches={batches ?? []}
      machineAssignments={
        machineAssignments ?? []
      }
      queueItems={queueItems ?? []}
      deliveries={deliveries ?? []}
      plants={plants ?? []}
    />
  );
}