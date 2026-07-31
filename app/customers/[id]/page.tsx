"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type CustomerPageProps = {
  params: {
    id: string;
  };
};

export default function CustomerPage({
  params,
}: CustomerPageProps) {
  const [customer, setCustomer] =
    useState<any>(null);

  useEffect(() => {
    loadCustomer();
  }, []);

  async function loadCustomer() {
    const { data, error } =
      await supabase
        .from("customers")
        .select("*")
        .eq("id", params.id)
        .single();

    if (error) {
      console.error(error);
      return;
    }

    setCustomer(data);
  }

  if (!customer) {
    return (
      <div
        style={{
          padding: "40px",
        }}
      >
        Loading Customer...
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "1000px",
        margin: "40px auto",
        background: "#ffffff",
        padding: "30px",
        borderRadius: "20px",
        boxShadow:
          "0 8px 20px rgba(0,0,0,0.08)",
      }}
    >
      <h1>
        {customer.first_name}{" "}
        {customer.last_name}
      </h1>

      <p>
        <strong>
          Customer Type:
        </strong>{" "}
        {customer.customer_type}
      </p>

      <p>
        <strong>
          Company:
        </strong>{" "}
        {customer.company_name}
      </p>

      <p>
        <strong>Email:</strong>{" "}
        {customer.email}
      </p>

      <p>
        <strong>Phone:</strong>{" "}
        {customer.phone}
      </p>

      <p>
        <strong>Address:</strong>{" "}
        {customer.address}
      </p>

      <hr
        style={{
          margin: "30px 0",
        }}
      />

      <h2>
        UtilityFlow Customer Dashboard
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, 1fr)",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <DashboardCard
          title="Orders"
          value="0"
        />

        <DashboardCard
          title="Work Orders"
          value="0"
        />

        <DashboardCard
          title="Notifications"
          value="0"
        />
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div
      style={{
        background: "#f8fafc",
        padding: "20px",
        borderRadius: "12px",
      }}
    >
      <div
        style={{
          color: "#6b7280",
          marginBottom: "10px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "32px",
          fontWeight: 700,
        }}
      >
        {value}
      </div>
    </div>
  );
}