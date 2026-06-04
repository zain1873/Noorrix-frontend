import { Suspense } from "react";
import PaymentCancel from "@/views/PaymentCancel/PaymentCancel";

export const metadata = {
  title: "Payment Cancelled | Noorrix Motors",
  description: "Your vehicle reservation payment was cancelled.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <Suspense>
      <PaymentCancel />
    </Suspense>
  );
}
