import { DateTime, Duration } from 'luxon'

export function isExpired(datetime: DateTime, durationSecond: number) {
    return DateTime.now().diff(datetime).valueOf() > durationSecond * 1000
}

export function isReached(checkpoint: string) {
    return new Date() > convertDateTimeToDate(parseDateTime(checkpoint))
}

export function getCurrentUtcString(): string {
    const current = formatDateTime(getCurrentUtcDateTime())
    return current === null ? '' : current
}

export function getCurrentLocalDateTime() {
    return DateTime.local()
}

export function getCurrentUtcDateTime() {
    return DateTime.utc()
}

export function convertToUtcDateTime(datetime: DateTime) {
    return datetime.toUTC()
}

export function formatDateTime(datetime: DateTime) {
    return datetime.toISO()
}

export function parseDateTime(str: string) {
    return DateTime.fromISO(str)
}

export function convertDateTimeToDate(datetime: DateTime) {
    return datetime.toJSDate()
}

export function convertDateToDateTime(date: Date) {
    return DateTime.fromJSDate(date)
}

export function convertDateTimeToLocal(datetime: DateTime) {
    return datetime.toLocal()
}

export function plusSecond(datetime: DateTime, seconds: number) {
    return datetime.plus(Duration.fromObject({ seconds: seconds }))
}

export function plusDay(datetime: DateTime, days: number) {
    return datetime.plus(Duration.fromObject({ days: days }))
}
