/* @flow */
import React from 'react'
import styled from 'styled-components'
import { formatTime } from '../../../../../helpers.js'

const Container = styled.div`
`

const Time = ({ seconds }: { seconds: number }) => (
  <Container>
    {formatTime(seconds)}
  </Container>
)

export { Time as default }
