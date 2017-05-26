/* @flow */
import React, { Component } from 'react'
import styled from 'styled-components'
import Button from '../Button'
import TimerList from './components/TimerList'
import TimerBar from './components/TimerBar'
import type { Timer } from '../../types/Timer'
import { spinner } from '../../helpers'
import Toolbar from '../Toolbar'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

type TimeTrackerProps = {
  timers: Array<Timer>,
  onAddTimer: () => void,
  onStopTimer: (id: string) => void,
  onStartTimer: (id: string) => void,
  running: bool,
}

class TimeTracker extends Component {
  props: TimeTrackerProps

  static defaultProps = {
    timers: []
  }

  timer: ?number

  constructor (props: TimeTrackerProps) {
    super(props)

    this.initTimer(props)
  }

  initTimer = (props: { running: bool }) => {
    const title = 'TimeTracker'
    if (props.running) {
      if (this.timer) {
        return
      }

      this.timer = spinner((value) => {
        document.title = `${value} TimeTracker`
      }, 250)
    } else {
      if (this.timer !== undefined && this.timer !== null) {
        clearInterval(this.timer)
        this.timer = undefined
      }
      document.title = title
    }
  }

  componentWillReceiveProps (nextProps: Object) {
    this.initTimer(nextProps)
  }

  render () {
    const {
      timers,
      onStartTimer,
      onStopTimer,
      onAddTimer
    } = this.props

    return (
      <div>
        <Toolbar />
        <Container>
          {timers.length !== 0 && (
            <div>
              <TimerBar
                timers={timers}
              />
              <TimerList
                timers={timers}
                onStartTimer={onStartTimer}
                onStopTimer={onStopTimer}
              />
            </div>
          )}
          <Button onClick={onAddTimer}>Start a new timer</Button>
        </Container>
      </div>
    )
  }
}

export { TimeTracker as default }
