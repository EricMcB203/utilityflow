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

  const [saving, setSaving] =
    useState(false);

  async function saveWorkOrder() {
    if (!workType.trim()) {
      alert("Please enter a work type.");
      return;
    }

    setSaving(true);

    try {
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
            priority,
            status: "Open",
          }),
        }
      );

      if (response.ok) {
        alert(
          "✅ Work Order Created Successfully"
        );

        setWorkType("");
        setPriority("Medium");

        /*
          Temporary solution:
          We still refresh so the
          new work order appears.

          Next sprint we'll remove
          this entirely and update
          the UI instantly.
        */
        window.location.reload();
      } else {
        alert(
          "❌ Error Creating Work Order"
        );
      }
    } catch (error) {
      console.error(error);

      alert(
        "❌ Unexpected Error Creating Work Order"
      );
    }

    setSaving(false);
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
          padding: "8px",
          marginBottom: "10px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      <select
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value)
        }
        style={{
          width: "100%",
          padding: "8px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      >
        <option value="Low">
          Low
        </option>

        <option value="Medium">
          Medium
        </option>

        <option value="High">
          High
        </option>
      </select>

      <br />
      <br />

      <button
        onClick={saveWorkOrder}
        disabled={saving}
      >
        {saving
          ? "Creating..."
          : "Create Work Order"}
      </button>
    </div>
  );
}