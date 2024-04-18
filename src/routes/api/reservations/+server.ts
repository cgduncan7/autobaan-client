import { AUTOBAAN_AUTH, SERVER_URL } from '$env/static/private'
import type { RequestHandler } from '../$types'

export const GET: RequestHandler = async ({ fetch }) => {
  return await fetch(`${SERVER_URL}/reservations`,
    {
      headers: {
        Authorization: AUTOBAAN_AUTH
      },
    },
  )
}

export const POST: RequestHandler = async ({ fetch, request }) => {
  const body = await request.json()
  return await fetch(`${SERVER_URL}/reservations`,
  {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        Authorization: AUTOBAAN_AUTH,
        'Content-Type': 'application/json'
      },
    },
  )
}