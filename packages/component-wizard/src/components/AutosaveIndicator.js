import React from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { compose, withProps } from 'recompose'
// import { Icon, Spinner } from '@pubsweet/ui'
import { Icon } from '@pubsweet/ui'
import styled from 'styled-components'
import { getFormValues } from 'redux-form'

import Spinner from 'pubsweet-components-faraday/src/components/UIComponents/Spinner'
import { getAutosave } from '../redux/autosave'

const durationParser = lastUpdate => {
  const today = moment()
  const last = moment(lastUpdate)
  const duration = moment.duration(today.diff(last))
  return `Progress saved ${duration.humanize()} ago.`
}

const Indicator = ({
  isVisibile,
  progressText = 'Saving changes...',
  errorText = 'Changes not saved',
  successText,
  autosave: { isFetching, error, lastUpdate },
}) =>
  isVisibile ? (
    <Root>
      {isFetching && (
        <AutoSaveContainer>
          <Spinner icon="loader" size={16} />
          <Info>{progressText}</Info>
        </AutoSaveContainer>
      )}

      {!isFetching &&
        lastUpdate && (
          <AutoSaveContainer>
            <IconContainer>
              <Icon size={16}>check-circle</Icon>
            </IconContainer>
            <Info>{successText || durationParser(lastUpdate)}</Info>
          </AutoSaveContainer>
        )}
      {!isFetching &&
        error && (
          <AutoSaveContainer>
            <IconContainer>
              <Icon color="var(--color-danger)" size={16}>
                alert-triangle
              </Icon>
            </IconContainer>
            <Info error="var(--color-danger)" title={error}>
              {errorText}
            </Info>
          </AutoSaveContainer>
        )}
    </Root>
  ) : null

export default compose(
  connect((state, { formName }) => ({
    autosave: getAutosave(state),
    form: !!getFormValues(formName || 'wizard')(state),
  })),
  withProps(({ autosave: { isFetching, error, lastUpdate }, form }) => ({
    isVisibile: form && Boolean(isFetching || lastUpdate || error),
  })),
)(Indicator)

const Root = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
`
const AutoSaveContainer = styled.div`
  align-items: center;
  display: flex;
  padding: 5px;
`
const IconContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
`
const Info = styled.span`
  font-size: 12px;
  margin-left: 5px;
  color: ${({ error }) => error || ''};
`
