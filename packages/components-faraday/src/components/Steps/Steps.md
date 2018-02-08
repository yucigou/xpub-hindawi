# Steps

`Steps` is a navigation bar that guides users through the steps of a task. Use it whenever there is a sequence of tasks or steps that need to be done. By default the `Steps` modules has a `Step` and `Separator` default components, but custom components with different styles can be used as shown in the examples below.

## Props

|      Prop       |                            Description                            | Required | Default |      Type       |
| :-------------: | :---------------------------------------------------------------: | :------: | :-----: | :-------------: |
|   currentStep   |                  The current step of the wizard.                  |   true   |  null   |     number      |
| renderSeparator | Separator component to be rendered between two adjacent children. |  false   |  null   | React component |

## Examples

1.Usage with the Step component.

```js
import { Steps } from 'pubsweet-components-faraday/src/components'
const { Step } = Steps

<Steps currentStep={1}>
  <Step title="First step" />
  <Step title="Second step" />
  <Step title="Third step" />
</Steps>
```

2.Usage with a custom step component

```js
const StepComponent = ({ index, currentStep, customProp }) => <div>
  I am a custom component at step {index} / {currentStep} with a {customProp}.
</div>

<Steps currentStep={1}>
  <StepComponent customProp="Hei" />
  <StepComponent customProp="Ho" />
  <StepComponent customProp="Let's go!" />
</Steps>
```

Each child of the Steps component has access to the `currentStep` and also it's own `index`.

3.Usage with a custom separator
When the default separator is not what you want you can always pass a custom separator component. This custom separator will be placed between each two adjacent children.

```js
const Separator = () => (
  <div style={{ backgroundColor: 'pink', flex: 1, height: 10 }}>
    DIVIDER OF WORLDS
  </div>
)

<Steps currentStep={1} renderSeparator={Separator}>
  <StepComponent customProp="Hei" />
  <StepComponent customProp="Ho" />
  <StepComponent customProp="Let's go!" />
</Steps>
```
