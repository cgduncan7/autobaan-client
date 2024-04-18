import type { RequestHandler } from './$types'

export const POST: RequestHandler = async ({ fetch, request }) => {
  const fd = await request.formData()
  const body = {
    ownerId: fd.get('ownerId')?.toString(),
    startTime: fd.get('startTime')?.toString(),
    endTime: fd.get('endTime')?.toString(),
    opponentId: fd.get('opponentId')?.toString(),
    opponentName: fd.get('opponentName')?.toString(),
  }
  console.log(body)
  return await fetch('/api/reservations', { body: JSON.stringify(body) })
}