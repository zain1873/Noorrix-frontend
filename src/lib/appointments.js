// Test drive / appointment booking API client.
// See docs/BACKEND_APPOINTMENTS_REQUEST.md for the contract these calls expect.
// Unauthenticated — guests can book without an account, same as a normal enquiry form.

const BASE = process.env.NEXT_PUBLIC_API_URL;

/** Already-booked time slots for a given date (HH:MM strings), showroom-wide. */
export async function getAvailability(date) {
  try {
    const res = await fetch(`${BASE}/api/appointments/availability/?date=${date}`);
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data.booked_times) ? data.booked_times : [];
  } catch {
    return [];
  }
}

/**
 * @param {object} args
 * @param {string|number} args.car
 * @param {"test_drive"|"appointment"} args.type
 * @param {string} args.date   "YYYY-MM-DD"
 * @param {string} args.time   "HH:MM"
 * @param {string} args.name
 * @param {string} args.email
 * @param {string} args.phone
 */
export async function createAppointment({ car, type, date, time, name, email, phone }) {
  const res = await fetch(`${BASE}/api/appointments/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ car, type, date, time, name, email, phone }),
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error("Booking service is unavailable. Please try again later.");
  }

  // Someone else took this exact slot between the form loading and submitting.
  if (res.status === 409) {
    const err = new Error(data?.error || "This time slot has just been booked. Please pick another.");
    err.code = "SLOT_TAKEN";
    throw err;
  }

  if (!res.ok) {
    const message =
      data?.error ||
      (data?.errors && Object.values(data.errors).flat().join(" ")) ||
      "Could not book this appointment. Please try again.";
    throw new Error(message);
  }

  return data;
}
