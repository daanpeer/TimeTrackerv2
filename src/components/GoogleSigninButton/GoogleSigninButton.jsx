/* @flow */
import googleG from './google-g.png'
import styled from 'styled-components'

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

export { GoogleSigninButton as default }
