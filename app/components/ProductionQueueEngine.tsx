"use client";

type ProductionQueueEngineProps = {
  queueItems: any[];
};

export default function ProductionQueueEngine({
  queueItems,
}: ProductionQueueEngineProps) {
  async function advanceStage(
    id: string,
    currentStage: string
  ) {
    let nextStage = currentStage;

    if (currentStage === "Wash Queue") {
      nextStage = "Dry Queue";
    } else if (
      currentStage === "Dry Queue"
    ) {
      nextStage = "Fold Queue";
    } else if (
      currentStage === "Fold Queue"
    ) {
      nextStage =
        "Ready For Delivery";
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

      console.log(result);

      if (!response.ok) {
        alert(
          `Update Failed: ${
            result.error?.message ||
            "Unknown Error"
          }`
        );
        return;
      }

      alert(
        `Stage Updated To ${nextStage}`
      );

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
                >
                  Advance
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}