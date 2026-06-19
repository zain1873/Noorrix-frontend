"use client";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavourites } from "../../context/FavouritesContext";

/** Heart toggle reused on every car card + the detail page image slider. */
export default function HeartButton({ car, className = "", size = 18 }) {
  const { isFavourite, toggleFavourite } = useFavourites();
  const fav = isFavourite(car.id);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavourite(car);
  };

  return (
    <button
      type="button"
      className={`favourite-btn ${className}`}
      onClick={handleClick}
      aria-label={fav ? "Remove from favourites" : "Save to favourites"}
      aria-pressed={fav}
    >
      {fav ? <FaHeart color="#e8000f" size={size} /> : <FaRegHeart size={size} />}
    </button>
  );
}
