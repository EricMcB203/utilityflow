"use client";

import StatusBadge from "./StatusBadge";

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
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        border: "1px solid #e5e7eb",
      }}
    >
      <h2>
        Delivery Management
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
              Driver
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
          {deliveries.map(
            (delivery) => (
              <tr
                key={delivery.id}
                style={{
                  borderTop:
                    "1px solid #f1f5f9",
                }}
              >
                <td
                  style={{
                    padding: "12px",
                  }}
                >
                  {
                    delivery.driver_name
                  }
                </td>

                <td
                  style={{
                    padding: "12px",
                  }}
                >
                  <StatusBadge
                    status={
                      delivery.delivery_status
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
                      advanceDelivery(
                        delivery.id,
                        delivery.delivery_status
                      )
                    }
                    style={{
                      background:
                        "#2563eb",
                      color:
                        "#ffffff",
                      border:
                        "none",
                      borderRadius:
                        "8px",
                      padding:
                        "8px 14px",
                      cursor:
                        "pointer",
                      fontWeight:
                        600,
                    }}
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