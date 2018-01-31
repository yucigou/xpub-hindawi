import React from 'react'
import { AbstractEditor, TitleEditor } from 'xpub-edit'
import { Menu, CheckboxGroup, YesOrNo, TextField } from '@pubsweet/ui'
import uploadFileFn from 'xpub-upload'
import { required, minChars, minSize } from 'xpub-validators'
import { Files } from 'pubsweet-component-wizard/src/components/'
import { AuthorList } from 'pubsweet-components-faraday/src/components'

import { declarations } from './'
import issueTypes from './issues-types'
import manuscriptTypes from './manuscript-types'
import {
  requiredBasedOnType,
  editModeEnabled,
  parseEmptyHtml,
} from './wizard-validators'

const min3Chars = minChars(3)
const declarationsMinSize = minSize(declarations.options.length)

const yesNoWithLabel = ({ label, ...rest }) => (
  <div>
    <label style={{ display: 'inline-block', marginBottom: 5, marginTop: 5 }}>
      {label}
    </label>
    <YesOrNo {...rest} />
  </div>
)
const Spacing = () => <div style={{ width: '100%', height: '15px' }} />
const Label = ({ label }) => (
  <label
    style={{ display: 'inline-block', marginTop: '15px', marginBottom: '5px' }}
  >
    <b>{label}</b>
  </label>
)
const journal = {
  label: 'Hindawi Faraday',
  value: 'hindawi-faraday',
}

const uploadFile = input => uploadFileFn(input)

export default {
  showProgress: true,
  formSectionKeys: [
    'metadata',
    'declarations',
    'conflicts',
    'files',
    'authors',
  ],
  submissionRedirect: '/confirmation-page',
  dispatchFunctions: [uploadFile],
  steps: [
    {
      label: 'Journal details',
      title: '1. Journal & Field Selection',
      children: [
        {
          fieldId: 'label-Journal',
          renderComponent: Label,
          label: 'Journal',
        },
        {
          fieldId: 'metadata.journal',
          renderComponent: Menu,
          options: [journal],
          value: journal.value,
          validate: [required],
        },
        {
          fieldId: 'label-Issue',
          renderComponent: Label,
          label: 'Issue',
        },
        {
          fieldId: 'metadata.issue',
          renderComponent: Menu,
          options: issueTypes,
          validate: [required],
        },
      ],
    },
    {
      label: 'Pre-submission checklist',
      title: '2. Pre-submission Checklist',
      subtitle:
        'Before moving forward make sure you have all the needed details prepared by reviewing and checking off the items on this list.',
      children: [
        {
          fieldId: 'declarations',
          renderComponent: CheckboxGroup,
          options: declarations.options,
          validate: [required, declarationsMinSize],
        },
      ],
    },
    {
      label: 'Manuscript & Authors Details',
      title: '3. Manuscript & Authors Details',
      subtitle:
        'Please provide the details of all the authors of this manuscript....',
      children: [
        {
          fieldId: 'metadata.title',
          renderComponent: TitleEditor,
          placeholder: 'Manuscript title',
          title: 'Manuscript title',
          validate: [parseEmptyHtml],
        },
        {
          fieldId: 'spacing-title',
          renderComponent: Spacing,
        },
        {
          fieldId: 'label-manuscriptType',
          renderComponent: Label,
          label: 'Manuscript Type',
        },
        {
          fieldId: 'metadata.type',
          renderComponent: Menu,
          options: manuscriptTypes,
          validate: [required],
        },
        {
          fieldId: 'spacing-type',
          renderComponent: Spacing,
        },
        {
          fieldId: 'metadata.abstract',
          renderComponent: AbstractEditor,
          title: 'Abstract',
          placeholder: 'Write an abstract',
          validate: [requiredBasedOnType],
        },
        {
          fieldId: 'spacing-abstract',
          renderComponent: Spacing,
        },
        {
          fieldId: 'authors',
          renderComponent: AuthorList,
          validate: [required],
        },
        {
          fieldId: 'editMode',
          renderComponent: Spacing,
          validate: [editModeEnabled],
        },
        {
          fieldId: 'conflicts.hasConflicts',
          renderComponent: yesNoWithLabel,
          label: 'Is there a potential conflict of interest?',
          validate: [required],
        },
        {
          dependsOn: {
            field: 'conflicts.hasConflicts',
            condition: 'yes',
          },
          fieldId: 'conflicts.message',
          renderComponent: TextField,
          label: 'Conflict of interest details',
          validate: [required, min3Chars],
        },
      ],
    },
    {
      label: 'Files upload',
      title: '4. Manuscript Files Upload',
      children: [
        {
          fieldId: 'file-upload',
          renderComponent: Files,
        },
        // {
        //   fieldId: 'label-manuscript',
        //   renderComponent: Label,
        //   label: 'Main Manuscript',
        // },
        // {
        //   fieldId: 'files.manuscripts',
        //   label: 'Main Manuscript',
        //   renderComponent: Supplementary,
        // },
        // {
        //   fieldId: 'label-supplementary',
        //   renderComponent: Label,
        //   label: 'Supplemental Files',
        // },
        // {
        //   fieldId: 'files.supplementary',
        //   label: 'Supplemental Files',
        //   renderComponent: Supplementary,
        // },
        // {
        //   fieldId: 'label-cover',
        //   renderComponent: Label,
        //   label: 'Cover Letter',
        // },
        // {
        //   fieldId: 'files.coverLetter',
        //   label: 'Cover Letter',
        //   renderComponent: Supplementary,
        // },
      ],
    },
  ],
}
