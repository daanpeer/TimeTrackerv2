import styled from 'styled-components'

const Button = styled.a`
  background-color: ${props => props.theme.secondaryColor};
  border: 0px;
  border-radius: 3px;
  color: #fff;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 15px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  display: block;
`

export { Button as default }
