async function apiRequest(options) {
  const {
    endpoint,
    method = "GET",
    includeAuth = true,
    body = undefined,
  } = options;

  const headers = new Headers();
  let requestBody = body;

  if (body && typeof body === "object") {
    headers.append("Content-Type", "application/json");
    requestBody = JSON.stringify(body);
  }

  if (includeAuth && localStorage.getItem("accessToken")) {
    headers.append(
      "Authorization",
      `Bearer ${localStorage.getItem("accessToken")}`
    );
  }

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const url = new URL(endpoint, baseUrl);

  try {
    const response = await fetch(url, { method, headers, body: requestBody });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! Status: ${response.status}`
      );
    }

    const contentType = response.headers.get("Content-Type");
    if (contentType && contentType.includes("application/json")) {
      return await response.json();
    }
    return response;
  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
}

export default apiRequest;
