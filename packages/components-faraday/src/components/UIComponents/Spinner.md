# Spinner

Spinning icon used when loading or waiting for API calls to finish.

## Props

| Prop  |                                 Description                                  | Required | Default  |  Type  |
| :---: | :--------------------------------------------------------------------------: | :------: | :------: | :----: |
| icon  | Name of the icon to be used as a spinner. Can be any valid FeatherIcon icon. |  false   | 'loader' | string |
| size  |                           The size of the spinner                            |  false   |    16    | number |
| color |                            Color of the spinner.                             |  false   |  '#444'  | string |

## Examples

```js
import { Spinner } from 'pubsweet-components-faraday/src/components'

<Spinner /> // renders the default spinner
<Spinner color="pink" size={40} icon="compass" /> // renders a huge pink spinning compass
```
