"use client";

type DeliveryManagementProps = {
  deliveries: any[];
};

export default function DeliveryManagement({
  deliveries,
}: DeliveryManagementProps) {
  async function advanceDelivery(
    id: string,
    currentStatus: string
  ) {
    let nextStatus =
      currentStatus;

    if (
      currentStatus ===
      "Ready For Delivery"
    ) {
      nextStatus = "Assigned";
    } else if (
      currentStatus ===
      "Assigned"
    ) {
      nextStatus =
        "Out For Delivery";
    } else if (
      currentStatus ===
      "Out For Delivery"
    ) {
      nextStatus =
        "Delivered";
    }

    const response =
      await fetch(
        "/api/laundry/deliveries",
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            id,
            delivery_status:
              nextStatus,
          }),
        }
      );

    if (response.ok) {
      window.location.reload();
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
        Delivery Management
      </h2>

      <table
        style={{
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>Driver</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {deliveries.map(
            (delivery) => (
              <tr
                key={delivery.id}
              >
                <td>
                  {
                    delivery.driver_name
                  }
                </td>

                <td>
                  {
                    delivery.delivery_status
                  }
                </td>

                <td>
                  <button
                    onClick={() =>
                      advanceDelivery(
                        delivery.id,
                        delivery.delivery_status
                      )
                    }
                  >
                    Advance
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}