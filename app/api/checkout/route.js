import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const { amount, name, phone } = body;

    const response = await fetch("https://api.paychangu.com/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.PAYCHANGU_SECRET_KEY}`,
      },
      body: JSON.stringify({
        amount: amount,
        currency: "MWK",

        // IMPORTANT URLs
        callback_url: "https://rangebrothers.store/api/webhook",
        return_url: "https://rangebrothers.store/track",

        customer: {
          name: name,
          phone: phone,
        },
      }),
    });

    const data = await response.json();

    console.log("PAYCHANGU RAW RESPONSE:", data);

    // ✅ FIX: extract correct url
    if (data?.data?.checkout_url) {
      return NextResponse.json({
        checkout_url: data.data.checkout_url,
      });
    }

    // ❌ error fallback
    return NextResponse.json(
      { error: "Failed to create checkout session", raw: data },
      { status: 400 }
    );

  } catch (error) {
    console.error("CHECKOUT ERROR:", error);
    return NextResponse.json(
      { error: "Payment failed" },
      { status: 500 }
    );
  }
}