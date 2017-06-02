/* @flow */
import React, { Component } from 'react'
import styled from 'styled-components'
import Spinner from 'react-spinkit'
import Time from './Time'
import Button from '../../../Button'
import './timer.css'

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

  renderRunning = () => {
    if (this.props.running) {
      return (
        <TimeContainer>
          ✋ Stop
          <Spinner className='timer-spinner' name='ball-scale-ripple' color='white' />
        </TimeContainer>
      )
    }

    return (<TimeContainer>🏁  Start</TimeContainer>)
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
            {this.renderRunning()}
          </Button>
        </ActionContainer>
      </Container>
    )
  }
}
