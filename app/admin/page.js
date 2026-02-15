"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadOrders = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Error loading orders");
      return;
    }

    setOrders(data || []);
  };

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Error updating status");
      return;
    }

    loadOrders();
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h1 style={{ color: "#1dbf73", marginBottom: "10px" }}>Admin Orders</h1>
      <p style={{ color: "#aaa", marginBottom: "25px" }}>
        Update order status so customers can track progress.
      </p>

      <button
        onClick={loadOrders}
        style={{
          padding: "10px 18px",
          background: "#1dbf73",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "600",
          marginBottom: "20px",
        }}
      >
        {loading ? "Refreshing..." : "Refresh Orders"}
      </button>

      {orders.length === 0 ? (
        <p style={{ color: "#aaa" }}>No orders yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "14px" }}>
          {orders.map((o) => (
            <div
              key={o.id}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                padding: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <div style={{ fontWeight: "700" }}>{o.customer_name}</div>
                  <div style={{ color: "#aaa" }}>{o.phone}</div>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#1dbf73", fontWeight: "700" }}>
                    {o.tracking_code}
                  </div>
                  <div style={{ color: "#aaa" }}>Status: {o.status}</div>
                </div>
              </div>

              <div style={{ marginTop: "10px", color: "#ddd" }}>
                {o.order_details}
              </div>

              <div
                style={{
                  marginTop: "12px",
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <StatusBtn
                  label="pending"
                  active={o.status === "pending"}
                  onClick={() => updateStatus(o.id, "pending")}
                />
                <StatusBtn
                  label="shipped"
                  active={o.status === "shipped"}
                  onClick={() => updateStatus(o.id, "shipped")}
                />
                <StatusBtn
                  label="delivered"
                  active={o.status === "delivered"}
                  onClick={() => updateStatus(o.id, "delivered")}
                />
                <StatusBtn
                  label="canceled"
                  active={o.status === "canceled"}
                  onClick={() => updateStatus(o.id, "canceled")}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function StatusBtn({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "8px 14px",
        borderRadius: "999px",
        border: active ? "2px solid #1dbf73" : "1px solid rgba(255,255,255,0.18)",
        background: active ? "#1dbf73" : "transparent",
        color: active ? "#02130d" : "white",
        cursor: "pointer",
        fontWeight: "600",
      }}
    >
      {label}
    </button>
  );
}