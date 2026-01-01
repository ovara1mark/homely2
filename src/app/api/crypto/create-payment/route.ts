import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amountUSD, orderId, description, payCurrency } = await req.json();
    const cryptoCurrency = payCurrency || "eth";

    const res = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.NOWPAYMENTS_API_KEY!,
      },
      body: JSON.stringify({
        price_amount: amountUSD,
        price_currency: "usd",
        pay_currency: cryptoCurrency,
        order_id: orderId,
        order_description: description,
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success`,
        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-cancel`,
      }),
    });

    const data = await res.json();
    console.log("NOWPayments response:", data);

    // Return both invoice_url and crypto address if present
    return NextResponse.json({
      paymentUrl: data.invoice_url || null,
      pay_address: data.pay_address || null,
      pay_amount: data.pay_amount || null,
      pay_currency: data.pay_currency || null,
      network: data.network || null,
    });
  } catch (err) {
    console.error("Payment route error:", err);
    return NextResponse.json(
      {
        error: "Payment failed",
        details: err instanceof Error ? err.message : err,
      },
      { status: 500 }
    );
  }
}
