"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type KnowledgeRecord = {
  id: string;
  topic: string;
  summary: string;
  keywords: string;
};

export default function KnowledgePage() {
  const [knowledge, setKnowledge] =
    useState<KnowledgeRecord[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadKnowledge();
  }, []);

  async function loadKnowledge() {
    const { data, error } =
      await supabase
        .from("knowledge_base")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      console.error(
        "Error loading knowledge:",
        error
      );
    } else {
      setKnowledge(data || []);
    }

    setLoading(false);
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "30px",
      }}
    >
      <h1>Knowledge Center</h1>

      <p
        style={{
          color: "#6b7280",
          marginBottom: "20px",
        }}
      >
        UtilityFlow Company Knowledge &
        AI Foundation
      </p>

      <h2>
        Knowledge Entries: {knowledge.length}
      </h2>

      {loading && (
        <p>Loading Knowledge...</p>
      )}

      {!loading &&
        knowledge.length === 0 && (
          <p>
            No knowledge entries found.
          </p>
        )}

      <div
        style={{
          display: "grid",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {knowledge.map((item) => (
          <div
            key={item.id}
            style={{
              background: "#ffffff",
              padding: "20px",
              borderRadius: "16px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <h3>{item.topic}</h3>

            <p>
              {item.summary}
            </p>

            <p
              style={{
                color: "#6b7280",
                fontSize: "14px",
              }}
            >
              Keywords:{" "}
              {item.keywords}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
