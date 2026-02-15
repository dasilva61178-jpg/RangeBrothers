import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { cart, total } = await req.json();

    const response = await fetch("https://api.paychangu.com/payment", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYCHANGU_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: total,
        currency: "MWK",
        email: "customer@email.com",
        callback_url: "https://rangebrothers.store/api/verify", // later
        return_url: "https://rangebrothers.store/success", // after payment
        metadata: {
          cart: cart,
        },
      }),
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Payment failed" }, { status: 500 });
  }
}