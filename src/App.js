/* @flow */
import React from 'react'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'

import TimeTracker from './components/TimeTracker'
import Auth from './components/Auth'
import PrivateRoute from './components/PrivateRoute'

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

// eslint-disable-next-line
injectGlobal`
  body {
    margin: 0;
    font-family: Sans-Serif;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
`

const theme = {
  primaryColor: '#2980b9',
  secondaryColor: '#2980b9',
  timerColor: (index: number) => {
    const colors = [
      '#e74c3c',
      '#2980b9',
      '#e67e22',
      '#95a5a6',
      '#2c3e50'
    ]

    if (index < colors.length) {
      return colors[index]
    }

    return colors[index % colors.length]
  }
}

const App = () => (
  <ThemeProvider theme={theme}>
    <Container>
      <Router>
        <div>
          <Route exact path='/auth' component={Auth} />
          <PrivateRoute path='/' component={TimeTracker} />
        </div>
      </Router>
    </Container>
  </ThemeProvider>
)

export default App
