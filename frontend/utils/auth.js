export function getAuthToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("mosque_finder_token");
}

export function setAuthToken(token) {
  if (typeof window === "undefined") return;
  localStorage.setItem("mosque_finder_token", token);
}

export function clearAuthToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("mosque_finder_token");
}
