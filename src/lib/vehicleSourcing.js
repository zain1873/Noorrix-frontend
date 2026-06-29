// Vehicle sourcing form API client — same conventions as lib/partExchange.js
// (direct fetch, DRF field-error shape on 400).

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
 * @param {string} args.budget
 * @param {string} [args.notes]
 * @returns {Promise<string>} success message from the server
 */
export async function submitVehicleSourcing({ name, phone, email, make, model, year, mileage, budget, notes }) {
  const res = await fetch(`${BASE}/api/vehicle-sourcing/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone, email, make, model, year, mileage, budget, notes }),
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

  return data.message || "Thanks! Our sourcing team will be in touch with the best matches for your requirements.";
}
