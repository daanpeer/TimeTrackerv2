/* @flow */
import React, { Component } from 'react'
import styled from 'styled-components'
import Button from '../Button'
import TimerList from './components/TimerList'
import TimerBar from './components/TimerBar'
import type { Timer } from '../../types/Timer'
import Toolbar from '../Toolbar'

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const ActionContainer = styled.div`
  padding: 10px;
`

type TimeTrackerProps = {
  timers: Array<Timer>,
  onAddTimer: () => void,
  onStopTimer: (id: string) => void,
  onStartTimer: (id: string) => void,
  running: bool,
}

export default class TimeTracker extends Component {
  props: TimeTrackerProps

  static defaultProps = {
    timers: []
  }

  timer: ?number

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
          <ActionContainer>
            <Button onClick={onAddTimer}>
              <span aria-label='hourglass' role='img'>⌛</span>Start a new timer
            </Button>
          </ActionContainer>
        </Container>
      </div>
    )
  }
}
