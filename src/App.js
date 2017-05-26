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
  primaryColor: '#05668D',
  secondaryColor: '#028090',
  timerColor: (index: number) => {
    const colors = [
      '#06AED5',
      '#086788',
      '#F0C808',
      '#FFF1D0',
      '#DD1C1A'
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
