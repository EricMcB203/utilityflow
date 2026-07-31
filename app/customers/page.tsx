"use client";

import Link from "next/link";

export default function CustomersPage() {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "30px",
      }}
    >
      <h1>Customer Management</h1>

      <p>
        UtilityFlow Customer Relationship Management
      </p>

      <Link href="/customers/new">
        <button
          style={{
            padding: "12px 20px",
            background: "#2563eb",
            color: "#ffffff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          New Customer
        </button>
      </Link>
    </div>
  );
}