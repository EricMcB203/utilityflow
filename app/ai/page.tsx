"use client";

export default function AIPage() {
  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
        padding: "30px",
      }}
    >
      <h1>UtilityFlow AI Assistant</h1>

      <p
        style={{
          color: "#6b7280",
          marginBottom: "30px",
        }}
      >
        Ask UtilityFlow questions about
        company knowledge, procedures,
        customers, operations, and more.
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
          placeholder="How does our locker process work?"
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #d1d5db",
            marginTop: "10px",
          }}
        />

        <button
          style={{
            marginTop: "15px",
            padding: "12px 20px",
            background: "#2563eb",
            color: "#ffffff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Ask Question
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gap: "20px",
        }}
      >
        <AIKnowledgeCard
          title="Wash And Fold Process"
        />

        <AIKnowledgeCard
          title="Locker Operations"
        />

        <AIKnowledgeCard
          title="Customer Service Standards"
        />
      </div>

      <div
        style={{
          marginTop: "30px",
          background: "#ffffff",
          padding: "24px",
          borderRadius: "16px",
          boxShadow:
            "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        <h2>AI Response Area</h2>

        <p
          style={{
            color: "#6b7280",
          }}
        >
          Future AI responses will appear here.
        </p>
      </div>
    </div>
  );
}

function AIKnowledgeCard({
  title,
}: {
  title: string;
}) {
  return (
    <div
      style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "16px",
        boxShadow:
          "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <strong>{title}</strong>
    </div>
  );
}