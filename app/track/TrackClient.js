"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useSearchParams } from "next/navigation";

export default function TrackClient() {
  const [code, setCode] = useState("");
  const [order, setOrder] = useState(null);

  const searchParams = useSearchParams();

  const fetchOrder = async (trackingCode) => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("tracking_code", trackingCode)
      .single();

    if (error) {
      alert("Order not found");
      setOrder(null);
      return;
    }

    setOrder(data);
  };

  useEffect(() => {
    const urlCode = searchParams.get("code");
    if (urlCode) {
      setCode(urlCode);
      fetchOrder(urlCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    if (!code) return;
    fetchOrder(code);
  };

  return (
    <div style={{ padding: "40px", color: "white", textAlign: "center" }}>
      <h1 style={{ color: "#1dbf73" }}>Track Your Order</h1>

      <input
        type="text"
        placeholder="Enter tracking code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        style={{
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #1dbf73",
          marginRight: "10px",
          width: "250px",
          background: "#02130d",
          color: "white",
        }}
      />

      <button
        onClick={handleSearch}
        style={{
          padding: "12px 24px",
          background: "#1dbf73",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
        }}
      >
        Track
      </button>

      {order && (
        <div
          style={{
            marginTop: "40px",
            background: "rgba(255,255,255,0.03)",
            padding: "25px",
            borderRadius: "12px",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <h2 style={{ color: "#1dbf73" }}>Status: {order.status}</h2>
          <p style={{ marginTop: "10px" }}>{order.order_details}</p>
          <p style={{ marginTop: "5px", color: "#aaa" }}>
            {order.customer_name}
          </p>
          <p style={{ marginTop: "10px", color: "#888" }}>
            Tracking Code: {order.tracking_code}
          </p>
        </div>
      )}
    </div>
  );
}