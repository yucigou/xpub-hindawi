const wizard = [
  {
    label: 'Journal details',
    title: 'Jounal & Field Selection',
    children: [
      {
        type: 'dropdown',
        fullWidth: true,
        label: 'Journal *',
        values: [
          { label: 'Dropdown 1.1', value: 'dd11' },
          { label: 'Dropdown 1.2', value: 'dd12' },
        ],
      },
      {
        type: 'dropdown',
        fullWidth: true,
        label: 'Subject area',
        values: [
          { label: 'Dropdown 2.1', value: 'dd21' },
          { label: 'Dropdown 2.2', value: 'dd22' },
        ],
      },
      {
        type: 'dropdown',
        fullWidth: true,
        label: 'Special issue',
        disabled: true,
        values: [
          { label: 'Dropdown 2.1', value: 'dd21' },
          { label: 'Dropdown 2.2', value: 'dd22' },
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
        type: 'checkbox',
        label:
          'I have the email addresses of all the co-authors of the manuscript.',
      },
      {
        type: 'checkbox',
        label:
          'I have the manuscript file in Microsoft Word or Adobe PDF format with the tables and figures integrated in the manuscript body.',
      },
      {
        type: 'checkbox',
        label:
          'I have the electronic files of any supplementary materials (e.g., datasets, images, audio, video) that I want to submit with the manuscript.',
      },
      {
        type: 'checkbox',
        label:
          'I am aware that accepted manuscripts are subject to Article Processing Charges.',
      },
      {
        type: 'checkbox',
        label: `I'm aware that an ORCID ID is required for the corresponding author before the article can be published (if accepted). The ORCID ID should added via your user account.`,
      },
      {
        type: 'checkbox',
        label:
          'I am aware that if my submission is covered by an institutional membership, Hindawi will share details of the manuscript with the administrator of the membership.',
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
]

export default wizard
