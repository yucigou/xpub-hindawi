import React from 'react'
import { AbstractEditor, TitleEditor } from 'xpub-edit'
import {
  Menu,
  CheckboxGroup,
  YesOrNo,
  TextField,
  Supplementary,
} from '@pubsweet/ui'
import uploadFileFn from 'xpub-upload'
import { required, minChars, minSize } from 'xpub-validators'
import { AuthorList } from 'pubsweet-component-wizard/src/components'

import { declarations } from './'
import issueTypes from './issues-types'
import manuscriptTypes from './manuscript-types'

import { requiredBasedOnType } from './wizard-validators'

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

const journal = {
  label: 'Hindawi Faraday',
  value: 'hindawi-faraday',
}

const uploadFile = input => uploadFileFn(input)

export default {
  showProgress: true,
  formSectionKeys: ['metadata', 'declarations', 'conflicts', 'notes', 'files'],
  dispatchFunctions: [uploadFile],
  steps: [
    {
      label: 'Journal details',
      title: 'Journal & Field Selection',
      children: [
        {
          fieldId: 'metadata.journal',
          renderComponent: Menu,
          label: 'Journal',
          options: [journal],
          value: journal.value,
          validate: [required],
        },
        {
          fieldId: 'metadata.issue',
          renderComponent: Menu,
          label: 'Issue',
          options: issueTypes,
          validate: [required],
        },
      ],
    },
    {
      label: 'Pre-submission checklist',
      title: 'Pre-submission Checklist',
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
      title: 'Manuscript & Authors Details',
      subtitle:
        'Please provide the details of all the authors of this manuscript....',
      children: [
        {
          fieldId: 'metadata.title',
          renderComponent: TitleEditor,
          placeholder: 'Manuscript title',
          title: 'Manuscript title',
        },
        {
          fieldId: 'metadata.type',
          renderComponent: Menu,
          label: 'Manuscript type',
          options: manuscriptTypes,
          validate: [required],
        },
        {
          fieldId: 'metadata.abstract',
          renderComponent: AbstractEditor,
          title: 'Abstract',
          placeholder: 'Write an abstract',
          validate: [requiredBasedOnType],
        },
        {
          fieldId: 'authors',
          renderComponent: AuthorList,
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
      title: 'Manuscript Files Upload',
      children: [
        {
          fieldId: 'files.manuscripts',
          label: 'Main Manuscript',
          renderComponent: Supplementary,
        },
        {
          fieldId: 'files.supplementary',
          label: 'Supplemental Files',
          renderComponent: Supplementary,
        },
        {
          fieldId: 'files.coverLetter',
          label: 'Cover Letter',
          renderComponent: Supplementary,
        },
      ],
    },
  ],
}
