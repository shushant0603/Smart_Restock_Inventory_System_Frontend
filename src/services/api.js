const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

export async function request(path, options = {}) {
  const url = `${API_BASE}${path}`;

  // Get token from auth storage (zustand stores it in localStorage under auth-storage)
  let token = null;
  try {
    const authStoreStr = localStorage.getItem("auth-storage");
    if (authStoreStr) {
      const authStore = JSON.parse(authStoreStr);
      token = authStore?.state?.token;
    }
  } catch (e) {
    console.error("Failed to parse token from localStorage", e);
  }

  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(url, { ...options, headers });

  const contentType = res.headers.get("content-type") || "";

  if (!res.ok) {
    const data = contentType.includes("application/json")
      ? await res.json()
      : await res.text();

    throw new Error(
      (data && data.message) || JSON.stringify(data)
    );
  }

  if (contentType.includes("application/json")) {
    return res.json();
  }

  return res.text();
}