type MachineAssignmentEngineProps = {
  assignments: any[];
};

export default function MachineAssignmentEngine({
  assignments,
}: MachineAssignmentEngineProps) {
  function getStatusColor(
    status: string
  ) {
    switch (status) {
      case "Processing":
        return "#3b82f6";

      case "Complete":
        return "#10b981";

      default:
        return "#f59e0b";
    }
  }

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px",
        border: "1px solid #ddd",
        marginTop: "20px",
      }}
    >
      <h2>
        Machine Assignment Engine
      </h2>

      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <strong>
          Assignments Loaded:
        </strong>{" "}
        {assignments.length}
      </div>

      <table
        style={{
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>Washer</th>
            <th>Dryer</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {assignments.map(
            (assignment) => (
              <tr
                key={assignment.id}
              >
                <td>
                  {
                    assignment.washer_name
                  }
                </td>

                <td>
                  {
                    assignment.dryer_name
                  }
                </td>

                <td>
                  <span
                    style={{
                      color:
                        getStatusColor(
                          assignment.status
                        ),
                      fontWeight:
                        "bold",
                    }}
                  >
                    {
                      assignment.status
                    }
                  </span>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
