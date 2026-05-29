import PaymentComplete from "@/views/PaymentComplete/PaymentComplete";

export const metadata = {
  title: "Payment Confirmation | Noorrix Motors",
  description: "Confirmation of your vehicle reservation payment.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <PaymentComplete />;
}
