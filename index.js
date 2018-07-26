const path = require('path');
const { getLoader, loaderNameMatches } = require('react-app-rewired');

function createRewireSass(sassLoaderOptions = {}) {
	return function(config, env) {
		const sassExtension = /(\.scss|\.sass)$/;
		const devMode = env !== 'production';
		const fileLoader = getLoader(config.module.rules, rule => loaderNameMatches(rule, 'file-loader'));

		if(!fileLoader.exclude) fileLoader.exclude = [];
		fileLoader.exclude.push(sassExtension);

		const cssRules = getLoader(config.module.rules, rule => String(rule.test) === String(/\.css$/));
		var sassRules;

		if (devMode) {
			sassRules = {
				test: sassExtension,
				use: [...cssRules.use, { loader: 'sass-loader', options: sassLoaderOptions }],
			};
		} else {
			sassRules = {
				test: sassExtension,
				use: [...cssRules.loader, { loader: 'sass-loader', options: sassLoaderOptions }],
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
