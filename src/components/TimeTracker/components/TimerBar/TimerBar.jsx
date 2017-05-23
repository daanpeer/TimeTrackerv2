/* @flow */
import React from 'react'
import styled from 'styled-components'
import type { Timer } from '../../../../types/Timer'

const Container = styled.div`
  display: flex;
  margin-bottom: 10px;
  flex-direction: row;
`

const TimerBlock = styled.div`
  width: ${props => props.width}%;
  background-color: ${props => props.theme.timerColor(props.index)};
  height: 10px;
`

// @todo move these to a more central place
const TOTAL_DAY_TIME = 28800
const barWidth = time => (time / TOTAL_DAY_TIME) * 100

const TimerBar = ({
  timers
}: {
  timers: Array<Timer>,
}) => (
  <Container>
    {timers.map((timer, key) => (
      <TimerBlock
        key={key}
        index={key}
        width={barWidth(timer.seconds)}
      />
    ))}
  </Container>
)

export { TimerBar as default }
