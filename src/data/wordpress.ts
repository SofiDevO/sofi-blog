const baseURL = `${import.meta.env.WPGRAPHQL_URL}`;

interface WPGraphQLParams {
  query?: string;
  variables?: object;
  headers?: object;
}



export async function wpquery<T>({ query, variables = {}, headers = {} }: WPGraphQLParams) {

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
  return data as T;
}
