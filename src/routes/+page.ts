import { plainToInstance } from 'class-transformer'
import { Reservation } from '$lib/reservations'
import type { PageLoad } from './$types'

export const load: PageLoad = async ({ fetch }): Promise<{ reservations: Reservation[] }> => {
  const response = await fetch('/api/reservations')
  const { data } = await response.json()
  if (data == null) {
    return { reservations: [] }
  }
  const reservations = data.map((d: unknown) => plainToInstance(Reservation, d))
  return {
    reservations,
  }
}