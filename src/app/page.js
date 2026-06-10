import Home from "@/views/Home";

export const metadata = {
  title: "Noorrix Motors | Quality Used Cars UK",
  description:
    "Browse quality used cars at Noorrix Motors. Part exchange, warranty, servicing and nationwide delivery.",
};

const BASE = process.env.NEXT_PUBLIC_API_URL?.trim();

async function fetchFAQs() {
  try {
    const res = await fetch(`${BASE}/api/faqs/`, { next: { revalidate: 60 } });
    return res.ok ? res.json() : [];
  } catch {
    return [];
  }
}

export default async function Page() {
  const faqs = await fetchFAQs();
  return <Home faqs={faqs} />;
}
