import { BASE_URL } from "./constants";

export const ErrorToast = (err) => {
    if (err.code === "ERR_NETWORK") toast.error(err.message);
    else toast.error(err?.response?.data.message);
};

async function apiRequest(options) {
    // destructure options
    const { endpoint, method = "GET", includeAuth = true, body = undefined } = options;

    // create  a new header
    const headers = new Headers();

    // create body
    let requestBody = null;
    if (body && typeof body === "object") {
        headers.append("Content-Type", "application/json");
        requestBody = JSON.stringify(body);
    }

    // add auth header
    if (includeAuth) {
        const token = localStorage.getItem("token");
        if (token) {
            headers.append("Authorization", `Bearer ${token}`);
        }
    }

    // create new url
    const url = new URL(endpoint, BASE_URL);
    // create request
    const request = new Request(url, {
        method,
        headers,
        body: requestBody,
    });

    const response = await fetch(request);

    return response;
}

export default apiRequest;
