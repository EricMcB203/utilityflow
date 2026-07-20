"use client";

import { useState } from "react";

export default function AIPlan() {
  const [plan, setPlan] = useState("");

  function generatePlan() {
    const generatedPlan = `
RISK LEVEL:
Medium

REQUIRED PPE:
• Hard Hat
• Safety Glasses
• Gloves

REQUIRED TOOLS:
• Leak Detector
• Valve Key
• Inspection Kit

IMMEDIATE ACTIONS:
1. Verify leak location
2. Establish work zone
3. Perform inspection
4. Document findings
5. Update work order

RECOMMENDED CREW:
Leak Team A
`;

    setPlan(generatedPlan);
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <button onClick={generatePlan}>
        Generate AI Plan
      </button>

      {plan && (
        <pre
          style={{
            marginTop: "15px",
            padding: "15px",
            background: "#f3f3f3",
            borderRadius: "8px",
          }}
        >
          {plan}
        </pre>
      )}
    </div>
  );
}