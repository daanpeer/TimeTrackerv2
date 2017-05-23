/* @flow */
import firebase from '../../firebase'
import type { Timer } from '../../types/Timer'
import { diffInSeconds } from '../../helpers'

const database = firebase.database()
const timetracker = database.ref('timetracker')

const timers = database.ref('timetracker/timers')

export default class TimeTrackerStorage {
  onInitialTimers = (callback: (timers: ?{ [string]: Timer }, runningTimer: ?string) => void) => {
    timetracker.on('value', (ref) => {
      const data = ref.val()
      if (data === null) {
        return callback()
      }

      callback(data.timers, data.runningTimer)
    })
  }

  onTimerChanged = (callback: ({ [string]: Timer }) => void) => {
    timers.on('child_changed', (ref) => {
      const timer = { [ref.key]: ref.val() }
      callback(timer)
    })
  }

  onTimerAdded = (callback: ({ [string]: Timer }) => void) => {
    timers.on('child_added', (ref) => {
      const timer = { [ref.key]: ref.val() }
      callback(timer)
    })
  }

  addTimer = () => {
    timers.push({
      seconds: 0,
      startDate: null
    })
  }

  startTimer = (id: string, runningTimer: ?Timer) => {
    if (runningTimer !== undefined && runningTimer !== null) {
      let seconds
      if (runningTimer) {
        seconds = diffInSeconds(new Date(runningTimer.startDate || new Date()), new Date()) + runningTimer.seconds
      }

      database.ref(`timetracker/timers/${runningTimer.id}`).update({
        startDate: null,
        seconds: seconds === undefined ? seconds : runningTimer.seconds
      })
    }

    database.ref(`timetracker/timers/${id}`).update({
      startDate: new Date().toString()
    })

    database.ref('timetracker').update({
      runningTimer: id
    })
  }

  stopTimer = (id: string, timer: Timer) => {
    database.ref('timetracker').update({
      runningTimer: null
    })

    database.ref(`timetracker/timers/${id}`).update({
      startDate: null,
      seconds: diffInSeconds(new Date(timer.startDate), new Date()) + timer.seconds
    })
  }
}
