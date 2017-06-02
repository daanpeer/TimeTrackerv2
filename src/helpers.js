/* @flow */
export const padZero = (number: number): string => {
  if (number < 10) {
    return `0${number}`
  }
  return `${number}`
}

export const formatTime = (time: number): string => {
  const h = Math.floor(time / 3600)
  const m = Math.floor((time % 3600) / 60)
  const s = Math.floor(time - (h * 3600) - (m * 60))
  if (h < 1) {
    return `${padZero(m)}:${padZero(s)}`
  }
  return `${padZero(h)}:${padZero(m)}:${padZero(s)}`
}

export const diffInSeconds = (earlier: Date, later: ?Date): number => {
  if (!later) {
    later = new Date()
  }
  return (later - earlier) / 1000
}
