const baseURL = import.meta.env.WPGRAPHQL_URL;
const { SECRET_USER, SECRET_PASSWORD } = import.meta.env;

interface WPGraphQLParams {
  query: string; 
  variables?: Record<string, unknown>;
}

export async function wpquery({ query, variables = {} }: WPGraphQLParams): Promise<any> {
  if (!baseURL || !SECRET_USER || !SECRET_PASSWORD) {
    throw new Error("API credentials or URL are missing.");
  }

  const headers = new Headers({
    "Content-Type": "application/json",
    Authorization: `Basic ${btoa(`${SECRET_USER}:${SECRET_PASSWORD}`)}`,
  });

  try {
    const res = await fetch(baseURL, {
      method: "POST",
      headers,
      body: JSON.stringify({ query, variables }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Request failed with status ${res.status}: ${errorText}`);
    }

    const response = await res.json();
    if (!response.data) {
      throw new Error("No data returned from the API.");
    }

    return response.data;
  } catch (error) {
    console.error("GraphQL Query Error:", error);
    throw error;
  }
}
