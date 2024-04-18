import { AUTOBAAN_AUTH, SERVER_URL } from "$env/static/private"
import type { RequestHandler } from "./$types"

export const DELETE: RequestHandler = async ({ params }) => {
  const { id } = params
  return await fetch(`${SERVER_URL}/reservations/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: AUTOBAAN_AUTH
      },
    },
  )
}