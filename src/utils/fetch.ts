type FetcherOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: Record<string, unknown>;
};

const buildQueryParams = (params: Record<string, unknown>): string => {
  const query = new URLSearchParams();
  for (const key in params) {
    if (params[key] !== undefined) {
      query.append(key, String(params[key]));
    }
  }
  return query.toString();
};

export const request = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
  { body }: FetcherOptions
): Promise<T> => {
  const API_URL = import.meta.env.VITE_API_URL;

  let finalUrl = `${API_URL}/${url}`;
  const headers = {
    "Content-Type": "application/json",
  };

  const fetchOptions: RequestInit = {
    method,
    headers,
  };

  if (method === "GET" && body) {
    const queryParams = buildQueryParams(body);
    finalUrl = `${finalUrl}?${queryParams}`;
  } else if (body) {
    fetchOptions.body = JSON.stringify(body);
  }

  const response = await fetch(finalUrl, fetchOptions);

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response.json();
};
