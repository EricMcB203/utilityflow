"use client";

import { useState } from "react";
import Map from "./Map";
import AssetPanel from "./AssetPanel";
import WorkOrderDetails from "./WorkOrderDetails";

export default function Dashboard({
  assets,
  workOrders,
  inspections,
}: {
  assets: any[];
  workOrders: any[];
  inspections: any[];
}) {
  const [selectedAsset, setSelectedAsset] =
    useState(
      assets.length > 0 ? assets[0] : null
    );

  const assetWorkOrders =
    workOrders.filter(
      (wo) =>
        wo.asset_id === selectedAsset?.id
    );

  const [selectedWorkOrder, setSelectedWorkOrder] =
    useState(
      assetWorkOrders[0] || null
    );

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "20px",
          alignItems: "start",
        }}
      >
        <Map
          assets={assets}
          onSelectAsset={(asset) => {
            setSelectedAsset(asset);

            const workOrder =
              workOrders.find(
                (wo) =>
                  wo.asset_id === asset.id
              );

            setSelectedWorkOrder(
              workOrder || null
            );
          }}
        />

        <AssetPanel
          asset={selectedAsset}
          workOrders={workOrders}
          inspections={inspections}
          onSelectWorkOrder={
            setSelectedWorkOrder
          }
        />
      </div>

      <WorkOrderDetails
        workOrder={selectedWorkOrder}
      />
    </>
  );
}