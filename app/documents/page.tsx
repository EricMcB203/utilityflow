"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type DocumentRecord = {
  id: string;
  title: string;
  document_type: string;
  description: string;
};

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<DocumentRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDocuments();
  }, []);

  async function loadDocuments() {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.error("Error loading documents:", error);
    } else {
      setDocuments(data || []);
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
      <h1>Documents Center</h1>

      <p
        style={{
          color: "#6b7280",
          marginBottom: "20px",
        }}
      >
        Company documents that power the UtilityFlow
        Knowledge Engine.
      </p>

      <h2>
        Documents Found: {documents.length}
      </h2>

      {loading && <p>Loading documents...</p>}

      {!loading && documents.length === 0 && (
        <p>No documents found.</p>
      )}

      <div
        style={{
          display: "grid",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {documents.map((document) => (
          <div
            key={document.id}
            style={{
              background: "#ffffff",
              padding: "20px",
              borderRadius: "16px",
              boxShadow:
                "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <h3>{document.title}</h3>

            <p>
              <strong>Type:</strong>{" "}
              {document.document_type}
            </p>

            <p>{document.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}