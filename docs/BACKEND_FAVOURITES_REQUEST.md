# Backend request: Favourites (heart/save car) feature

CONTEXT
-------
The frontend needs a "favourites" feature: a heart icon on every car card. When a
logged-in user clicks it, the car gets saved to their account. They can then view
all their saved cars from a "Favourites" link in the navbar. This must be tied to
the user's account (not just localStorage) so it's the same on any device.

Auth already works via the existing token system (Bearer access token, same as
other authenticated endpoints) — reuse that, do not invent a new auth scheme.

ENDPOINTS NEEDED
----------------

1. GET /api/favourites/
   - Auth required (401 if not logged in).
   - Returns the current user's favourited cars, in the SAME shape as
     GET /api/cars/ (id, title, subtitle, make, model, body_type, fuel,
     transmission, colour, year, engine_cc, mileage, price, monthly, mot_date,
     image_url, status).
   - Response: array of car objects (same as /api/cars/), or [] if none.

2. POST /api/favourites/
   - Auth required.
   - Body: { "car": <car_id> }
   - Adds the car to the current user's favourites.
   - Idempotent: if it's already favourited, return 200/201 without erroring
     (don't throw a duplicate/unique-constraint error to the client).
   - Response: { "success": true, "car": <car_id> }  (201 Created)
   - 404 if car_id doesn't exist.

3. DELETE /api/favourites/<car_id>/
   - Auth required.
   - Removes the car from the current user's favourites.
   - Idempotent: if it wasn't favourited, still return 200/204 (no error).
   - Response: 204 No Content (or { "success": true }).

4. Add `is_favourite` (boolean) to car responses for authenticated requests
   - GET /api/cars/        -> each car object gets `is_favourite: true|false`
   - GET /api/cars/<id>/   -> same
   - For anonymous (unauthenticated) requests, just omit it or send `false`.
   - This lets the frontend show the heart as already-filled on page load
     without an extra round trip per card.

NOTES
-----
- Field naming: snake_case, matching the rest of the Cars API (see the existing
  "Cars API — Frontend Integration Guide").
- No need for a separate "favourites count" endpoint — frontend can use
  `array.length` from GET /api/favourites/.
- A car that gets sold/reserved should still appear in favourites (don't filter
  it out) — frontend will show its current `status` badge.
