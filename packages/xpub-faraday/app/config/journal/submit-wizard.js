const wizard = [
  {
    label: 'Journal details',
    title: 'Jounal & Field Selection',
    children: [
      {
        type: 'dropdown',
        fullWidth: true,
        values: ['Dropdown 1.1', 'Dropdown 1.2'],
      },
      {
        type: 'dropdown',
        fullWidth: true,
        values: ['Dropdown 2.1', 'Dropdown 2.2', 'Dropdown 2.3'],
      },
      {
        type: 'radio',
        values: ['radio 1', 'radio 2', 'radio 3', 'radio 4'],
      },
      {
        type: 'checkbox',
        values: ['checkbox 1', 'checkbox 2', 'checkbox 3', 'checkbox 4'],
      },
    ],
  },
  {
    label: 'Pre-submission checklist',
    title: 'Pre-submission Checklist',
  },
  {
    label: 'Manuscript & Authors Details',
    title: 'Manuscript & Authors Details',
  },
  {
    label: 'Files upload',
    title: 'Manuscript Files Upload',
  },
]

export default wizard
