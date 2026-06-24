// Newsletter signup API client — same conventions as lib/appointments.js
// (direct fetch to the Django backend, DRF field-error shape on 400).

const BASE = process.env.NEXT_PUBLIC_API_URL;

export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

/**
 * @param {string} email
 * @returns {Promise<string>} success message from the server
 */
export async function subscribeNewsletter(email) {
  const res = await fetch(`${BASE}/api/newsletter/subscribe/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Something went wrong. Please try again.");
  }

  if (!res.ok || !data.success) {
    const firstError = data?.errors?.email?.[0];
    throw new Error(firstError || "Something went wrong. Please try again.");
  }

  return data.message || "Thanks for subscribing!";
}
