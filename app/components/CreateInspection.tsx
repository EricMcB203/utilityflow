"use client";

import { useState } from "react";

export default function CreateInspection({
  assetId,
}: {
  assetId: string;
}) {
  const [notes, setNotes] = useState("");

  async function saveInspection() {
    try {
      const response = await fetch(
        "/api/inspections",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            asset_id: assetId,
            inspection_type: "Leak Survey",
            result: "Pass",
            notes,
          }),
        }
      );

      if (response.ok) {
        alert("Inspection Saved");
        window.location.reload();
      } else {
        const error =
          await response.json();

        alert(
          JSON.stringify(
            error,
            null,
            2
          )
        );
      }
    } catch (err) {
      alert(
        "Unexpected Error: " +
          String(err)
      );
    }
  }

  return (
    <div
      style={{
        marginTop: "15px",
      }}
    >
      <textarea
        placeholder="Inspection Notes"
        value={notes}
        onChange={(e) =>
          setNotes(e.target.value)
        }
        style={{
          width: "100%",
          height: "120px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "8px",
        }}
      />

      <br />
      <br />

      <button
        onClick={saveInspection}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        Save Inspection
      </button>
    </div>
  );
}