// Cars API client — the single source of truth for every car.
// Base URL comes from NEXT_PUBLIC_API_URL (see .env.local), same as AuthContext.
// These are public (unauthenticated) endpoints, so they use a plain fetch rather
// than the auth wrapper in ./api.js.
//
// All fetches are wrapped in try/catch and return a safe fallback ([] or null) on
// failure, so a page still renders (empty state) — and `next build` never crashes —
// if the backend is unreachable at build time or runtime.

const BASE = process.env.NEXT_PUBLIC_API_URL;

async function getJSON(path, { revalidate = 60, fallback = null } = {}) {
  try {
    const res = await fetch(`${BASE}${path}`, { next: { revalidate } });
    if (!res.ok) return fallback;
    return await res.json();
  } catch {
    return fallback;
  }
}

/** All available cars — the stock list. */
export const getCars = () => getJSON(`/api/cars/`, { fallback: [] });

/** Cars filtered by brand slug (e.g. "mercedes-benz") — Used Cars by Brand page. */
export const getCarsByBrand = (brand) =>
  getJSON(`/api/cars/?brand=${encodeURIComponent(brand)}`, { fallback: [] });

/** Single car, full detail (any status). Returns null if not found. */
export const getCar = (id) => getJSON(`/api/cars/${id}/`, { fallback: null });

/** Similar cars (same body type or make) for the detail-page slider. */
export const getSimilar = (id, limit = 6) =>
  getJSON(`/api/cars/${id}/similar/?limit=${limit}`, { fallback: [] });

/** Dynamic filter options (makes, makeModels, ranges…) derived from live inventory. */
export const getFilters = () => getJSON(`/api/filters/`, { revalidate: 300, fallback: null });
