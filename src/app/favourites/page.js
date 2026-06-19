import Favourites from "@/views/Favourites/Favourites";

export const metadata = {
  title: "Your Favourites | Noorrix Motors",
  description: "Cars you've saved at Noorrix Motors.",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <Favourites />;
}
