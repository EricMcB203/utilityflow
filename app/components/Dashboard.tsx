"use client";

import { useState } from "react";
import Map from "./Map";
import AssetPanel from "./AssetPanel";
import WorkOrderDetails from "./WorkOrderDetails";
import AssetSearch from "./AssetSearch";
import OperationsDashboard from "./OperationsDashboard";

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

  const [allWorkOrders] =
    useState(workOrders);

  const [selectedWorkOrder, setSelectedWorkOrder] =
    useState(
      workOrders.length > 0
        ? workOrders[0]
        : null
    );

  function handleAssetSelect(
    asset: any
  ) {
    setSelectedAsset(asset);

    const firstWorkOrder =
      allWorkOrders.find(
        (wo) =>
          wo.asset_id === asset.id
      );

    setSelectedWorkOrder(
      firstWorkOrder || null
    );
  }

  return (
    <>
      <OperationsDashboard
        assets={assets}
        workOrders={allWorkOrders}
        inspections={inspections}
      />

      <AssetSearch
        assets={assets}
        onSelectAsset={
          handleAssetSelect
        }
      />

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
          onSelectAsset={
            handleAssetSelect
          }
        />

        <AssetPanel
          asset={selectedAsset}
          workOrders={allWorkOrders}
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