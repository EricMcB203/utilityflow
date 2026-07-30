"use client";

import StatusBadge from "./StatusBadge";

type ProductionQueueEngineProps = {
  queueItems: any[];
};

export default function ProductionQueueEngine({
  queueItems,
}: ProductionQueueEngineProps) {
  function getNextStage(
    currentStage: string
  ) {
    if (currentStage === "Wash Queue") {
      return "Dry Queue";
    }

    if (currentStage === "Dry Queue") {
      return "Fold Queue";
    }

    if (currentStage === "Fold Queue") {
      return "Ready For Delivery";
    }

    return currentStage;
  }

  async function advanceStage(
    id: string,
    currentStage: string
  ) {
    const nextStage =
      getNextStage(currentStage);

    if (
      currentStage ===
      "Ready For Delivery"
    ) {
      alert(
        "This batch is already ready for delivery."
      );

      return;
    }

    try {
      const response = await fetch(
        "/api/laundry/production-queue",
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id,
            queue_stage: nextStage,
          }),
        }
      );

      const result =
        await response.json();

      if (!response.ok) {
        alert(
          `Update Failed: ${
            result.error ||
            "Unknown Error"
          }`
        );

        return;
      }

      if (
        nextStage ===
        "Ready For Delivery"
      ) {
        alert(
          "Batch is ready for delivery. Delivery record created."
        );
      } else {
        alert(
          `Stage Updated To ${nextStage}`
        );
      }

      window.location.reload();
    } catch (error) {
      console.error(error);

      alert(
        "Failed To Contact Server"
      );
    }
  }

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        border: "1px solid #e5e7eb",
      }}
    >
      <h2>
        Production Queue Engine
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse:
            "collapse",
        }}
      >
        <thead>
          <tr>
            <th
              style={{
                textAlign: "left",
                padding: "12px",
              }}
            >
              Queue Stage
            </th>

            <th
              style={{
                textAlign: "left",
                padding: "12px",
              }}
            >
              Status
            </th>

            <th
              style={{
                textAlign: "left",
                padding: "12px",
              }}
            >
              Action
            </th>
          </tr>
        </thead>

        <tbody>
          {queueItems.map((item) => (
            <tr
              key={item.id}
              style={{
                borderTop:
                  "1px solid #f1f5f9",
              }}
            >
              <td
                style={{
                  padding: "12px",
                  fontWeight: 600,
                }}
              >
                {item.queue_stage}
              </td>

              <td
                style={{
                  padding: "12px",
                }}
              >
                <StatusBadge
                  status={
                    item.status ??
                    "QUEUED"
                  }
                />
              </td>

              <td
                style={{
                  padding: "12px",
                }}
              >
                <button
                  onClick={() =>
                    advanceStage(
                      item.id,
                      item.queue_stage
                    )
                  }
                  disabled={
                    item.queue_stage ===
                    "Ready For Delivery"
                  }
                  style={{
                    background:
                      item.queue_stage ===
                      "Ready For Delivery"
                        ? "#9ca3af"
                        : "#2563eb",
                    color:
                      "#ffffff",
                    border: "none",
                    borderRadius:
                      "8px",
                    padding:
                      "8px 14px",
                    cursor:
                      item.queue_stage ===
                      "Ready For Delivery"
                        ? "not-allowed"
                        : "pointer",
                    fontWeight: 600,
                  }}
                >
                  {item.queue_stage ===
                  "Ready For Delivery"
                    ? "Ready"
                    : "Advance"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}