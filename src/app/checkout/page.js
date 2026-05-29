import Checkout from "@/views/Checkout/Checkout";
import { stockData } from "@/data/cars";

export const metadata = {
  title: "Reserve Your Vehicle | Noorrix Motors",
  description: "Securely reserve your chosen vehicle with a fully refundable deposit.",
};

export default async function Page({ searchParams }) {
  // searchParams is a promise in Next 16.
  const { amount, car: carId } = await searchParams;

  // Look the car up so we can show the title/price in the order summary.
  const car = carId ? stockData.find((c) => String(c.id) === String(carId)) : null;

  return (
    <Checkout
      amount={amount}
      carId={carId || ""}
      carTitle={car?.title || ""}
      carPrice={car?.total || ""}
    />
  );
}
