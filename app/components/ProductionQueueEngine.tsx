"use client";

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
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        border: "1px solid #ddd",
        marginTop: "20px",
      }}
    >
      <h2>
        Production Queue Engine
      </h2>

      <table
        style={{
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>Stage</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {queueItems.map((item) => (
            <tr key={item.id}>
              <td>
                {item.queue_stage}
              </td>

              <td>
                {item.status}
              </td>

              <td>
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