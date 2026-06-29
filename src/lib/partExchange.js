// Part exchange / vehicle valuation form API client — same conventions as
// lib/appointments.js (direct fetch, DRF field-error shape on 400).

const BASE = process.env.NEXT_PUBLIC_API_URL;

/**
 * @param {object} args
 * @param {string} args.name
 * @param {string} args.phone
 * @param {string} args.email
 * @param {string} args.make
 * @param {string} args.model
 * @param {string} args.year
 * @param {string} args.mileage
 * @returns {Promise<string>} success message from the server
 */
export async function submitPartExchange({ name, phone, email, make, model, year, mileage }) {
  const res = await fetch(`${BASE}/api/part-exchange/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, email, make, model, year, mileage }),
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Something went wrong. Please try again.");
  }

  if (!res.ok || !data.success) {
    const err = new Error("Please fix the errors below and try again.");
    err.fieldErrors = data?.errors || {};
    throw err;
  }

  return data.message || "Thanks! We'll be in touch with a valuation shortly.";
}
