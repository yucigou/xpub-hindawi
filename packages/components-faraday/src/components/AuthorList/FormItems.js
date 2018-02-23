import React from 'react'
import { required } from 'xpub-validators'
import styled, { withTheme, css } from 'styled-components'
import { TextField, Menu, ValidatedField, Icon } from '@pubsweet/ui'

export const ValidatedTextField = ({
  label,
  name,
  isRequired,
  validators = [],
}) => {
  const v = [isRequired && required, ...validators].filter(Boolean)
  return (
    <ValidatedTextFieldRoot>
      <StyledLabel>{label}</StyledLabel>
      <ValidatedField component={TextField} name={name} validate={v} />
    </ValidatedTextFieldRoot>
  )
}

export const MenuItem = ({ label, name, options }) => (
  <MenuItemRoot>
    <StyledLabel>{label}</StyledLabel>
    <ValidatedField
      component={input => <Menu {...input} options={options} />}
      name={name}
      validate={[required]}
    />
  </MenuItemRoot>
)

export const Label = ({ label, value }) => (
  <LabelRoot>
    <span>{label}</span>
    <span>{value}</span>
  </LabelRoot>
)

export const DragHandle = withTheme(({ theme }) => (
  <DragHandleRoot>
    <Icon color={theme.colorFurniture}>chevron_up</Icon>
    <Icon color={theme.colorFurniture} size={16}>
      menu
    </Icon>
    <Icon color={theme.colorFurniture}>chevron_down</Icon>
  </DragHandleRoot>
))

// #region styled-components
const defaultText = css`
  color: ${({ theme }) => theme.colorText};
  font-size: ${({ theme }) => theme.fontSizeBaseSmall};
  font-family: ${({ theme }) => theme.fontReading};
`

const ValidatedTextFieldRoot = styled.div`
  flex: 1;
  margin-right: 5px;
`

const MenuItemRoot = styled.div`
  flex: 1;
`

const StyledLabel = styled.span`
  ${defaultText};
  font-weight: 300;
  text-transform: uppercase;
`

const DragHandleRoot = styled.div`
  align-items: center;
  border-right: ${({ theme }) => theme.borderDefault};
  cursor: move;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const LabelRoot = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 5px;
  width: ${({ width }) => `${width || 150}px`};

  span:first-child {
    ${defaultText};
    font-weight: 300;
    overflow: hidden;
    text-transform: uppercase;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span:last-child {
    ${defaultText};
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`
// #endregion
