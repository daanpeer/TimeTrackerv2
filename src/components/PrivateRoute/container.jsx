import React, { Component } from 'react'
import PrivateRouteComponent from './PrivateRoute'
import firebase from '../../firebase'

export default class PrivateRoute extends Component {
  state: {
    isAuthenticated: bool
  }

  constructor (props: Object) {
    super(props)

    this.state = {
      isAuthenticated: false,
      loading: true,
      user: undefined
    }
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user, loading: false, isAuthenticated: true })
      } else {
        this.setState({ loading: false, isAuthenticated: false })
      }
    })
  }

  render () {
    if (this.state.loading) {
      return null
    }

    return (<PrivateRouteComponent {...this.props} user={this.state.user} isAuthenticated={this.state.isAuthenticated} />)
  }
}
