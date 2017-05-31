/* @flow */
import React, { Component } from 'react'
import TimeTrackerComponent from './TimeTracker'
import type { Timer } from '../../types'
import TimerStorage from './storage'

export default class TimeTracker extends Component {
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
          this.timerStorage.updateTimerTransaction()
        }
      }
    })
    this.timerStorage.onTimetrackerChange(this.updateTimetrackerState)
  }

  handleAddTimer = () => {
    this.timerStorage.addTimer()
  }

  handleStopTimer = () => {
    this.timerStorage.stopTimerTransaction()
  }

  handleStartTimer = (id: string) => {
    this.timerStorage.startTimerTransaction(id)
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
