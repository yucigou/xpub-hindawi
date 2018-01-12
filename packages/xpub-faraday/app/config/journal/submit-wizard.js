import { AbstractEditor, TitleEditor } from 'xpub-edit'
import { Menu, Checkbox, CheckboxGroup, YesOrNo, TextField } from '@pubsweet/ui'

import { articleSections, articleTypes, declarations } from './'

const wizard = [
  {
    label: 'Journal details',
    title: 'Jounal & Field Selection',
    children: [
      {
        fieldId: 'journal',
        renderComponent: Menu,
        label: 'Journal',
        options: articleTypes,
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
      },
    ],
    buttons: [
      {
        label: 'Cancel',
        action: 'cancel',
      },
      {
        label: 'Back',
        action: 'back',
      },
      {
        label: 'Next step >',
        action: 'next',
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
    buttons: [
      {
        label: 'Back',
        action: 'back',
      },
      {
        label: 'Next step >',
        action: 'next',
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
        renderComponent: YesOrNo,
        label: 'Is there a potential conflict of interest?',
      },
      {
        fieldId: 'step3-5',
        renderComponent: TextField,
        label: 'Conflict of interest details',
      },
    ],
    buttons: [
      {
        label: 'Back',
        action: 'back',
      },
      {
        label: 'Next step >',
        action: 'next',
      },
    ],
  },
  /*
  {
    label: 'Files upload',
    title: 'Manuscript Files Upload',
    buttons: [
      {
        label: 'Back',
        action: 'back',
      },
      {
        label: 'Finish',
        action: 'finish',
      },
    ],
  },
  */
]

export default wizard
