import CreateCart from "./CreateCart";
import CartLifecycleBoard from "./CartLifecycleBoard";
import ChainOfCustodyTimeline from "./ChainOfCustodyTimeline";
import BatchAssignmentEngine from "./BatchAssignmentEngine";
import MachineAssignmentEngine from "./MachineAssignmentEngine";
import ProductionQueueEngine from "./ProductionQueueEngine";
import DeliveryManagement from "./DeliveryManagement";
import DriverDispatchDashboard from "./DriverDispatchDashboard";
import RouteOptimizationDashboard from "./RouteOptimizationDashboard";
import PlantRoutingDashboard from "./PlantRoutingDashboard";
import PlantUtilizationHeatMap from "./PlantUtilizationHeatMap";
import PlantBalancingEngine from "./PlantBalancingEngine";
import LaundryOperationsAlerts from "./LaundryOperationsAlerts";
import LaundryCommandSummary from "./LaundryCommandSummary";
import LaundrySectionNav from "./LaundrySectionNav";
import LaundrySectionCard from "./LaundrySectionCard";
import HotelVisibilityPortal from "./HotelVisibilityPortal";
import ForecastingEngine from "./ForecastingEngine";
import LaundryPlantStatus from "./LaundryPlantStatus";
import BatchAutomationStatus from "./BatchAutomationStatus";

type LaundryDashboardContentProps = {
  carts: any[];
  custodyEvents: any[];
  batches: any[];
  machineAssignments: any[];
  queueItems: any[];
  deliveries: any[];
  plants: any[];
};

export default function LaundryDashboardContent({
  carts,
  custodyEvents,
  batches,
  machineAssignments,
  queueItems,
  deliveries,
  plants,
}: LaundryDashboardContentProps) {
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

      <LaundrySectionNav />

      <section
        id="overview"
        style={{
          scrollMarginTop: "90px",
        }}
      >
        <LaundrySectionCard
          title="Overview"
          defaultOpen={true}
        >
          <LaundryCommandSummary
            carts={carts}
            batches={batches}
            machineAssignments={
              machineAssignments
            }
            queueItems={queueItems}
            deliveries={deliveries}
            plants={plants}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(5, 1fr)",
              gap: "20px",
              marginTop: "20px",
              marginBottom: "20px",
            }}
          >
            <DashboardCard
              title="Carts"
              value={String(
                carts.length
              )}
              color="#2563eb"
            />

            <DashboardCard
              title="Batches"
              value={String(
                batches.length
              )}
              color="#f59e0b"
            />

            <DashboardCard
              title="Machines"
              value={String(
                machineAssignments.length
              )}
              color="#8b5cf6"
            />

            <DashboardCard
              title="Queue"
              value={String(
                queueItems.length
              )}
              color="#10b981"
            />

            <DashboardCard
              title="Deliveries"
              value={String(
                deliveries.length
              )}
              color="#ef4444"
            />
          </div>

          <LaundryOperationsAlerts
            carts={carts}
            plants={plants}
            deliveries={deliveries}
            queueItems={queueItems}
          />
        </LaundrySectionCard>
      </section>

      <section
        id="carts"
        style={{
          scrollMarginTop: "90px",
        }}
      >
        <LaundrySectionCard
          title="Carts"
          defaultOpen={true}
        >
          <CreateCart />

          <BatchAutomationStatus
            carts={carts}
          />

          <CartLifecycleBoard
            carts={carts}
          />
        </LaundrySectionCard>
      </section>

      <section
        id="custody"
        style={{
          scrollMarginTop: "90px",
        }}
      >
        <LaundrySectionCard
          title="Chain Of Custody"
          defaultOpen={true}
        >
          <ChainOfCustodyTimeline
            events={custodyEvents}
          />
        </LaundrySectionCard>
      </section>

      <section
        id="production"
        style={{
          scrollMarginTop: "90px",
        }}
      >
        <LaundrySectionCard
          title="Production"
          defaultOpen={true}
        >
          <BatchAssignmentEngine
            batches={batches}
          />

          <MachineAssignmentEngine
            assignments={
              machineAssignments
            }
          />

          <ProductionQueueEngine
            queueItems={queueItems}
          />
        </LaundrySectionCard>
      </section>

      <section
        id="delivery"
        style={{
          scrollMarginTop: "90px",
        }}
      >
        <LaundrySectionCard
          title="Delivery"
          defaultOpen={true}
        >
          <DeliveryManagement
            deliveries={deliveries}
          />

          <DriverDispatchDashboard
            deliveries={deliveries}
          />

          <RouteOptimizationDashboard
            deliveries={deliveries}
          />
        </LaundrySectionCard>
      </section>

      <section
        id="routing"
        style={{
          scrollMarginTop: "90px",
        }}
      >
        <LaundrySectionCard
          title="Routing"
          defaultOpen={true}
        >
          <PlantRoutingDashboard
            plants={plants}
          />

          <PlantUtilizationHeatMap
            plants={plants}
          />

          <PlantBalancingEngine
            plants={plants}
          />
        </LaundrySectionCard>
      </section>

      <section
        id="forecasting"
        style={{
          scrollMarginTop: "90px",
        }}
      >
        <LaundrySectionCard
          title="Forecasting And Hotel Visibility"
          defaultOpen={true}
        >
          <HotelVisibilityPortal />

          <ForecastingEngine />
        </LaundrySectionCard>
      </section>

      <section
        id="plant-status"
        style={{
          scrollMarginTop: "90px",
        }}
      >
        <LaundrySectionCard
          title="Plant Status"
          defaultOpen={true}
        >
          <LaundryPlantStatus />
        </LaundrySectionCard>
      </section>
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
        borderLeft:
          `8px solid ${color}`,
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