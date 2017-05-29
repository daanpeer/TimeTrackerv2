/* @flow */
import React, { Component } from 'react'
import TimeTrackerComponent from './TimeTracker'
import type { Timer } from '../../types'
import TimerStorage from './storage'

class TimeTracker extends Component {
  handleStopTimer = () => {}
  handleStartTimer = () => {}
  handleAddTimer = () => {}

  state: {
    timers: { [string]: Timer },
    running: bool,
    loading: bool,
    runningTimer: ?string,
  }

  timerStorage: Object

  constructor (props: Object) {
    super(props)

    this.state = {
      loading: true,
      running: false,
      timers: {},
      runningTimer: undefined
    }

    this.timerStorage = new TimerStorage(props.user.uid)
  }

  updateTimetrackerState = (timers: { [string]: Timer }, runningTimer: string) => {
    this.setState({ loading: false, timers, runningTimer })
  }

  componentDidMount () {
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden &&
          this.state.runningTimer !== undefined &&
          this.state.runningTimer !== null) {
        const timer = this.state.timers[this.state.runningTimer]
        if (timer) {
          this.timerStorage.updateTime(this.state.runningTimer, timer)
        }
      }
    })
    this.timerStorage.onTimetrackerChange(this.updateTimetrackerState)
  }

  handleAddTimer = () => {
    this.timerStorage.addTimer()
  }

  handleStopTimer = (id: string) => {
    // get the timer from the object
    this.timerStorage.stopTimer(id, this.state.timers[id])
    this.setState({ runningTimer: null })
  }

  handleStartTimer = (id: string) => {
    let runningTimer
    if (this.state.runningTimer !== undefined && this.state.runningTimer !== null) {
      runningTimer = this.state.timers[this.state.runningTimer]
    }

    this.timerStorage.startTimer(id, this.state.runningTimer, runningTimer)
    this.setState({
      runningTimer: id
    })
  }

  handleTick = (id: string) => {
    this.setState({
      timers: {
        ...this.state.timers,
        [id]: {
          ...this.state.timers[id],
          seconds: this.state.timers[id].seconds + 1
        }
      }
    })
  }

  handleDeleteTimer = (id: string) => {
    this.timerStorage.deleteTimer(id)
  }

  render () {
    if (this.state.loading) {
      return null
    }

    let timers
    if (this.state.timers) {
      timers = Object.keys(this.state.timers).map((id: string) => {
        return { id, ...this.state.timers[id] }
      })
    }

    return (<TimeTrackerComponent
      timers={timers}
      onStopTimer={this.handleStopTimer}
      onStartTimer={this.handleStartTimer}
      onAddTimer={this.handleAddTimer}
      onDeleteTimer={this.handleDeleteTimer}
      onTick={this.handleTick}
      running={this.state.runningTimer !== undefined}
    />)
  }
}

export { TimeTracker as default }
