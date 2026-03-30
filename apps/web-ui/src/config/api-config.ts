export const API_URL =
  process.env.NEXT_PUBLIC_AUTH_API_URL || "http://localhost:5000/api";

export const getHeaders = (token: string | null) => ({
  Authorization: token ? `Bearer ${token}` : "",
  "Content-Type": "application/json",
});

export const handleApiError = (error: any) => {
  console.error("API Error:", error);
  const message =
    error.response?.data?.message ||
    error.message ||
    "An unexpected error occurred";
  return { error: message };
};
