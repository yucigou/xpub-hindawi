import React from 'react'
import { Icon, Button, th } from '@pubsweet/ui'
import styled from 'styled-components'

const NotFound = ({ history }) => (
  <Root>
    <div>
      <Icon size={6}>cloud-off</Icon>
    </div>
    <H2>The page cannot be found</H2>
    <H3>
      The page you are looking for might have been removed, had its name
      changed, or is temporarily unavailable.
    </H3>
    <Button onClick={history.goBack} primary>
      Back
    </Button>
  </Root>
)

export default NotFound

const Root = styled.div`
  margin: 0 auto;
  text-align: center;
  width: 90vw;
`
const H2 = styled.h2`
  font-size: ${th('fontSizeHeading2')};
`
const H3 = styled.h3`
  font-size: ${th('fontSizeHeading3')};
`
