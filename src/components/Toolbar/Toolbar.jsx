import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  height: 50px;
  background-color: ${props => props.theme.primaryColor};
  width: 100%;
  color: #fff;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
`

class TimeTracker extends Component {
  render () {
    return (
      <Container>
        TimeTracker
      </Container>
    )
  }
}

export { TimeTracker as default }
