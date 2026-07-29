"use client";

import { useState } from "react";

export default function SmartCartSessionManager() {
  const [carts, setCarts] = useState([
    {
      id: "CART-001",
      status: "Collecting",
    },
    {
      id: "CART-002",
      status: "Ready For Pickup",
    },
    {
      id: "CART-003",
      status: "Processing",
    },
  ]);

  const workflow = [
    "Idle",
    "Collecting",
    "Ready For Pickup",
    "Processing",
    "Complete",
  ];

  function advanceCart(
    cartId: string
  ) {
    setCarts((current) =>
      current.map((cart) => {
        if (cart.id !== cartId)
          return cart;

        const currentIndex =
          workflow.indexOf(
            cart.status
          );

        if (
          currentIndex ===
          workflow.length - 1
        ) {
          return cart;
        }

        return {
          ...cart,
          status:
            workflow[
              currentIndex + 1
            ],
        };
      })
    );
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        border:
          "1px solid #ddd",
        marginTop: "20px",
      }}
    >
      <h2>
        Smart Cart Session Manager
      </h2>

      <table
        style={{
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>Cart</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {carts.map((cart) => (
            <tr key={cart.id}>
              <td>{cart.id}</td>

              <td>
                {cart.status}
              </td>

              <td>
                <button
                  onClick={() =>
                    advanceCart(
                      cart.id
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