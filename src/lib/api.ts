const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status: number;
}

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };
  
  // Get token from cookie if available (client-side)
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((c) => c.startsWith("token="));
    if (tokenCookie) {
      const token = tokenCookie.split("=")[1];
      headers["Authorization"] = `Bearer ${token}`;
    }
  }
  
  return headers;
}

async function parseError(response: Response): Promise<ApiError> {
  const data = await response.json().catch(() => ({}));
  return {
    message: data.message || "An error occurred",
    errors: data.errors || {},
    status: response.status,
  };
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${baseUrl}${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getHeaders(),
      ...options.headers,
    },
    credentials: "include",
  });
  
  if (!response.ok) {
    throw await parseError(response);
  }
  
  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }
  
  return response.json() as Promise<T>;
}

export const api = {
  get: <T>(endpoint: string, params?: Record<string, string>) => {
    let url = endpoint;
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }
    return request<T>(url, { method: "GET" });
  },
  
  post: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    }),
  
  patch: <T>(endpoint: string, body?: unknown) =>
    request<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    }),
  
  delete: <T>(endpoint: string) =>
    request<T>(endpoint, { method: "DELETE" }),
};