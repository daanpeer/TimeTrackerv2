/* @flow */
import React, { Component } from 'react'
import firebase from '../../firebase'
import styled from 'styled-components'
import googleG from './google-g.png'

const GoogleSigninButton = styled.button`
  border-radius: 2px;
  color: #757575;
  background-color: #fff;
  font-size: 14px;
  border: 0px;
  box-shadow: 1px 1px 3px #888888;
  padding: 20px;
  padding-left: 50px;
  background-image: url(${googleG});
  background-position: left;
  background-position-x: 10px;
  background-size: 30px;
  background-repeat: no-repeat;
  margin-top: 200px;
`

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
        <GoogleSigninButton onClick={this.handleAuthenticateWithGoogle}>Sign in with Google</GoogleSigninButton>
      </Container>
    )
  }
}
