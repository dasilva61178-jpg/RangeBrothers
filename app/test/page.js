"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function TestPage() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    console.log("Button clicked...");

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .limit(5);

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      alert(error.message);
      return;
    }

    setOrders(data);
  };

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>Supabase Test</h1>

      <button
        onClick={loadOrders}
        style={{
          padding: "10px 20px",
          background: "#1dbf73",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          marginBottom: "20px"
        }}
      >
        Load Orders
      </button>

      <pre>
        {JSON.stringify(orders, null, 2)}
      </pre>
    </div>
  );
}