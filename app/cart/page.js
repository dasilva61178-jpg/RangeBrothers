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

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Payment failed" }, { status: 500 });
  }
}