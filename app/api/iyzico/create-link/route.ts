import { NextResponse } from "next/server";

// Basit: İyzico Link (manuel oluşturulmuş ödeme linki)
// İleride webhook ile premium işaretleyebilirsin.

export async function POST() {
  // Test için sabit link (sandbox panelden aldığın linki koyabilirsin)
  // Normalde İyzico panelinden "Pay with Link" oluşturuyorsun → URL geliyor
  const url =
    process.env.IYZICO_PAYMENT_LINK ||
    "https://sandbox-iyzico-pay-link.com/test";

  return NextResponse.json({ url });
}
