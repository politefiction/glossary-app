import React, { Component } from 'react'
import styled from 'styled-components'
import { Wrapper } from '../style'

const Heading = styled.h2.attrs({
  className: 'text-center'
})`
  margin-bottom: 15px;
`

const Paragraph = styled.p.attrs({
  className: 'text-justify m-4'
})``

class Main extends Component {
  render() {
    return (
      <Wrapper>
        <Heading>Welcome to My Web Dev Glossary!</Heading>
        <Paragraph>
          This is basically what it says it is: a glossary of web development
          terms. As a self-taught developer, I found my self repeatedly looking
          up a lot of concepts and jargon, and these were all scattered to the
          four internet winds, so I thought it would be helpful to concentrate
          what I learned in one place and maybe internalize these concepts in
          the process.
        </Paragraph>
        <Paragraph>
          Note, this is by no means a comprehensive glossary, nor do I claim the
          definitions given here to be all that definitive. I mostly just made
          this to get a deeper understanding of web development as a whole, have
          some practice working with Javascript frameworks/libraries, and not
          sound like an complete idiot during interviews. However, feel free to
          peruse if you think it'll help you. If you have feedback, I'll welcome
          that too once I include a way for you to provide feedback.
        </Paragraph>
      </Wrapper>
    )
  }
}

export default Main
