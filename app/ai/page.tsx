"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type KnowledgeRecord = {
  id: string;
  topic: string;
  summary: string;
  keywords: string;
};

type DocumentRecord = {
  id: string;
  title: string;
  description: string;
  document_type: string;
};

export default function AIPage() {
  const [knowledge, setKnowledge] = useState<
    KnowledgeRecord[]
  >([]);

  const [documents, setDocuments] = useState<
    DocumentRecord[]
  >([]);

  const [question, setQuestion] =
    useState("");

  const [response, setResponse] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadKnowledge();
    loadDocuments();
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
      console.error(error);
    } else {
      setKnowledge(data || []);
    }

    setLoading(false);
  }

  async function loadDocuments() {
    const { data, error } =
      await supabase
        .from("documents")
        .select("*");

    if (error) {
      console.error(error);
    } else {
      setDocuments(data || []);
    }
  }

  function askUtilityFlow() {
    if (!question.trim()) {
      setResponse(
        "Please enter a question."
      );
      return;
    }

    const words = question
      .toLowerCase()
      .split(/\s+/)
      .filter(
        (word) => word.length > 2
      );

    const scoredResults = knowledge
      .map((item) => {
        let score = 0;

        const topic =
          item.topic.toLowerCase();

        const summary =
          item.summary.toLowerCase();

        const keywords =
          item.keywords.toLowerCase();

        words.forEach((word) => {
          if (topic.includes(word))
            score += 10;

          if (
            keywords.includes(word)
          )
            score += 5;

          if (
            summary.includes(word)
          )
            score += 3;
        });

        return {
          ...item,
          score,
        };
      })
      .filter(
        (item) => item.score > 0
      )
      .sort(
        (a, b) =>
          b.score - a.score
      );

    if (
      scoredResults.length === 0
    ) {
      setResponse(
        "No matching knowledge found."
      );
      return;
    }

    const topMatch =
      scoredResults[0];

    const matchingDocuments =
      documents.filter((doc) => {
        const title =
          doc.title?.toLowerCase() ||
          "";

        const description =
          doc.description?.toLowerCase() ||
          "";

        return words.some(
          (word) =>
            title.includes(word) ||
            description.includes(word)
        );
      });

    let answer =
      "UTILITYFLOW RECOMMENDATION\n\n";

    answer +=
      `Based on company knowledge:\n\n${topMatch.summary}\n\n`;

    answer +=
      `Primary Topic: ${topMatch.topic}\n`;

    answer +=
      `Confidence Score: ${topMatch.score}\n`;

    if (
      scoredResults.length > 1
    ) {
      answer +=
        "\nRelated Knowledge:\n";

      scoredResults
        .slice(1, 3)
        .forEach((item) => {
          answer += `• ${item.topic}\n`;
        });
    }

    if (
      matchingDocuments.length > 0
    ) {
      answer +=
        "\nRelated Documents:\n";

      matchingDocuments.forEach(
        (doc) => {
          answer +=
            `• ${doc.title}\n`;
        }
      );
    }

    setResponse(answer);
  }

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "30px",
      }}
    >
      <h1>
        UtilityFlow AI Assistant
      </h1>

      <p
        style={{
          color: "#6b7280",
          marginBottom: "30px",
        }}
      >
        Search company knowledge,
        procedures, and documents.
      </p>

      <div
        style={{
          background: "#ffffff",
          padding: "24px",
          borderRadius: "16px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.08)",
          marginBottom: "30px",
        }}
      >
        <h2>Ask UtilityFlow</h2>

        <input
          type="text"
          value={question}
          onChange={(e) =>
            setQuestion(
              e.target.value
            )
          }
          placeholder="How does our locker process work?"
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border:
              "1px solid #d1d5db",
            marginTop: "10px",
          }}
        />

        <button
          onClick={
            askUtilityFlow
          }
          style={{
            marginTop: "15px",
            padding: "12px 20px",
            background:
              "#2563eb",
            color:
              "#ffffff",
            border: "none",
            borderRadius:
              "10px",
            cursor: "pointer",
          }}
        >
          Ask Question
        </button>
      </div>

      <div
        style={{
          background: "#ffffff",
          padding: "24px",
          borderRadius: "16px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.08)",
          marginBottom: "30px",
        }}
      >
        <h2>
          Knowledge Available:{" "}
          {knowledge.length}
        </h2>

        <h3>
          Documents Available:{" "}
          {documents.length}
        </h3>

        {loading && (
          <p>
            Loading knowledge...
          </p>
        )}
      </div>

      <div
        style={{
          background: "#ffffff",
          padding: "24px",
          borderRadius: "16px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h2>AI Response</h2>

        <pre
          style={{
            whiteSpace:
              "pre-wrap",
          }}
        >
          {response ||
            "Ask a question to search company knowledge."}
        </pre>
      </div>
    </div>
  );
}