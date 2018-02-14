# AutoSave indicator

Display the status of the form (Saving in progress, Saved or Error while saving)

## Props

| Prop  |                                 Description                                  | Required | Default  |  Type  |
| :---: | :--------------------------------------------------------------------------: | :------: | :------: | :----: |
| formName  | Redux Form name |  false   | 'wizard' | string |
| progressText | Text to show while API returns | false | 'Saving changes... ' | string |
| errorText | Text to show on error  | false | 'Changes not saved ' | string |
| successText | Text to show on success  | false | 'Progress saved ${duration.humanize()} ago.' | string |
## Examples

```js
<AutosaveIndicator />
```

```js
<AutosaveIndicator formName="authors" progressText='Saving...' successText='Saved' errorText='Something went wrong!' />
```