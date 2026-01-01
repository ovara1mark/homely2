import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amountUSD, payCurrency } = await req.json();

    const res = await fetch(
      `https://api.nowpayments.io/v1/estimate?amount=${amountUSD}&currency_from=usd&currency_to=${payCurrency}`,
      {
        headers: {
          "x-api-key": process.env.NOWPAYMENTS_API_KEY!,
        },
      }
    );

    const data = await res.json();

    return NextResponse.json({
      estimatedAmount: data.estimated_amount,
    });
  } catch {
    return NextResponse.json(
      { error: "Estimate failed" },
      { status: 500 }
    );
  }
}
