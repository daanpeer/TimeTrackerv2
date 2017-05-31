/* @flow */
import firebase from '../../firebase'
import type { Timer } from '../../types/Timer'
import { diffInSeconds } from '../../helpers'

export default class TimeTrackerStorage {
  uid: string
  timersRef: string
  timetrackerRef: string
  database: Object

  constructor (uid: string) {
    this.uid = uid
    this.database = firebase.database()
    this.timetrackerRef = `/timetracker/${this.uid}`
    this.timersRef = `${this.timetrackerRef}/timers`
  }

  onTimetrackerChange = (callback: (timers: ?{ [string]: Timer }, runningTimer: ?string) => void) => {
    this.database.ref(this.timetrackerRef).on('value', (ref) => {
      const data = ref.val()
      if (data === null) {
        return callback()
      }

      callback(data.timers, data.runningTimer)
    })
  }

  addTimer = () => {
    this.database.ref(this.timersRef).push({
      seconds: 0,
      startDate: null
    })
  }

  startTimer = (id: string, runningTimerId: string, runningTimer: ?Timer) => {
    if (runningTimer !== null && runningTimer !== undefined) {
      this.stopTimer(runningTimerId, runningTimer, true)
    }

    this.database.ref(`${this.timersRef}/${id}`).update({
      startDate: new Date().toString()
    })

    this.database.ref(`${this.timetrackerRef}`).update({
      runningTimer: id
    })
  }

  updateTime = (id: string, timer: Timer) => {
    let addedTime = diffInSeconds(new Date(timer.startDate || new Date()), new Date())

    const params = {
      seconds: (addedTime + timer.seconds),
      startDate: new Date().toString()
    }

    this.database.ref(`${this.timersRef}/${id}`).update(params)
  }

  deleteTimer = (id: string) => {
    this.database.ref(`${this.timersRef}/${id}`).remove()
  }

  stopTimer = (id: string, timer: Timer) => {
    this.updateTime(id, timer)

    // unset the running timer
    this.database.ref(`${this.timetrackerRef}`).update({
      runningTimer: null
    })

    this.database.ref(`${this.timersRef}/${id}`).update({
      startDate: null
    })
  }
}
