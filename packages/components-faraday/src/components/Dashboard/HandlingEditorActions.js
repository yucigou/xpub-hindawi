import React from 'react'
import PropTypes from 'prop-types'
import { Icon, th } from '@pubsweet/ui'
import styled, { css, withTheme } from 'styled-components'
import { compose, getContext } from 'recompose'
import AssignEditor from './AssignEditor'

const HandlingEditorActions = ({ project, theme }) => (
  <Root>
    <HEActions>
      <Icon color={theme.colorPrimary}>refresh-cw</Icon>
      <Icon color={theme.colorPrimary}>x-circle</Icon>
      <AssignEditor collectionId={project.id} />
    </HEActions>
  </Root>
)

export default compose(getContext({ journal: PropTypes.object }), withTheme)(
  HandlingEditorActions,
)

// #region styled-components
const defaultText = css`
  color: ${th('colorText')};
  font-family: ${th('fontReading')};
  font-size: ${th('fontSizeBaseSmall')};
`

const Root = styled.div``

const HEActions = styled.div`
  ${defaultText};
  text-transform: uppercase;
  cursor: pointer;
  margin-left: ${th('subGridUnit')};
  span {
    margin-left: ${th('subGridUnit')};
    &:hover {
      svg {
        opacity: 0.8;
      }
    }
  }
`
// #endregion
