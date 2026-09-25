import { Suspense } from "react";
import OurStock from "@/views/OurStock";
import { getFilters } from "@/lib/cars";

export const metadata = {
  title: "Our Stock | Noorrix Motors",
  description:
    "Browse the full range of quality used cars in stock at Noorrix Motors.",
};

export default async function Page() {
  // Server-fetch only the filter options (ISR). The cars themselves are paged,
  // filtered and sorted by the API — OurStock fetches one page at a time in the
  // browser, driven by the URL query string.
  const filters = await getFilters();

  // OurStock uses useSearchParams() (filters, sort and page live in the URL),
  // which requires a Suspense boundary in Next.js to avoid build-time bailout errors.
  return (
    <Suspense fallback={null}>
      <OurStock filters={filters} />
    </Suspense>
  );
}
