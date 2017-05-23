/* @flow */
import React from 'react'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'

import Toolbar from './components/Toolbar'
import TimeTracker from './components/TimeTracker'

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
      <Toolbar />
      <TimeTracker />
    </Container>
  </ThemeProvider>
)

export default App
