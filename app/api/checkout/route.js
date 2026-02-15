import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { amount, name, phone } = await req.json();

    const response = await fetch("https://api.paychangu.com/v1/checkout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYCHANGU_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        currency: "MWK",
        description: "Order payment",
        return_url: "https://rangebrothers.store/track",
        callback_url: "https://rangebrothers.store/api/webhook",
        customer: {
          name,
          phone,
        },
      }),
    });

    const data = await response.json();

    console.log("PayChangu:", data);

    return NextResponse.json({
      checkout_url: data?.data?.checkout_url,
      raw: data,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Payment failed" }, { status: 500 });
  }
}