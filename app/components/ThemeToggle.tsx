"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] =
    useState(false);

  useEffect(() => {
    const savedTheme =
      localStorage.getItem(
        "utilityflow-theme"
      );

    if (savedTheme === "dark") {
      setDarkMode(true);

      document.body.setAttribute(
        "data-theme",
        "dark"
      );
    }
  }, []);

  function toggleTheme() {
    const next =
      !darkMode;

    setDarkMode(next);

    localStorage.setItem(
      "utilityflow-theme",
      next ? "dark" : "light"
    );

    document.body.setAttribute(
      "data-theme",
      next ? "dark" : "light"
    );
  }

  return (
    <button
      onClick={toggleTheme}
      style={{
        border: "none",
        borderRadius: "999px",
        background:
          darkMode
            ? "#111827"
            : "#2563eb",
        color: "#ffffff",
        padding:
          "10px 16px",
        fontWeight: 700,
        cursor: "pointer",
      }}
    >
      {darkMode
        ? "🌙 Dark Mode"
        : "☀️ Light Mode"}
    </button>
  );
}