"use client";

import Link from "next/link";
import { Icon } from "@iconify/react";

export default function PaymentCancelPage() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full text-center p-8 rounded-2xl border border-black/10 dark:border-white/20">
        <Icon
          icon="mdi:close-circle"
          width={64}
          height={64}
          className="mx-auto text-red-500"
        />

        <h1 className="text-2xl font-semibold mt-4">
          Payment Cancelled
        </h1>

        <p className="text-dark/60 dark:text-white/60 mt-3">
          Your payment was cancelled.  
          No charges were made.
        </p>

        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 rounded-full bg-primary text-white hover:bg-dark transition"
        >
          Go Back Home
        </Link>
      </div>
    </section>
  );
}
