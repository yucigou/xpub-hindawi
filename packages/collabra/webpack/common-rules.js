const path = require('path')
const components = require('../config/components.json')

const requireComponentsString = components
  .filter(name => {
    const component = require(name)

    // "client" or "frontend" for backwards compatibility
    return component.client || component.frontend
  })
  .map(name => "require('" + name + "')")
  .join(', ')

// paths that use ES6 scripts and CSS modules
// TODO: compile components to ES5 for distribution
const include = [
  path.join(__dirname, '..', 'app'),
  /pubsweet-[^/]+\/src/,
  /xpub-[^/]+\/src/,
  /component-[^/]+\/src/,
]

module.exports = [
  // replace "PUBSWEET_COMPONENTS" string in pubsweet-client
  {
    test: /\.js$/,
    enforce: 'pre',
    // include: /pubsweet-client\/src\/components/,
    loader: 'string-replace-loader',
    options: {
      search: 'PUBSWEET_COMPONENTS',
      replace: '[' + requireComponentsString + ']'
    }
  },

  // loaders
  {
    oneOf: [
      // ES6 JS
      {
        test: /\.js?$/,
        include,
        loader: 'babel-loader',
        options: {
          presets: [
            'env',
            'react-app'
          ],
          plugins: [
            'react-hot-loader/babel',
          ]
        }
      },

      // CSS Modules
      {
        test: /\.local\.css$/,
        include,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            }
          }
        ]
      },

      // global CSS
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },

      // global SCSS
      /*{
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },*/

      // HTML (needed?)
      {
        test: /\.html$/,
        use: 'html-loader'
      },

      // files
      {
        exclude: [/\.js$/, /\.html$/, /\.json$/],
        loader: 'file-loader',
        options: {
          name: 'static/media/[name].[hash:8].[ext]',
        }
      }
    ]
  },
]