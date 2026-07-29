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
import PlantBalancingEngine from "../components/PlantBalancingEngine";
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

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(5, 1fr)",
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <DashboardCard
          title="Carts"
          value={String(
            carts?.length ?? 0
          )}
          color="#2563eb"
        />

        <DashboardCard
          title="Batches"
          value={String(
            batches?.length ?? 0
          )}
          color="#f59e0b"
        />

        <DashboardCard
          title="Machines"
          value={String(
            machineAssignments?.length ??
              0
          )}
          color="#8b5cf6"
        />

        <DashboardCard
          title="Queue"
          value={String(
            queueItems?.length ?? 0
          )}
          color="#10b981"
        />

        <DashboardCard
          title="Deliveries"
          value={String(
            deliveries?.length ?? 0
          )}
          color="#ef4444"
        />
      </div>

      <CreateCart />

      <BatchAutomationStatus
        carts={carts ?? []}
      />

      <CartLifecycleBoard
        carts={carts ?? []}
      />

      <ChainOfCustodyTimeline
        events={
          custodyEvents ?? []
        }
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

      <PlantBalancingEngine
        plants={plants ?? []}
      />

      <HotelVisibilityPortal />

      <ForecastingEngine />

      <LaundryPlantStatus />
    </main>
  );
}

function DashboardCard({
  title,
  value,
  color,
}: {
  title: string;
  value: string;
  color: string;
}) {
  return (
    <div
      style={{
        background: "#fff",
        borderLeft: `8px solid ${color}`,
        borderRadius: "12px",
        padding: "20px",
        boxShadow:
          "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <div
        style={{
          fontSize: "14px",
          color: "#666",
          marginBottom: "8px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "30px",
          fontWeight: "bold",
          color,
        }}
      >
        {value}
      </div>
    </div>
  );
}