// Delivery request form API client — same conventions as lib/partExchange.js
// and lib/vehicleSourcing.js (direct fetch, DRF field-error shape on 400).

const BASE = process.env.NEXT_PUBLIC_API_URL;

// The form's "preferredDate" field maps to the backend's "preferred_date" —
// translate both the outgoing payload key and any incoming field-error key.
function toErrorKey(key) {
  return key === "preferred_date" ? "preferredDate" : key;
}

/**
 * @param {object} args
 * @param {string} args.name
 * @param {string} args.phone
 * @param {string} args.email
 * @param {string} args.vehicle
 * @param {string} args.address
 * @param {string} args.postcode
 * @param {string} [args.preferredDate] - ISO date string (YYYY-MM-DD)
 * @param {string} [args.notes]
 * @returns {Promise<string>} success message from the server
 */
export async function submitDelivery({ name, phone, email, vehicle, address, postcode, preferredDate, notes }) {
  const res = await fetch(`${BASE}/api/delivery/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      phone,
      email,
      vehicle,
      address,
      postcode,
      preferred_date: preferredDate || null,
      notes,
    }),
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Something went wrong. Please try again.");
  }

  if (!res.ok || !data.success) {
    const err = new Error("Please fix the errors below and try again.");
    const rawErrors = data?.errors || {};
    err.fieldErrors = Object.fromEntries(
      Object.entries(rawErrors).map(([key, value]) => [toErrorKey(key), value])
    );
    throw err;
  }

  return data.message || "Thanks! We'll confirm your delivery details shortly.";
}
