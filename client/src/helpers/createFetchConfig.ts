interface FetchConfigProps<T> {
  method: string,
  body: T;
}

export const createFetchConfig = <T>({ method, body }: FetchConfigProps<T>) => {
  const config: RequestInit = {
    method,
    credentials: 'include',
    headers: {
      "Content-Type":  "application/json"
    },
    body: JSON.stringify(body)
  };

  return config;
};