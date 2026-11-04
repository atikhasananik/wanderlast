const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export function apiUrl(path = "") {
  if (!API_BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  const baseUrl = API_BASE_URL.endsWith("/") ? API_BASE_URL : `${API_BASE_URL}/`;
  return new URL(path.replace(/^\/+/, ""), baseUrl).toString();
}
