import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { amount, name, phone } = await req.json();

    console.log("Incoming request:", { amount, name, phone });

    const response = await fetch("https://api.paychangu.com/payment", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYCHANGU_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
        currency: "MWK",

        callback_url: "https://rangebrothers.store/track",
        return_url: "https://rangebrothers.store/track",

        customer: {
          name: name,
          phone: phone,
        },
      }),
    });

    const data = await response.json();

    console.log("PAYCHANGU RESPONSE:", data);

    // 🔥 IMPORTANT: check both keys
    if (data?.checkout_url || data?.authorization_url) {
      return NextResponse.json({
        checkout_url: data.checkout_url || data.authorization_url,
      });
    }

    return NextResponse.json(data, { status: 400 });

  } catch (error) {
    console.error("CHECKOUT ERROR:", error);
    return NextResponse.json({ error: "Payment failed" }, { status: 500 });
  }
}