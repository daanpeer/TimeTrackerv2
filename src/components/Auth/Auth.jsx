/* @flow */
import React, { Component } from 'react'
import firebase from '../../firebase'
import styled from 'styled-components'
import GoogleSigninButton from '../GoogleSigninButton'

const Container = styled.div`
  display: flex;
  justify-content: center;
`

export default class Auth extends Component {
  state: {
    error: bool
  }

  constructor (props: Object) {
    super(props)

    this.state = {
      error: false
    }
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.history.push('/')
      }
    })
  }

  handleAuthenticateWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        this.props.history.push('/')
      })
      .catch(() => {
        this.setState({ error: true })
      })
  }

  render () {
    return (
      <Container>
        {this.state.error && (
          <p>Couldn't sign in for some reason :(</p>
        )}
        <GoogleSigninButton
          onClick={this.handleAuthenticateWithGoogle}
        >
          Sign in with Google
        </GoogleSigninButton>
      </Container>
    )
  }
}
