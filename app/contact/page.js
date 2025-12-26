export default function Contact() {
  return (
    <div style={{
      maxWidth: "900px",
      margin: "0 auto",
      padding: "60px 20px",
      lineHeight: "1.7"
    }}>
      
      <h1 style={{
        fontSize: "42px",
        color: "#1dbf73",
        marginBottom: "20px",
        textAlign: "center"
      }}>
        Contact Us
      </h1>

      <p style={{
        fontSize: "18px",
        textAlign: "center",
        color: "#cbd7d0",
        marginBottom: "40px"
      }}>
        Have a question or want to place an order?  
        Reach out anytime — we respond FAST.
      </p>

      <div style={{
        background: "rgba(255,255,255,0.03)",
        padding: "30px",
        borderRadius: "16px",
        border: "1px solid rgba(255,255,255,0.08)",
        textAlign: "center"
      }}>

        <p style={{ fontSize: "20px", marginBottom: "10px" }}>
          📞 Phone / WhatsApp:
        </p>
        <p style={{ fontSize: "24px", color: "#1dbf73", fontWeight: "bold" }}>
          0882 267 019
        </p>

        <a
          href="https://wa.me/265882267019"
          style={{
            display: "inline-block",
            marginTop: "30px",
            backgroundColor: "#1dbf73",
            padding: "14px 30px",
            borderRadius: "999px",
            color: "#02130d",
            fontSize: "18px",
            fontWeight: "600",
            textDecoration: "none",
            boxShadow: "0 8px 20px rgba(29,191,115,0.4)"
          }}
        >
          Chat on WhatsApp
        </a>

      </div>

    </div>
  );
}
