type CartLifecycleBoardProps = {
  carts: any[];
};

export default function CartLifecycleBoard({
  carts,
}: CartLifecycleBoardProps) {
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
      <h2>Cart Lifecycle Board</h2>

      <div
        style={{
          marginBottom: "20px",
          padding: "10px",
          background: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <strong>
          Cart Records Loaded:
        </strong>{" "}
        {carts.length}
      </div>

      <table
        style={{
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>Cart</th>
            <th>Hotel</th>
            <th>Weight</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {carts.map((cart) => (
            <tr key={cart.id}>
              <td>
                {cart.cart_number}
              </td>

              <td>
                {cart.hotel_name}
              </td>

              <td>
                {cart.current_weight}
              </td>

              <td>
                {cart.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
``