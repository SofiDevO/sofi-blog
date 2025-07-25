interface GraphQLResponse<T = any> {
  data?: T;
  errors?: Array<{
    message: string;
    locations?: Array<{ line: number; column: number }>;
    path?: Array<string | number>;
  }>;
}

interface RequestHeaders extends Record<string, string> {
  "Content-Type": string;
  Authorization?: string;
}

const baseURL = `${import.meta.env.WPGRAPHQL_URL}`;

/**
 * Makes a GraphQL request to WordPress
 * @param query - The GraphQL query string
 * @returns Promise containing the response data or empty object
 * @throws Error if the request fails or GraphQL errors are present
 */
export default async function graphqlReq<T = any>(query: string): Promise<T> {
  if (!baseURL) {
    throw new Error('WPGRAPHQL_URL environment variable is not set');
  }

  if (!query || typeof query !== 'string') {
    throw new Error('Query must be a non-empty string');
  }

  const url = new URL(baseURL);
  const headers: RequestHeaders = {
    "Content-Type": "application/json",
  };


  if (import.meta.env.WORDPRESS_AUTH_REFRESH_TOKEN) {
    headers.Authorization = `Bearer ${import.meta.env.WORDPRESS_AUTH_REFRESH_TOKEN}`;
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify({ query }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const resJson: GraphQLResponse<T> = await res.json();
    if (resJson.errors && resJson.errors.length > 0) {
      throw new Error(`GraphQL error: ${resJson.errors[0].message}`);
    }

    return resJson.data || ({} as T);
  } catch (error) {
    console.error('GraphQL request failed:', error);
    throw error;
  }
}
