/**
 * Authenticated fetch wrapper.
 *
 * - Attaches Authorization: Bearer <access_token> to every request.
 * - On 401: silently refreshes the access token and retries once.
 * - On second 401: lets attemptRefresh handle logout and returns the failed response.
 *
 * Usage:
 *   import { apiFetch } from "@/lib/api";
 *   const res = await apiFetch("/api/v1/some/endpoint/", { method: "POST", ... });
 */

import { getAccessToken, attemptRefresh } from "@/context/AuthContext";

const API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export async function apiFetch(path, options = {}) {
  const url = path.startsWith("http") ? path : `${API}${path}`;

  const makeRequest = (token) =>
    fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

  let res = await makeRequest(getAccessToken());

  if (res.status === 401) {
    const newToken = await attemptRefresh();
    if (newToken) {
      res = await makeRequest(newToken);
    }
    // If newToken is null, attemptRefresh already called logout.
    // Return the 401 response so the caller can handle it if needed.
  }

  return res;
}
