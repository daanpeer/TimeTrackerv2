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

  updateTime = (id: string, timer: Timer, resetDate: bool = false) => {
    this.database.ref(`${this.timersRef}/${id}`).update({
      startDate: resetDate ? null : new Date(timer.startDate || new Date()),
      seconds: diffInSeconds(new Date(timer.startDate || new Date()), new Date()) + timer.seconds
    })
  }

  stopTimer = (id: string, timer: Timer) => {
    this.database.ref(`${this.timersRef}/${id}`).update({
      runningTimer: null
    })

    this.updateTime(id, timer, true)
  }
}
