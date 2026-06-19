import { notFound } from "next/navigation";
import CarsListing from "@/views/CarDetails/CarDetails";
import { getCar, getSimilar } from "@/lib/cars";

// URLs are "/cars/14-honda-city" — only the leading numeric id matters for the
// backend lookup; the slug after it is purely cosmetic/SEO.
const parseId = (raw) => raw.match(/^\d+/)?.[0] ?? raw;

export async function generateMetadata({ params }) {
  const { id } = await params;
  const car = await getCar(parseId(id));
  return {
    title: car ? `${car.title} | Noorrix Motors` : "Vehicle Details | Noorrix Motors",
    description: car
      ? `${car.title} — ${car.subtitle}. View full details, specification and photos at Noorrix Motors.`
      : `View full details, specification and photos for vehicle ${id} at Noorrix Motors.`,
  };
}

export default async function Page({ params }) {
  const { id } = await params;
  const numericId = parseId(id);
  const [car, similar] = await Promise.all([getCar(numericId), getSimilar(numericId)]);
  if (!car) notFound();
  return <CarsListing car={car} similar={similar} />;
}
