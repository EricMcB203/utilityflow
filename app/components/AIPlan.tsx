"use client";

import { useState } from "react";

export default function AIPlan({
  assetType,
}: {
  assetType: string;
}) {
  const [plan, setPlan] =
    useState("");

  function generatePlan() {
    if (assetType === "Valve") {
      setPlan(`
RISK LEVEL
Medium

REQUIRED PPE
• Hard Hat
• Safety Glasses
• Gloves

RECOMMENDED CREW
Valve Team

REQUIRED TOOLS
• Leak Detector
• Valve Key

IMMEDIATE ACTIONS
1. Verify valve condition
2. Establish work zone
3. Inspect valve
4. Document findings
`);
    } else if (
      assetType === "Regulator"
    ) {
      setPlan(`
RISK LEVEL
High

REQUIRED PPE
• Hard Hat
• Safety Glasses
• Gloves

RECOMMENDED CREW
Pressure Control Team

REQUIRED TOOLS
• Pressure Gauge
• Calibration Kit

IMMEDIATE ACTIONS
1. Check pressure levels
2. Inspect regulator
3. Verify settings
4. Document findings
`);
    } else if (
      assetType === "Meter"
    ) {
      setPlan(`
RISK LEVEL
Low

REQUIRED PPE
• Safety Glasses

RECOMMENDED CREW
Meter Services Team

REQUIRED TOOLS
• Meter Tester
• Inspection Kit

IMMEDIATE ACTIONS
1. Verify meter readings
2. Inspect connections
3. Record findings
`);
    } else {
      setPlan(`
RISK LEVEL
Medium

REQUIRED PPE
• Hard Hat
• Gloves

RECOMMENDED CREW
Field Operations Team

REQUIRED TOOLS
• General Inspection Kit

IMMEDIATE ACTIONS
1. Inspect asset
2. Record findings
3. Update work order
`);
    }
  }

  return (
    <div>
      <button
        onClick={generatePlan}
      >
        Generate AI Plan
      </button>

      {plan && (
        <div
          style={{
            marginTop: "15px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#f9f9f9",
            whiteSpace: "pre-wrap",
          }}
        >
          {plan}
        </div>
      )}
    </div>
  );
}