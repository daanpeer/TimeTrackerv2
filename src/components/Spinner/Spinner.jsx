/* @flow */
import React, { Component } from 'react'
import { spinner } from '../../helpers'

export default class Spinner extends Component {
  state: {
    spinner: string,
  }

  spinner: ?number

  constructor (props: Object) {
    super(props)

    this.state = {
      spinner: '⠋'
    }

    this.spinner = undefined
    this.initTimer(props)
  }

  clearTimers = () => {
    clearTimeout(this.spinner)
    this.spinner = undefined
  }

  initTimer = (props: { running: bool }) => {
    if (props.running && this.spinner === undefined) {
      this.spinner = spinner((value) => {
        this.setState({
          spinner: value
        })
      }, 250)
    } else if (!props.running) {
      this.clearTimers()
    }
  }

  componentWillUnmount () {
    this.clearTimers()
  }

  componentWillReceiveProps (nextProps: Object) {
    this.initTimer(nextProps)
  }

  render () {
    if (!this.props.running) return null

    return (<div>{this.state.spinner}</div>)
  }
}
