# Rewire create-react-app to use SASS!

You might not need this rewire, Create React App added guide about how to add Sass support to CRA without the need of ejecting,
but I just updated an existing deprecated package from react-app-rewired so in case you don't like to locally watch your sass files this is the solution. See
[Adding a CSS Preprocessor](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-a-css-preprocessor-sass-less-etc) but in case you want to injecting Sass instead of the normal watch files approach CRA represnting using ```node-sass-chokidar```

# Install

```bash
$ yarn add react-app-rewired react-app-rewire-scss -D
$ npm install react-app-rewired react-app-rewire-scss --save-dev
```

# Add it to your project

* [Rewire your app](https://github.com/timarney/react-app-rewired#how-to-rewire-your-create-react-app-project) then modify `config-overrides.js`

```javascript
const rewireSass = require('react-app-rewire-scss');

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireSass(config, env);
  // with loaderOptions
  // config = rewireSass.withLoaderOptions(someLoaderOptions)(config, env);
  return config;
}
```
