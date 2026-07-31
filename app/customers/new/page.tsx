"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

const COMPANY_ID =
  "c0908917-6bb9-4dfe-b702-e8b180060900";

export default function NewCustomerPage() {
  const [customerType, setCustomerType] =
    useState("RESIDENTIAL");

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [companyName, setCompanyName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  const [message, setMessage] =
    useState("");

  async function createCustomer() {
    setSaving(true);
    setMessage("");

    const { error } =
      await supabase
        .from("customers")
        .insert([
          {
            company_id:
              COMPANY_ID,

            customer_type:
              customerType,

            first_name:
              firstName,

            last_name:
              lastName,

            company_name:
              companyName,

            email,

            phone,

            address,
          },
        ]);

    if (error) {
      setMessage(
        `Error: ${error.message}`
      );
    } else {
      setMessage(
        "Customer created successfully."
      );

      setFirstName("");
      setLastName("");
      setCompanyName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setCustomerType(
        "RESIDENTIAL"
      );
    }

    setSaving(false);
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        background: "#ffffff",
        padding: "30px",
        borderRadius: "20px",
        boxShadow:
          "0 8px 20px rgba(0,0,0,0.08)",
      }}
    >
      <h1>
        New Customer Intake
      </h1>

      <p
        style={{
          color: "#6b7280",
        }}
      >
        Create a new UtilityFlow customer.
      </p>

      <div
        style={{
          display: "grid",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div>
          <label>
            Customer Type
          </label>

          <select
            value={
              customerType
            }
            onChange={(e) =>
              setCustomerType(
                e.target.value
              )
            }
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
            }}
          >
            <option value="RESIDENTIAL">
              Residential
            </option>

            <option value="COMMERCIAL">
              Commercial
            </option>
          </select>
        </div>

        <div>
          <label>
            Company Name
          </label>

          <input
            value={companyName}
            onChange={(e) =>
              setCompanyName(
                e.target.value
              )
            }
            type="text"
            placeholder="Company Name"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
            }}
          />
        </div>

        <div>
          <label>
            First Name
          </label>

          <input
            value={firstName}
            onChange={(e) =>
              setFirstName(
                e.target.value
              )
            }
            type="text"
            placeholder="First Name"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
            }}
          />
        </div>

        <div>
          <label>
            Last Name
          </label>

          <input
            value={lastName}
            onChange={(e) =>
              setLastName(
                e.target.value
              )
            }
            type="text"
            placeholder="Last Name"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
            }}
          />
        </div>

        <div>
          <label>Email</label>

          <input
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            type="email"
            placeholder="Email"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
            }}
          />
        </div>

        <div>
          <label>Phone</label>

          <input
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
            type="text"
            placeholder="Phone"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
            }}
          />
        </div>

        <div>
          <label>Address</label>

          <input
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
            type="text"
            placeholder="Address"
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "8px",
            }}
          />
        </div>

        <button
          disabled={saving}
          onClick={
            createCustomer
          }
          style={{
            background:
              "#2563eb",
            color:
              "#ffffff",
            border: "none",
            borderRadius:
              "10px",
            padding: "14px",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          {saving
            ? "Saving..."
            : "Create Customer"}
        </button>

        {message && (
          <div
            style={{
              padding: "12px",
              borderRadius:
                "10px",
              background:
                "#f8fafc",
            }}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}