import UsedCarsByBrand from "@/views/UsedCarsByBrand/UsedCarsByBrand";
import { getCarsByBrand } from "@/lib/cars";

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

export default async function Page({ params }) {
  const { brand } = await params;
  const cars = await getCarsByBrand(brand);
  return <UsedCarsByBrand brand={brand} cars={cars} />;
}
