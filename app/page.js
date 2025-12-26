"use client";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
        background: "linear-gradient(180deg, #00140f, #00241a)",
      }}
    >
      {/* TITLE */}
      <h1
        className="fade-in"
        style={{
          fontSize: "60px",
          fontWeight: "700",
          color: "#1dbf73",
          marginBottom: "10px",
          textShadow: "0 0 25px rgba(29, 191, 115, 0.4)",
        }}
      >
        RangeBrothers
      </h1>

      {/* TAGLINE */}
      <p
        className="slide-up delay-1"
        style={{
          fontSize: "22px",
          color: "#b8e6d2",
          marginBottom: "25px",
          textAlign: "center",
          maxWidth: "750px",
        }}
      >
        Premium Smartphones Delivered Across Malawi.
      </p>

      {/* SUBTEXT */}
      <p
        className="slide-up delay-2"
        style={{
          fontSize: "18px",
          color: "#cce9df",
          marginBottom: "40px",
          textAlign: "center",
          maxWidth: "800px",
          lineHeight: "1.6",
        }}
      >
        We import brand-new iPhones, Samsung Galaxy, and Google Pixel devices
        directly from trusted suppliers — offering transparent MWK pricing,
        premium product quality, and fast WhatsApp ordering.
      </p>

      {/* CTA BUTTON */}
      <a
        className="fade-in delay-3"
        href="https://wa.me/265882267019?text=I'm%20interested%20in%20a%20phone"
        style={{
          padding: "16px 36px",
          background: "#1dbf73",
          color: "#011d14",
          fontSize: "20px",
          borderRadius: "40px",
          fontWeight: "600",
          textDecoration: "none",
          boxShadow: "0 0 20px rgba(29, 191, 115, 0.4)",
          transition: "0.3s ease",
        }}
      >
        Order on WhatsApp
      </a>
    </main>
  );
}

