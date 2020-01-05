import React, { Component } from 'react'
import styled from 'styled-components'
import logo from '../cropped-logo.png'

const Wrapper = styled.div.attrs({
  className: 'navbar-brand'
})``

class Logo extends Component {
  render() {
    return (
      <Wrapper>
        <a href='/'>
          <img src={logo} width='200' height='80' alt='Site logo' />
        </a>
      </Wrapper>
    )
  }
}

export default Logo
