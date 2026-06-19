import { apiFetch } from "./api";

const GUEST_KEY = "guest_favourites";

// ─── Backend (logged-in users) ─────────────────────────────────────────────

export async function getFavourites() {
  const res = await apiFetch("/api/favourites/");
  if (!res.ok) return [];
  return res.json();
}

export async function addFavourite(carId) {
  const res = await apiFetch("/api/favourites/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ car: carId }),
  });
  if (!res.ok) throw new Error("Could not save to favourites.");
  return res.json();
}

export async function removeFavourite(carId) {
  const res = await apiFetch(`/api/favourites/${carId}/`, { method: "DELETE" });
  if (!res.ok && res.status !== 204) throw new Error("Could not remove from favourites.");
}

// ─── Guest (logged-out) — localStorage only ────────────────────────────────

export function getGuestFavouriteIds() {
  try {
    const raw = localStorage.getItem(GUEST_KEY);
    const ids = raw ? JSON.parse(raw) : [];
    return Array.isArray(ids) ? ids : [];
  } catch {
    return [];
  }
}

export function setGuestFavouriteIds(ids) {
  try {
    localStorage.setItem(GUEST_KEY, JSON.stringify(ids));
  } catch {
    /* private browsing / storage disabled — favouriting just won't persist */
  }
}

export function clearGuestFavourites() {
  try {
    localStorage.removeItem(GUEST_KEY);
  } catch {}
}
