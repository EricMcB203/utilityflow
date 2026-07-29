"use client";

import { useState } from "react";

export default function CreateCart() {
  const [cartNumber, setCartNumber] =
    useState("");

  const [hotelName, setHotelName] =
    useState("");

  async function createCart() {
    const response = await fetch(
      "/api/laundry/carts",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          cart_number: cartNumber,
          hotel_name: hotelName,
          current_weight: 0,
          status: "Idle",
        }),
      }
    );

    if (response.ok) {
      alert("Cart Created");

      window.location.reload();
    } else {
      alert("Error Creating Cart");
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
      <h2>Create Cart</h2>

      <input
        placeholder="Cart Number"
        value={cartNumber}
        onChange={(e) =>
          setCartNumber(
            e.target.value
          )
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <input
        placeholder="Hotel Name"
        value={hotelName}
        onChange={(e) =>
          setHotelName(
            e.target.value
          )
        }
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
        }}
      />

      <button
        onClick={createCart}
      >
        Create Cart
      </button>
    </div>
  );
}