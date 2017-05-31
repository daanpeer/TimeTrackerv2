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
  }

  timerStorage: Object

  constructor (props: Object) {
    super(props)

    this.state = {
      loading: true,
      running: false,
      timers: {}
    }

    this.timerStorage = new TimerStorage(props.user.uid)
  }

  updateTimetrackerState = (timers: { [string]: Timer }) => {
    this.setState({ loading: false, timers })
  }

  componentDidMount () {
    document.addEventListener('visibilitychange', () => {
      this.timerStorage.updateTimerTransaction()
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
    />)
  }
}
