import { supabase } from "../../lib/supabase";

import CreateCart from "../components/CreateCart";
import CartLifecycleBoard from "../components/CartLifecycleBoard";
import ChainOfCustodyTimeline from "../components/ChainOfCustodyTimeline";
import BatchAssignmentEngine from "../components/BatchAssignmentEngine";
import MachineAssignmentEngine from "../components/MachineAssignmentEngine";
import ProductionQueueEngine from "../components/ProductionQueueEngine";
import DeliveryManagement from "../components/DeliveryManagement";
import DriverDispatchDashboard from "../components/DriverDispatchDashboard";
import RouteOptimizationDashboard from "../components/RouteOptimizationDashboard";
import PlantRoutingDashboard from "../components/PlantRoutingDashboard";
import PlantUtilizationHeatMap from "../components/PlantUtilizationHeatMap";
import HotelVisibilityPortal from "../components/HotelVisibilityPortal";
import ForecastingEngine from "../components/ForecastingEngine";
import LaundryPlantStatus from "../components/LaundryPlantStatus";
import BatchAutomationStatus from "../components/BatchAutomationStatus";

export default async function LaundryPage() {
  const { data: carts } =
    await supabase
      .from("carts")
      .select("*");

  const { data: custodyEvents } =
    await supabase
      .from("chain_of_custody")
      .select("*")
      .order("event_time", {
        ascending: false,
      });

  const { data: batches } =
    await supabase
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

  const { data: plants } =
    await supabase
      .from("plant_capacity")
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
        UtilityFlow Laundry Division
      </h1>

      <CreateCart />

      <BatchAutomationStatus
        carts={carts ?? []}
      />

      <CartLifecycleBoard
        carts={carts ?? []}
      />

      <ChainOfCustodyTimeline
        events={custodyEvents ?? []}
      />

      <BatchAssignmentEngine
        batches={batches ?? []}
      />

      <MachineAssignmentEngine
        assignments={
          machineAssignments ?? []
        }
      />

      <ProductionQueueEngine
        queueItems={
          queueItems ?? []
        }
      />

      <DeliveryManagement
        deliveries={
          deliveries ?? []
        }
      />

      <DriverDispatchDashboard
        deliveries={
          deliveries ?? []
        }
      />

      <RouteOptimizationDashboard
        deliveries={
          deliveries ?? []
        }
      />

      <PlantRoutingDashboard
        plants={plants ?? []}
      />

      <PlantUtilizationHeatMap
        plants={plants ?? []}
      />

      <HotelVisibilityPortal />

      <ForecastingEngine />

      <LaundryPlantStatus />
    </main>
  );
}