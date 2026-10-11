const API_BASE_URL = "/api/custom-items";

async function request(endpoint = "", options = {}) {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
    });
  } catch {
    throw new Error(
      "Unable to connect to the server. Please check your connection and try again.",
    );
  }

  const responseText = await response.text();
  let data = null;

  if (responseText) {
    try {
      data = JSON.parse(responseText);
    } catch {
      if (!response.ok) {
        throw new Error(
          `Server request failed (HTTP ${response.status}). Please try again.`,
        );
      }

      throw new Error("The server returned an invalid response.");
    }
  }

  if (!response.ok) {
    const errors = data?.errors;

    const message =
      (Array.isArray(errors) && errors.length > 0 ? errors.join(" ") : null) ||
      data?.message ||
      `Request failed (HTTP ${response.status}).`;

    throw new Error(message);
  }

  if (data === null) {
    throw new Error("The server returned an empty response.");
  }

  return data;
}

// GET all saved switches
export function getAllCustomItems() {
  return request();
}

// GET one saved switch
export function getCustomItemById(id) {
  return request(`/${id}`);
}

// POST a new switch
export function createCustomItem(config) {
  return request("", {
    method: "POST",
    body: JSON.stringify(config),
  });
}

// PUT an updated switch
export function updateCustomItem(id, config) {
  return request(`/${id}`, {
    method: "PUT",
    body: JSON.stringify(config),
  });
}

// DELETE a saved switch
export function deleteCustomItem(id) {
  return request(`/${id}`, {
    method: "DELETE",
  });
}
