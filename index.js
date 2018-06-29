const path = require('path');
const { getLoader, loaderNameMatches } = require('react-app-rewired');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

function createRewireSass(sassLoaderOptions = {}) {
	return function(config, env) {
		const sassLoaderOptions = {};
		const sassExtension = /(\.scss|\.sass)$/;
		const devMode = env !== 'production';
		const fileLoader = getLoader(config.module.rules, rule => loaderNameMatches(rule, 'file-loader'));

		fileLoader.exclude.push(sassExtension);

		const cssRules = getLoader(config.module.rules, rule => String(rule.test) === String(/\.css$/));

		if (devMode) {
			var sassRules = {
				test: sassExtension,
				use: [...cssRules.use, { loader: 'sass-loader', options: sassLoaderOptions }],
			};
		} else {
			var sassRules = {
				test: sassExtension,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			};
		}

		const oneOfRule = config.module.rules.find(rule => rule.oneOf !== undefined);

		if (oneOfRule) {
			oneOfRule.oneOf.unshift(sassRules);
		} else {
			// Fallback to previous behaviour of adding to the end of the rules list.
			config.module.rules.push(sassRules);
		}

		return config;
	};
}

const rewireSass = createRewireSass();

rewireSass.withLoaderOptions = createRewireSass;

module.exports = rewireSass;
