import React, { Component } from 'react'
import firebase from '../../firebase'
import Button from '../Button'

export default class Auth extends Component {
  handleAuthenticateWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider()

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        const token = result.credential.accessToken
        const user = result.user
        console.log(user, token)
      })
      .catch((error) => {
        console.log(error)
      })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        console.log(user)
      } else {
        // No user is signed in.
      }
    })
  }

  render () {
    return (
      <Button onClick={this.handleAuthenticateWithGoogle}>Sign in with Google</Button>
    )
  }
}
