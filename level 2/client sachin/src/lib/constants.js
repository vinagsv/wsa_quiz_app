export const API_VERSION = import.meta.env.VITE_API_VERSION;
export const BASE_URL = import.meta.env.MODE === "development" ? import.meta.env.VITE_API_BASE_URL : "/api/v2";