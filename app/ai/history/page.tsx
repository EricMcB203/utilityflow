"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Conversation = {
  id: string;
  question: string;
  answer: string;
  source_count: number;
  created_at: string;
};

export default function AIHistoryPage() {
  const [conversations, setConversations] =
    useState<Conversation[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    const { data, error } =
      await supabase
        .from("ai_conversations")
        .select("*")
        .order("created_at", {
          ascending: false,
        });

    if (error) {
      console.error(error);
      return;
    }

    setConversations(data || []);
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "30px",
      }}
    >
      <h1>AI Conversation History</h1>

      <p>
        UtilityFlow AI audit trail.
      </p>

      <h2>
        Conversations: {conversations.length}
      </h2>

      <div
        style={{
          display: "grid",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {conversations.map(
          (conversation) => (
            <div
              key={conversation.id}
              style={{
                background: "#ffffff",
                padding: "20px",
                borderRadius: "16px",
                boxShadow:
                  "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <h3>
                {conversation.question}
              </h3>

              <p>
                {conversation.answer}
              </p>

              <p>
                Sources Used:{" "}
                {
                  conversation.source_count
                }
              </p>

              <p
                style={{
                  color: "#6b7280",
                  fontSize: "14px",
                }}
              >
                {
                  conversation.created_at
                }
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
``