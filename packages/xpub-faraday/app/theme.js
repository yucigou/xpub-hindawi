/* eslint-disable import/extensions */
import 'typeface-noto-sans'
import 'typeface-noto-serif'
import 'typeface-ubuntu-mono'

const theme = {
  colorPrimary: '#667080', // Indicates a primary call to action
  colorSecondary: '#d8d8d8', // Default color for non-primary actions
  colorFurniture: '#cccccc', // Meant to be applied to elements that indicate content division
  colorBorder: '#667080', // For borders around form elements
  colorBackgroundHue: '#f1f1f1', // Used to create a discrete contrast the default background color
  colorSuccess: '#005500', // Used to indicate a successful validation state
  colorError: '#b50000', // Used to indicate an error in validation
  colorText: '#333333', // Default font color
  colorTextReverse: '#ffffff', // Reverse font color
  colorTextPlaceholder: '#595959', // Used for text field placeholders
  colorBackground: '#ffffff',
  colorQuiet: '#aaa',

  fontInterface: "'Noto Sans'",
  fontHeading: "'Noto Sans'",
  fontReading: "'Noto Serif'",
  fontWriting: "'Ubuntu mono'",
  fontSizeBase: '18px', // Default font size
  fontSizeBaseSmall: '14px', // Smaller variation of fontSizeBase
  fontSizeHeading1: '36px', // Size for Heading 1
  fontSizeHeading2: '36px', // Size for Heading 2
  fontSizeHeading3: '29px', // Size for Heading 3
  fontSizeHeading4: '26px', // Size for Heading 4
  fontSizeHeading5: '23px', // Size for Heading 5
  fontSizeHeading6: '20px', // Size for Heading 6
  fontLineHeight: '32px', // Default line height

  /* Spacing */
  gridUnit: '24px', // Base interface space measurement used by elements and typography
  subGridUnit: '6px',

  borderDefault: '1px solid #667080',
  borderRadius: '2px', // Radius value applied to borders throughout the user interface
  borderWidth: '1px', // Width value applied to borders
  borderStyle: 'solid', // Style applied to borders (eg. solid, dashed)

  /* Shadow (for tooltip) */
  boxShadow: '0 2px 4px 0 rgba(51, 51, 51, 0.3)',
  dropShadow: '0 1px 0 0 #667080', // Default shadow that is applied to elements that float (eg. tooltips, modals)

  backgroundColor: '#f6f6f6',
  backgroundColorReverse: '#ffffff',

  transitionDuration: '1.5s', // How long transitions should last
  transitionTimingFunction: 'linear', // Which function should be applied to transitions (eg. easein)
  transitionDelay: '0s', // How long transitions should be delayed before they begin
  transitionDurationM: '0.5s',
  transitionDurationS: '0.2s',
  transitionDurationXs: '0.1s',

  // z indexes
  modalIndex: 10000,
}

export default theme
