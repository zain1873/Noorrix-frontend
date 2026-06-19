import { Suspense } from "react";
import OurStock from "@/views/OurStock";
import { getCars, getFilters } from "@/lib/cars";

export const metadata = {
  title: "Our Stock | Noorrix Motors",
  description:
    "Browse the full range of quality used cars in stock at Noorrix Motors.",
};

export default async function Page() {
  // Server-fetch the inventory + filter options (ISR). All client-side filtering
  // then runs on this array inside OurStock — same logic as before.
  const [cars, filters] = await Promise.all([getCars(), getFilters()]);

  // OurStock uses useSearchParams() (to read filters from the Home hero filter),
  // which requires a Suspense boundary in Next.js to avoid build-time bailout errors.
  return (
    <Suspense fallback={null}>
      <OurStock cars={cars} filters={filters} />
    </Suspense>
  );
}
