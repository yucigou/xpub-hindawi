import React from 'react'
import { get, head } from 'lodash'
import { Icon, th } from '@pubsweet/ui'
import styled, { css, withTheme } from 'styled-components'
import { compose, withHandlers } from 'recompose'
import AssignEditor from './AssignEditor'

const HandlingEditorActions = ({ project, theme, getHandlingEditor }) => {
  const handlingEditor = getHandlingEditor()
  return (
    <Root>
      <HEActions>
        {handlingEditor ? (
          <HEActions>
            <HEName>{get(handlingEditor, 'name')}</HEName>
            {!handlingEditor.hasAnswer && (
              <HEActions>
                <Icon color={theme.colorPrimary}>refresh-cw</Icon>
                <Icon color={theme.colorPrimary}>x-circle</Icon>
              </HEActions>
            )}
          </HEActions>
        ) : (
          <AssignEditor collectionId={project.id} />
        )}
      </HEActions>
    </Root>
  )
}

export default compose(
  withTheme,
  withHandlers({
    getHandlingEditor: ({ project }) => () => {
      const assignedEditors = get(project, 'assignedPeople')
      if (assignedEditors && assignedEditors.length) {
        return head(
          assignedEditors.filter(
            editor =>
              !editor.hasAnswer || (editor.hasAnswer && editor.isAccepted),
          ),
        )
      }
      return null
    },
  }),
)(HandlingEditorActions)

// #region styled-components
const defaultText = css`
  color: ${th('colorText')};
  font-family: ${th('fontReading')};
  font-size: ${th('fontSizeBaseSmall')};
`

const Root = styled.div`
  margin-left: ${th('gridUnit')};
`

const HEName = styled.div``

const HEActions = styled.div`
  ${defaultText};
  text-transform: uppercase;
  display: flex;
  align-items: center;
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
