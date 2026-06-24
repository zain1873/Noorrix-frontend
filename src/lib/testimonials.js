// Customer testimonials API client — public read, public submit (no login).
// Same conventions as lib/cars.js (GET) and lib/appointments.js (POST + DRF errors).

const BASE = process.env.NEXT_PUBLIC_API_URL;

/** Approved testimonials only — the backend filters out pending/rejected ones. */
export async function getTestimonials() {
  try {
    const res = await fetch(`${BASE}/api/testimonials/`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

/**
 * @param {object} args
 * @param {string} args.name
 * @param {string} [args.role]
 * @param {number} args.rating  1-5
 * @param {string} args.review
 * @param {File}   [args.photo]
 */
export async function submitTestimonial({ name, role, rating, review, photo }) {
  const fd = new FormData();
  fd.append("name", name);
  if (role) fd.append("role", role);
  fd.append("rating", String(rating));
  fd.append("review", review);
  if (photo) fd.append("photo", photo);

  const res = await fetch(`${BASE}/api/testimonials/submit/`, {
    method: "POST",
    body: fd,
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Could not submit your review. Please try again later.");
  }

  if (!res.ok) {
    const err = new Error("Please fix the errors below and try again.");
    err.fieldErrors = data || {};
    throw err;
  }

  return data; // { success: true, message }
}
