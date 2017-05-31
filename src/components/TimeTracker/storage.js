/* @flow */
import firebase from '../../firebase'
import type { Timer } from '../../types/Timer'
import { diffInSeconds } from '../../helpers'

export default class TimeTrackerStorage {
  uid: string
  timersRef: Object
  timetrackerRef: Object
  database: Object
  timerRef: (id: string) => Object

  constructor (uid: string) {
    this.uid = uid
    this.database = firebase.database()
    this.timetrackerRef = this.database.ref(`/timetracker/${this.uid}`)
    this.timersRef = this.database.ref(`/timetracker/${this.uid}/timers`)
    this.timerRef = (id) => this.database.ref(`/timetracker/${this.uid}/timers/${id}`)
  }

  onTimetrackerChange = (callback: (timers: ?{ [string]: Timer }, runningTimer: ?string) => void) => {
    this.timetrackerRef.on('value', (ref) => {
      const data = ref.val()
      if (data === null) {
        return callback()
      }

      callback(data.timers, data.runningTimer)
    })
  }

  stopTimer = (timetracker) => {
    if (!timetracker.runningTimer) {
      return timetracker
    }

    const runningTimer = timetracker.timers[timetracker.runningTimer]
    if (!runningTimer) {
      return timetracker
    }

    runningTimer.seconds = this.getSeconds(runningTimer)
    runningTimer.startDate = null

    return timetracker
  }

  getSeconds = (runningTimer) => {
    let addedTime = diffInSeconds(new Date(runningTimer.startDate || new Date()), new Date())
    return Math.floor((addedTime + runningTimer.seconds))
  }

  getTotalTime = (timetracker) => {
    return Object.keys(timetracker.timers)
      .map(key => timetracker.timers[key].seconds)
      .reduce((a, b) => a + b)
  }

  async addTimer () {
    await this.stopTimerTransaction()
    const timerKey = this.timersRef.push({
      seconds: 0,
      startDate: null
    }).key
    this.startTimerTransaction(timerKey)
  }

  async startTimerTransaction (id: string) {
    return this.timetrackerRef.transaction((timetracker) => {
      if (timetracker === null || !timetracker.timers || timetracker === undefined) {
        return
      }

      const newTimetracker = this.stopTimer(timetracker)
      const timer = newTimetracker.timers[id]
      timer.startDate = new Date().toString()
      newTimetracker.runningTimer = id

      return newTimetracker
    })
  }

  async deleteTimer (id: string) {
    // if this timer is running we need to stop it
    await this.stopTimerTransaction(id)
    this.timerRef(id).remove()
  }

  async updateTimerTransaction () {
    return this.timetrackerRef.transaction((timetracker) => {
      if (timetracker === null || !timetracker.runningTimer) {
        return timetracker
      }

      const runningTimer = timetracker.timers[timetracker.runningTimer]
      if (!runningTimer) {
        return timetracker
      }

      runningTimer.seconds = this.getSeconds(runningTimer)
      timetracker.totalTime = this.getTotalTime(timetracker)
      runningTimer.startDate = new Date().toString()

      return timetracker
    })
  }

  async stopTimerTransaction () {
    return this.timetrackerRef.transaction((timetracker) => {
      if (timetracker === null || !timetracker.timers || timetracker === undefined) {
        return
      }

      let newTimetracker = this.stopTimer(timetracker)
      newTimetracker.totalTime = this.getTotalTime(timetracker)

      return newTimetracker
    })
  }
}
