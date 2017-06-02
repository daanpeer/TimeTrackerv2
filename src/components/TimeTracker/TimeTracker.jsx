/* @flow */
import React, { Component } from 'react'
import Spinner from 'react-spinkit'
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

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`

type TimeTrackerProps = {
  timers: Array<Timer>,
  loading: boolean,
  onAddTimer: () => void,
  onStopTimer: (id: string) => void,
  onStartTimer: (id: string) => void,
  onDeleteTimer: (id: string) => void,
  onTick: (id: string) => void,
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
      onAddTimer,
      onDeleteTimer,
      onTick,
      loading
    } = this.props

    return (
      <div>
        <Toolbar />
        {loading && (
          <LoaderContainer>
            <Spinner name='ball-triangle-path' />
          </LoaderContainer>
        )}

        {!loading && (
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
                  onDeleteTimer={onDeleteTimer}
                  onTick={onTick}
                />
              </div>
            )}
            <ActionContainer>
              <Button onClick={onAddTimer}>
                <span aria-label='hourglass' role='img'>⌛</span> Start a new timer
              </Button>
            </ActionContainer>
          </Container>
        )}
      </div>
    )
  }
}
