const baseURL = `${import.meta.env.WPGRAPHQL_URL}`;

interface WPGraphQLParams {
  query?: string;
  variables?: object;
  headers?: object;
}



export async function wpquery<T>({ query, variables = {}, headers = {} }: WPGraphQLParams): Promise<T> {

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
    return {} as T;
  }
  const { data } = await res.json();
  return data as T;
};
