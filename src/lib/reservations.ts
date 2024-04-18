import { Exclude, Transform, TransformationType } from 'class-transformer'
import dayjs, { Dayjs } from 'dayjs'

export class Reservation {
	id!: string
	
	ownerId!: string

	@Transform(({ value, type }) => {
		switch (type) {
			case TransformationType.PLAIN_TO_CLASS:
				return dayjs(value)
			case TransformationType.CLASS_TO_PLAIN:
				return value.format()
			default:
				return value
		}
	})
	dateRangeStart!: Dayjs

	@Transform(({ value, type }) => {
		switch (type) {
			case TransformationType.PLAIN_TO_CLASS:
				return dayjs(value)
			case TransformationType.CLASS_TO_PLAIN:
				return value.format()
			default:
				return value
		}
	})
	dateRangeEnd!: Dayjs
	
	opponentId!: string
	
	opponentName!: string
	
	waitListed!: boolean
	
	waitingListId!: number

	@Exclude()
	formatDate(d: Dayjs) {
		return d.format('DD MMM HH:mm')
	}

	@Exclude()
	getTimeFrame() {
		const endTime = this.dateRangeStart.add(45, 'minutes').format('HH:mm')
		return `${this.dateRangeStart.format('ddd DD MMM HH:mm')} - ${endTime}`
	}
}