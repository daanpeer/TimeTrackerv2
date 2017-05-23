/* @flow */
import React, { Component } from 'react'
import TimeTrackerComponent from './TimeTracker'
import type { Timer } from '../../types'
import TimerStorage from './storage'

const timerStorage = new TimerStorage()

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

  constructor (props: Object) {
    super(props)

    this.state = {
      loading: true,
      running: false,
      timers: {},
      runningTimer: undefined
    }
  }

  componentDidMount () {
    timerStorage.onInitialTimers((timers, runningTimer) => {
      this.setState({ loading: false, timers, runningTimer })
    })

    timerStorage.onTimerAdded((timer) => {
      this.setState({
        timers: {
          ...this.state.timers,
          timer
        }
      })
    })

    timerStorage.onTimerChanged((timer) => {
      console.log('changed', timer)
      this.setState({
        timers: {
          ...this.state.timers,
          timer
        }
      })
    })
  }

  handleAddTimer = () => {
    timerStorage.addTimer()
  }

  handleStopTimer = (id: string) => {
    // get the timer from the object
    timerStorage.stopTimer(id, this.state.timers[id])
    this.setState({ runningTimer: null })
  }

  handleStartTimer = (id: string) => {
    let runningTimer
    if (this.state.runningTimer !== undefined && this.state.runningTimer !== null) {
      runningTimer = this.state.timers[this.state.runningTimer]
    }

    timerStorage.startTimer(id, runningTimer)

    this.setState({
      runningTimer: id
    })
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
      running={this.state.runningTimer !== undefined}
    />)
  }
}

export { TimeTracker as default }
