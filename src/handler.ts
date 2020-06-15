interface Discount {
  country: string
  discount: string
  amount: number
}

const discounts: { [country: string]: Discount } = {
  US: {
    country: 'US',
    discount: 'a1b2c3',
    amount: 15,
  },
}

export async function handleRequest(request: Request): Promise<Response> {
  const country = request.headers.get('cf-ipcountry')

  const defaultOptions: ResponseInit = {
    status: 200,
    headers: {
      'content-type': 'application/json',
    },
  }

  if (!country) {
    return new Response(JSON.stringify({}), { ...defaultOptions, status: 404 })
  }

  const discount = discounts[country]
  return new Response(JSON.stringify(discount), defaultOptions)
}
