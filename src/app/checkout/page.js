import Checkout from "@/views/Checkout/Checkout";
import { getCar } from "@/lib/cars";
import { gbp } from "@/lib/format";

export const metadata = {
  title: "Reserve Your Vehicle | Noorrix Motors",
  description: "Securely reserve your chosen vehicle with a fully refundable deposit.",
};

export default async function Page({ searchParams }) {
  // searchParams is a promise in Next 16.
  const { amount, car: carId } = await searchParams;

  // Look the car up so we can show the title/price in the order summary.
  const car = carId ? await getCar(carId) : null;

  // The backend ignores the posted "amount" once a car id is given and charges
  // car.deposit_amount instead — show that authoritative figure rather than
  // whatever the link's query string happened to carry (which could be stale).
  const depositAmount = car?.deposit_amount ?? amount;

  return (
    <Checkout
      amount={depositAmount}
      carId={carId || ""}
      carTitle={car?.title || ""}
      carPrice={car ? gbp(car.price) : ""}
    />
  );
}
