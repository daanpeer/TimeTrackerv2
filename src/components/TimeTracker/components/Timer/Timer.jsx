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

const TimeContainer = styled.div`
  display: flex;
  flex-direction: row;
`

export default class Timer extends Component {
  props: {
    running: bool,
    seconds: number,
    onStartTimer: () => void,
    onStopTimer: () => void,
  }

  state: {
    seconds: number,
  }

  timer: ?number

  constructor (props: Object) {
    super(props)

    this.timer = undefined
    this.initTimer(props)

    this.state = {
      seconds: props.seconds
    }
  }

  componentWillReceiveProps (newProps: Object) {
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
        this.setState({
          seconds: this.state.seconds + 1
        })
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
        <Time seconds={this.state.seconds} />
        <Button>
          Delete
        </Button>
        <Button onClick={this.handleToggleTimer}>
          <TimeContainer>
            {this.props.running ? `Stop` : 'Start' }&nbsp;
            <Spinner running={this.props.running} />
          </TimeContainer>
        </Button>
      </Container>
    )
  }
}
