const baseURL = `${import.meta.env.WPGRAPHQL_URL}`;

interface WPGraphQLParams {
  query?: string;
  variables?: object;
  headers?: object;
}

/**
 * Executes a GraphQL query against the WordPress GraphQL API.
 *
 * @param {WPGraphQLParams} params - The parameters for the GraphQL query.
 * @param {string} params.query - The GraphQL query string.
 * @param {object} [params.variables={}] - The variables for the query.
 * @param {object} [params.headers={}] - Additional headers for the request.
 * @returns {Promise<object>} - The data returned from the GraphQL API, or an empty object if the request fails.
 */

export async function wpquery({ query, variables = {}, headers = {} }: WPGraphQLParams) {

  const res = await fetch(baseURL, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });
  if (!res.ok) {
    return {};
  }
  const { data } = await res.json();
  return data;
}
