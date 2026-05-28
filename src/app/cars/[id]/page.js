import CarsListing from "@/views/CarDetails/CarDetails";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Vehicle Details | Noorrix Motors`,
    description: `View full details, specification and photos for vehicle ${id} at Noorrix Motors.`,
  };
}

export default function Page() {
  // CarsListing reads the :id via useParams() from next/navigation.
  return <CarsListing />;
}
