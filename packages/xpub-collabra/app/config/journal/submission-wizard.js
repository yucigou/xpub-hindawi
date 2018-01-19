import React from 'react'
import { AbstractEditor, TitleEditor, NoteEditor } from 'xpub-edit'
import {
  Menu,
  CheckboxGroup,
  RadioGroup,
  TextField,
  Supplementary,
} from '@pubsweet/ui'
import uploadFileFn from 'xpub-upload'
import {
  required,
  minChars,
  maxChars,
  minSize,
  join,
  split,
} from 'xpub-validators'

import articleTypes from './article-types'
import articleSections from './article-sections'
import declarations from './declarations'

const minSize1 = minSize(1)
const minChars20 = minChars(20)
const minChars100 = minChars(100)
const maxChars500 = maxChars(500)
const maxChars5000 = maxChars(5000)
const joinComma = join(',')
const splitComma = split(',')

const DeclarationInput = ({ label, ...rest }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <label style={{ display: 'inline-block', marginTop: '15px' }}>
      {label}
    </label>{' '}
    <RadioGroup inline {...rest} />
  </div>
)
const Spacing = () => <div style={{ width: '100%', height: '30px' }} />
const Label = ({ label }) => (
  <label
    style={{ display: 'inline-block', marginTop: '15px', marginBottom: '5px' }}
  >
    <b>{label}</b>
  </label>
)
const SubLabel = ({ label }) => (
  <label
    style={{ display: 'inline-block', marginTop: '10px', marginBottom: '5px' }}
  >
    {label}
  </label>
)

const uploadFile = input => uploadFileFn(input)

export default {
  showProgress: false,
  submitText: 'Submit your manuscript',
  backText: 'Back',
  cancelText: 'Cancel',
  nextText: 'Next',
  formSectionKeys: [
    'metadata',
    'declarations',
    'suggestions',
    'notes',
    'files',
  ],
  dispatchFunctions: [uploadFile],
  steps: [
    {
      label: 'Submission information',
      title: 'Submission information',
      subtitle: `We have ingested your manuscript. To access your manuscript in an editor, please view manuscript page.
        <br/> To complete your submission, please answer the following questions. <br/>
        The answers will be automatically saved.`,
      children: [
        {
          fieldId: 'metadata.title',
          renderComponent: TitleEditor,
          placeholder: 'Title',
          title: 'Title',
          validate: [required, minChars20, maxChars500],
        },
        {
          fieldId: 'spacing-0',
          renderComponent: Spacing,
        },
        {
          fieldId: 'metadata.abstract',
          renderComponent: AbstractEditor,
          title: 'Abstract',
          placeholder: 'Write an abstract',
          validate: [required, minChars100, maxChars5000],
        },
        {
          fieldId: 'spacing-authors',
          renderComponent: Spacing,
        },
        {
          fieldId: 'label-authors',
          renderComponent: Label,
          label: 'Authors',
        },
        {
          fieldId: 'metadata.authors',
          renderComponent: TextField,
          title: 'Authors',
          placeholder: 'Enter author names...',
          format: join(),
          parse: split(),
          validate: [minSize1],
        },
        {
          fieldId: 'spacing-Keywords',
          renderComponent: Spacing,
        },
        {
          fieldId: 'label-Keywords',
          renderComponent: Label,
          label: 'Keywords',
        },
        {
          fieldId: 'metadata.keywords',
          renderComponent: TextField,
          title: 'Authors',
          placeholder: 'Enter keywords...',
          format: join(),
          parse: split(),
          validate: [minSize1],
        },
        {
          fieldId: 'spacing-article',
          renderComponent: Spacing,
        },
        {
          fieldId: 'label-article',
          renderComponent: Label,
          label: 'Article Type',
        },
        {
          fieldId: 'metadata.articleType',
          renderComponent: Menu,
          options: articleTypes,
          validate: [required],
        },
        {
          fieldId: 'spacing-section',
          renderComponent: Spacing,
        },
        {
          fieldId: 'metadata.articleSection',
          renderComponent: CheckboxGroup,
          label: 'Section',
          options: articleSections,
          validate: [required],
        },
        {
          fieldId: 'spacing-decl',
          renderComponent: Spacing,
        },
        {
          fieldId: `declarations.${declarations.questions[0].id}`,
          label: declarations.questions[0].legend,
          renderComponent: DeclarationInput,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
          validate: [required],
        },
        {
          fieldId: `declarations.${declarations.questions[1].id}`,
          label: declarations.questions[1].legend,
          renderComponent: DeclarationInput,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
          validate: [required],
        },
        {
          fieldId: `declarations.${declarations.questions[2].id}`,
          label: declarations.questions[2].legend,
          renderComponent: DeclarationInput,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
          validate: [required],
        },
        {
          fieldId: `declarations.${declarations.questions[3].id}`,
          label: declarations.questions[3].legend,
          renderComponent: DeclarationInput,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
          validate: [required],
        },
        {
          fieldId: `declarations.${declarations.questions[4].id}`,
          label: declarations.questions[4].legend,
          renderComponent: DeclarationInput,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
          validate: [required],
        },
        {
          fieldId: `declarations.${declarations.questions[5].id}`,
          label: declarations.questions[5].legend,
          renderComponent: DeclarationInput,
          options: [
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ],
          validate: [required],
        },
        {
          fieldId: 'spacing-rev',
          renderComponent: Spacing,
        },
        {
          fieldId: 'label-reviewers',
          renderComponent: Label,
          label: 'Reviewers',
        },
        {
          fieldId: 'label-rev-suggested',
          renderComponent: SubLabel,
          label: 'Suggested reviewers',
        },
        {
          fieldId: 'suggestions.reviewers.suggested',
          renderComponent: TextField,
          title: 'Suggested reviewers',
          placeholder: 'Add reviewers names...',
          format: joinComma,
          parse: splitComma,
        },
        {
          fieldId: 'label-rev-Opposed',
          renderComponent: SubLabel,
          label: 'Opposed reviewers',
        },
        {
          fieldId: 'suggestions.reviewers.opposed',
          renderComponent: TextField,
          title: 'Opposed reviewers',
          placeholder: 'Add opposed reviewers names...',
          format: joinComma,
          parse: splitComma,
        },
        {
          fieldId: 'label-Editors',
          renderComponent: Label,
          label: 'Editors',
        },
        {
          fieldId: 'label-editors-suggested',
          renderComponent: SubLabel,
          label: 'Suggested Editors',
        },
        {
          fieldId: 'suggestions.editors.suggested',
          renderComponent: TextField,
          title: 'Suggested editors',
          placeholder: 'Add editors names...',
          format: joinComma,
          parse: splitComma,
        },
        {
          fieldId: 'label-editors-Opposed',
          renderComponent: SubLabel,
          label: 'Opposed Editors',
        },
        {
          fieldId: 'suggestions.editors.opposed',
          renderComponent: TextField,
          title: 'Opposed editors',
          placeholder: 'Add opposed editors names...',
          format: joinComma,
          parse: splitComma,
        },
        {
          fieldId: 'spacing-funding',
          renderComponent: Spacing,
        },
        {
          fieldId: 'notes.fundingAcknowledgement',
          renderComponent: NoteEditor,
          title: 'Funding body acknowledgement (required)',
          placeholder: 'Enter an acknowledgment...',
          validate: [required],
        },
        {
          fieldId: 'spacing-special',
          renderComponent: Spacing,
        },
        {
          fieldId: 'notes.specialInstructions',
          renderComponent: NoteEditor,
          title: 'Special instructions (confidential)',
          placeholder: 'Enter instructions for the editor…',
        },
        {
          fieldId: 'spacing-files',
          renderComponent: Spacing,
        },
        {
          fieldId: 'label-files',
          renderComponent: Label,
          label: 'Upload supplementary materials',
        },
        {
          fieldId: 'files.supplementary',
          label: 'Upload supplementary materials',
          renderComponent: Supplementary,
        },
      ],
    },
  ],
}
