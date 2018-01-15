import React from 'react'
import { AbstractEditor, TitleEditor } from 'xpub-edit'
import {
  Menu,
  CheckboxGroup,
  YesOrNo,
  TextField,
  Supplementary,
} from '@pubsweet/ui'
import uploadFile from 'xpub-upload'
import { required, minChars } from 'xpub-validators'

import { articleSections, articleTypes, declarations } from './'

const min3Chars = minChars(3)
const yesNoWithLabel = ({ label, ...rest }) => (
  <div>
    <label>{label}</label>
    <YesOrNo {...rest} />
  </div>
)

export default {
  showProgress: false,
  steps: [
    {
      label: 'Journal details',
      title: 'Jounal & Field Selection',
      children: [
        {
          fieldId: 'journal',
          renderComponent: Menu,
          label: 'Journal',
          options: articleTypes,
          validate: [required],
        },
        {
          fieldId: 'subject',
          renderComponent: Menu,
          label: 'Subject area',
          options: articleSections,
        },
        {
          fieldId: 'specialIssue',
          renderComponent: Menu,
          label: 'Special issue',
          options: [
            { label: 'Special 2.1', value: 'dd21' },
            { label: 'Special 2.2', value: 'dd22' },
          ],
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
          fieldId: 'step3-1',
          renderComponent: TitleEditor,
          placeholder: 'Manuscript title',
          title: 'Manuscript title',
        },
        {
          fieldId: 'step3-2',
          renderComponent: Menu,
          label: 'Manuscript type',
          options: [
            { label: 'Type 1', value: 'type1' },
            { label: 'Type 2', value: 'type2' },
          ],
        },
        {
          fieldId: 'step3-3',
          renderComponent: AbstractEditor,
          title: 'Abstract',
          placeholder: 'Write an abstract',
        },
        // {
        //   fieldId: 'authors',
        //   renderComponent: 'sortable-list',
        //   label: 'Authors details',
        // },
        {
          fieldId: 'step3-4',
          renderComponent: yesNoWithLabel,
          label: 'Is there a potential conflict of interest?',
        },
        {
          fieldId: 'step3-5',
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
          fieldId: 'mainManuscripts',
          label: 'Main Manuscript',
          renderComponent: Supplementary,
          uploadFile,
        },
        {
          fieldId: 'supplementalFiles',
          label: 'Supplemental Files',
          renderComponent: Supplementary,
          uploadFile,
        },
        {
          fieldId: 'coverLetter',
          label: 'Cover Letter',
          renderComponent: Supplementary,
          uploadFile,
        },
      ],
    },
  ],
}
