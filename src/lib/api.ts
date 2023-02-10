type FetcherParams = {
  url: string
  method: 'POST' | 'GET'
  body: Object
  json?: boolean
}

export const fetcher = async ({
  url,
  method,
  body,
  json = true,
}: FetcherParams) => {
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    throw new Error('API Error')
  }

  if (json) {
    return res.json()
  }
}

export const register = async (user) => {
  return fetcher({
    url: '/api/register',
    method: 'POST',
    body: user,
    json: false,
  })
}

export const signin = async (user) => {
  return fetcher({
    url: '/api/signin',
    method: 'POST',
    body: user,
    json: false,
  })
}
