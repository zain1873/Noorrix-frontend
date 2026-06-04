"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FiXCircle } from "react-icons/fi";

import Navbar from "../../components/Navbar/Navbar";
import NoorrixFooter from "../../components/Footer/Footer";
import "../PaymentComplete/PaymentComplete.css";

export default function PaymentCancel() {
  const searchParams = useSearchParams();
  const carId = searchParams.get("car");
  const amount = searchParams.get("amount");

  const retryHref =
    carId && amount
      ? `/checkout?amount=${amount}&car=${carId}`
      : carId
      ? `/cars/${carId}`
      : "/stock";

  return (
    <>
      <Navbar />
      <main className="pc-page">
        <div className="pc-card pc-card-fail">
          <div className="pc-badge pc-badge-fail">
            <FiXCircle className="pc-icon" />
          </div>
          <h1 className="pc-title">Payment cancelled</h1>
          <p className="pc-body">
            No payment was taken. You can try again or browse other vehicles whenever
            you&apos;re ready.
          </p>
          <div className="pc-actions">
            <Link href={retryHref} className="pc-btn pc-btn-primary">
              Try again
            </Link>
            <Link href="/stock" className="pc-btn pc-btn-outline">
              Browse vehicles
            </Link>
            <Link href="/" className="pc-btn pc-btn-outline">
              Back to home
            </Link>
          </div>
        </div>
      </main>
      <NoorrixFooter />
    </>
  );
}
