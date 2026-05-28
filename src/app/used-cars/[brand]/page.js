import UsedCarsByBrand from "@/views/UsedCarsByBrand/UsedCarsByBrand";

export async function generateMetadata({ params }) {
  const { brand } = await params;
  const name = decodeURIComponent(brand)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
  return {
    title: `Used ${name} Cars for Sale | Noorrix Motors`,
    description: `Browse quality used ${name} cars in stock at Noorrix Motors.`,
  };
}

export default function Page() {
  // UsedCarsByBrand reads the :brand via useParams() from next/navigation.
  return <UsedCarsByBrand />;
}
