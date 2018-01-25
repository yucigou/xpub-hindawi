Component based on `redux-form`.

Submit form through a wizard (applicable for `Submit Manuscript` flow) using a configuration file.

Configuration file must be under config `journal` (make use of `withJournal`) and exported with `wizard` key.

`/xpub-collabra/app/config/journal/wizard.js` (see below file example)


### `Wizard.js` options
|Key|Description|Required|Default|Type|
| :---: | :---: | :---: | :---: | :---: |
| showProgress | Show progress bar | true | false | `bool` |
| submitText | Text to show on Submit button  | false | 'Submit Manuscript' | `string` |
| backText | Text to show on Back button - Go back 1 step | false | 'Back' | `string` |
| nextText | Text to show on Back button - Go forward 1 step | false | 'Next' | `string` |
| cancelText | Text to show on Cancel button - Go to `/`  | false | 'Back' | `string` |
| submissionRedirect | Path to redirect user after submitting the form. Passes as state `project` as project.id and `version` as version.id | false | `/` | `string` |
| confirmationModal | If present, component will be rendered as a modal before submitting the form. Accepts `toggleConfirming` to close the modal and must have 2 buttons for submit and close modal (see below)  | false | none | `React Component` |
| formSectionKeys | Redux form data model. Keys to be saved on the form. | true | [] | `array` |
| dispatchFunctions | Functions to be dispatched in case a component needs a dispatched function (f.i. `uploadFile`) | true | none | `array` |
| steps | Each object in steps array represents a step in the form. In case of one-page form, just 1 step is needed. | true | none | `array` of `object` |


#### `Steps` options
|Key|Description|Required|Default|Type|
| :---: | :---: | :---: | :---: | :---: |
| label | Text on progress bar | false | '' | `string` |
| title | Text as title of the step | false | '' | `string` |
| subtitle | Text as info of the step | false | '' | `string` or `HTML` |
| children | Fields/Components to be rendered per each step  | true | none | `array` of `object` |


#### `Steps children` options
|Key|Description|Required|Default|Type|
| :---: | :---: | :---: | :---: | :---: |
| fieldId | Path to the `redux-form` (f.i. for title in metadata use `metadata.title` ) | true | none | `string` |
| renderComponent | React Component to be rendered. Usually, a PubSweetUI component or custom component  | true | none | `React Component` |
| validate | Array of custom validation per each field | false | none | `array` |
| `<props>` | Other props to be passed for that specific component | false | none | `label` `options` `placeholder` `title` `parse` `format` |



#### ConfirmationModal.js
```js
const ConfirmationModal = ({ toggleConfirming }) => (
  <div>
    <p>Explanatory text here</p>
      <Button primary type="submit"> Submit your manuscript</Button>
      <Button onClick={toggleConfirming}> get back to your submission (close modal)</Button>
  </div>
)
```


#### Example of `Wizard.js` for one-page form
```js
export default {
  showProgress: false,
  submitText: 'Submit your manuscript',
  backText: 'Back',
  cancelText: 'Cancel',
  nextText: 'Next',
  formSectionKeys: [
    'metadata',
    'files',
  ],
  submissionRedirect: '/',
  confirmationModal: ConfirmModal,
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
          fieldId: 'metadata.abstract',
          renderComponent: AbstractEditor,
          title: 'Abstract',
          placeholder: 'Write an abstract',
          validate: [required, minChars100, maxChars5000],
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
          fieldId: 'files.supplementary',
          label: 'Upload supplementary materials',
          renderComponent: Supplementary,
        },
      ],
    },
  ],
}
```