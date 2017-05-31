/* @flow */
import React, { Component } from 'react'
import styled from 'styled-components'
import Time from './Time'
import Button from '../../../Button'
import Spinner from '../../../Spinner'

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #efefef;
  height: 50px;
  line-height: 50px;
  padding-left: 5px;
  padding-right: 5px;
  align-items: center;
`

const ActionContainer = styled.div`
  display: flex;
  margin-right: 5px;
`

const Spacing = styled.div`
  width: 10px;
`

const TimeContainer = styled.div`
  display: flex;
  flex-direction: row;
`

type TimerProps = {
  running: bool,
  seconds: number,
  onStartTimer: () => void,
  onStopTimer: () => void,
  onTick: () => void,
  onDeleteTimer: () => void,
};

export default class Timer extends Component {
  props: TimerProps
  state: {
    seconds: number,
  }

  timer: ?number

  constructor (props: TimerProps) {
    super(props)

    this.timer = undefined
    this.initTimer(props)
  }

  componentWillReceiveProps (newProps: TimerProps) {
    this.setState({
      seconds: newProps.seconds
    })

    this.initTimer(newProps)
  }

  clearTimers = () => {
    clearTimeout(this.timer)
    this.timer = undefined
  }

  initTimer = (props: { running: bool }) => {
    if (props.running && this.timer === undefined) {
      this.timer = setInterval(() => {
        this.props.onTick()
      }, 1000)
    } else if (!props.running) {
      this.clearTimers()
    }
  }

  componentWillUnmount () {
    this.clearTimers()
  }

  handleToggleTimer = () => {
    if (this.props.running) {
      this.props.onStopTimer()
      return
    }
    this.props.onStartTimer()
  }

  render () {
    return (
      <Container>
        <Time seconds={this.props.seconds} />
        <ActionContainer>
          <Button onClick={this.props.onDeleteTimer} danger>
            <span aria-label='delete' role='img'>🗑️ </span> Delete
          </Button>
          <Spacing />
          <Button onClick={this.handleToggleTimer}>
            <TimeContainer>
              {this.props.running ? `✋ Stop` : '🏁  Start' }&nbsp;
              <Spinner running={this.props.running} />
            </TimeContainer>
          </Button>
        </ActionContainer>
      </Container>
    )
  }
}
