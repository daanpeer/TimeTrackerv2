/* @flow */
import React from 'react'
import styled from 'styled-components'
import TimerComponent from '../Timer'
import type { Timer } from '../../../../types/Timer'

const Container = styled.div`
`

const TimerList = ({
  timers,
  onStopTimer,
  onStartTimer
}: {
  timers: Array<Timer>,
  onStopTimer: (id: string) => void,
  onStartTimer: (id: string) => void
}) => (
  <Container>
    {timers.map((timer, key) => (
      <TimerComponent
        key={key}
        seconds={timer.seconds}
        running={timer.startDate !== undefined}
        onStartTimer={() => { onStartTimer(timer.id) }}
        onStopTimer={() => { onStopTimer(timer.id) }}
      />
    ))}
  </Container>
)

export { TimerList as default }
