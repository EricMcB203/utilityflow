"use client";

import { useState } from "react";

export default function CreateWorkOrder({
  assetId,
}: {
  assetId: string;
}) {
  const [workType, setWorkType] =
    useState("");

  const [priority, setPriority] =
    useState("Medium");

  async function saveWorkOrder() {
    const response = await fetch(
      "/api/workorders",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          asset_id: assetId,
          work_type: workType,
          priority: priority,
          status: "Open",
        }),
      }
    );

    if (response.ok) {
      alert("Work Order Created");
      window.location.reload();
    } else {
      alert("Error Creating Work Order");
    }
  }

  return (
    <div
      style={{
        marginTop: "20px",
      }}
    >
      <h3>Create Work Order</h3>

      <input
        placeholder="Work Type"
        value={workType}
        onChange={(e) =>
          setWorkType(e.target.value)
        }
        style={{
          width: "100%",
          marginBottom: "10px",
        }}
      />

      <select
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value)
        }
      >
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <br />
      <br />

      <button
        onClick={saveWorkOrder}
      >
        Create Work Order
      </button>
    </div>
  );
}