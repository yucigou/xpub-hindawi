import React from 'react'
import PropTypes from 'prop-types'
import { get, isEmpty } from 'lodash'
import styled from 'styled-components'
import { Button, Icon } from '@pubsweet/ui'
import { compose, getContext } from 'recompose'

import { parseVersion, getFilesURL, downloadAll } from './utils'

const DashboardCard = ({
  deleteProject,
  history,
  project,
  version,
  showAbstractModal,
  journal,
  ...rest
}) => {
  const { submitted, title, type, version: vers } = parseVersion(version)
  const files = getFilesURL(get(version, 'files'))
  const status = get(project, 'status') || 'Draft'
  const hasFiles = !isEmpty(files)
  const abstract = get(version, 'metadata.abstract')
  const metadata = get(version, 'metadata')
  return (
    <Card>
      <ListView>
        <Left>
          <Title
            dangerouslySetInnerHTML={{ __html: title }} // eslint-disable-line
          />
          <ManuscriptInfo>
            <div>
              <Status>{status}</Status>
              <DateField>{submitted || ''}</DateField>
            </div>
            <div>
              <Version>{`v${vers} - `}</Version>
              <ManuscriptId>{`ID ${version.id.split('-')[0]}`}</ManuscriptId>
              <ManuscriptType>{type}</ManuscriptType>
            </div>
          </ManuscriptInfo>
        </Left>
        <Right>
          <ClickableIcon
            disabled={!hasFiles}
            onClick={() => (hasFiles ? downloadAll(files) : null)}
          >
            <Icon>download</Icon>
          </ClickableIcon>
          <ClickableIcon onClick={() => deleteProject(project)}>
            <Icon>trash-2</Icon>
          </ClickableIcon>
          <ClickableIcon>
            <Icon>more-horizontal</Icon>
          </ClickableIcon>
          <Details
            onClick={() =>
              history.push(
                `/projects/${project.id}/versions/${version.id}/submit`,
              )
            }
          >
            Details
            <Icon color="#667080">chevron-right</Icon>
          </Details>
        </Right>
      </ListView>
      <DetailsView>
        <LeftDetails>
          <JournalTitle>{journal.metadata.nameText}</JournalTitle>
          <Issue>
            {journal.issueTypes.find(t => t.value === metadata.issue).label}
          </Issue>
          {get(version, 'authors') && (
            <Authors>
              <span>Authors:</span>
              <AuthorList>
                {version.authors
                  .map(({ firstName, lastName }) => `${firstName} ${lastName}`)
                  .join(', ')}
              </AuthorList>
            </Authors>
          )}
          <PreviewContainer>
            {abstract && (
              <ClickableIconContainer onClick={showAbstractModal(metadata)}>
                <Icon color="#667080" size={18}>
                  eye
                </Icon>
                <span>Abstract</span>
              </ClickableIconContainer>
            )}
            <ClickableIconContainer>
              <Icon color="#667080" size={18}>
                eye
              </Icon>
              <span>Cover letter</span>
            </ClickableIconContainer>
          </PreviewContainer>
        </LeftDetails>
        <RightDetails>
          <div>
            <Label>Handling editor</Label>
            <ActionButtons>ASSIGN</ActionButtons>
          </div>
          <div>
            <Label>Reviewers</Label>
            <ActionButtons>INVITE</ActionButtons>
          </div>
        </RightDetails>
      </DetailsView>
    </Card>
  )
}

export default compose(getContext({ journal: PropTypes.object }))(DashboardCard)

// #region styled-components
const PreviewContainer = styled.div`
  display: flex;
  margin-top: 18px;
`

const AuthorList = styled.span`
  color: #667080;
  font-family: Helvetica;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  white-space: nowrap;
  max-width: 400px;
  width: 400px;
`

const Authors = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-top: 15px;

  span:first-child {
    color: #667080;
    font-family: Helvetica;
    font-size: 12px;
    margin-right: 8px;
    text-align: left;
    text-transform: uppercase;
  }
`

const ActionButtons = styled(Button)`
  align-items: center;
  background-color: #667080;
  display: flex;
  height: 20px;
  padding: 4px 8px;
  font-family: Helvetica;
  font-size: 12px;
  text-align: center;
  color: #ffffff;
`

const LeftDetails = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
  justify-content: flex-start;
  padding: 10px 20px;
`

const RightDetails = styled.div`
  display: flex;
  flex: 2;
  flex-direction: column;

  div {
    align-items: center;
    display: flex;
    flex-direction: row;
    margin: 6px 0;
  }
`

const Label = styled.span`
  color: #667080;
  font-family: Helvetica;
  font-size: 12px;
  text-align: left;
  text-transform: uppercase;
  width: 150px;
`

const JournalTitle = styled.span`
  color: #667080;
  font-family: Helvetica;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
`

const Issue = styled.span`
  color: #667080;
  font-family: Helvetica;
  font-size: 14px;
  text-align: left;
`

const DetailsView = styled.div`
  align-items: center;
  border-top: 1px solid #667080;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

const ListView = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`

const ManuscriptId = styled.span`
  color: #667080;
  font-family: Helvetica;
  font-size: 12px;
  margin-left: 8px;
  text-align: left;
  text-decoration: underline;
  text-transform: uppercase;
`

const Version = styled.span`
  color: #667080;
  font-family: Helvetica;
  font-size: 13px;
  text-align: left;
`
const Details = styled.div`
  align-items: center;
  color: #667080;
  cursor: pointer;
  display: flex;
  font-family: Helvetica;
  font-size: 14px;
  margin-left: 8px;
  text-decoration: underline;
  text-align: center;
`

const ClickableIcon = styled.div`
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  margin: 0 7px;

  svg {
    stroke: ${({ disabled }) => (disabled ? '#eee' : '#667080')};
  }
`

const Card = styled.div`
  align-items: center;
  border: 1px solid #667080;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 10px;
`

const Right = styled.div`
  align-items: center;
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 15px;
`

const Left = styled.div`
  border-right: 1px solid #667080;
  display: flex;
  flex-direction: column;
  flex: 5;
  margin: 10px 0;
  padding: 0 10px;
`

const ManuscriptInfo = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`

const ManuscriptType = styled.div`
  border: 1px solid #667080;
  color: #667080;
  font-family: Helvetica;
  font-size: 12px;
  font-weight: bold;
  padding: 6px 4px;
  margin-left: 10px;
  text-align: left;
  text-transform: uppercase;
`

const Title = styled.span`
  color: #667080;
  font-family: Helvetica;
  font-size: 18px;
  text-align: left;
`

const Status = styled.div`
  border: 1px solid #667080;
  color: #667080;
  font-family: Helvetica;
  font-size: 12px;
  font-weight: bold;
  text-align: left;
  margin: 0.5em 0;
  padding: 0.2em 0.5em;
  text-transform: uppercase;
`

const DateField = styled.span`
  color: #667080;
  font-family: Helvetica;
  font-size: 13px;
  margin: 0 8px;
  text-align: left;
`

const ClickableIconContainer = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  margin-right: 8px;

  span:last-child {
    color: #667080;
    font-family: Helvetica;
    font-size: 14px;
    margin-left: 8px;
    text-align: left;
    text-decoration: underline;
  }
`
// #endregion
