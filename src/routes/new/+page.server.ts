import { error, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'
import dayjs from 'dayjs'

export const actions: Actions = {
  default: async ({ fetch, request }) => {
    const fd = await request.formData()
    const emptyStringToUndefined = (x: string | undefined): string | undefined => {
      if (x == null) return undefined
      if (x.length === 0) return undefined
      return x
    }
    const makeRecurring = fd.get('recurring')?.toString() === 'yes'

    let resp: Response
    if (makeRecurring) {
      const startDate = dayjs(fd.get('startTime')!.toString())
      const dayOfWeek = startDate.get('day') + 1 // Adding one because this is zero-based but server is one-based
      const timeStart = startDate.format('HH:mm')
      const endTime = emptyStringToUndefined(fd.get('endTime')?.toString())
      const timeEnd = endTime ? dayjs(endTime).format('HH:mm') : undefined
      const body = {
        ownerId: fd.get('ownerId')!.toString(),
        dayOfWeek,
        timeStart,
        timeEnd,
        opponentId: emptyStringToUndefined(fd.get('opponentId')?.toString()),
        opponentName: emptyStringToUndefined(fd.get('opponentName')?.toString()),
      }
      resp = await fetch('/api/recurring-reservations', { method: 'POST', body: JSON.stringify(body) })
    } else {
      const body = {
        ownerId: fd.get('ownerId')!.toString(),
        dateRangeStart: fd.get('startTime')!.toString(),
        dateRangeEnd: emptyStringToUndefined(fd.get('endTime')?.toString()),
        opponentId: emptyStringToUndefined(fd.get('opponentId')?.toString()),
        opponentName: emptyStringToUndefined(fd.get('opponentName')?.toString()),
      }
      resp = await fetch('/api/reservations', { method: 'POST', body: JSON.stringify(body) })
    }
    if (resp.ok) throw redirect(303, '/')
    throw error(500, 'Error creating reservation')
  }
}