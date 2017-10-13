module.exports = function({file, options, env}){
	return {
		plugins: {
			'precss': {},
			// 'postcss-px-to-viewport': {
			// 	viewportWidth: 320,
			// 	viewportHeight: 568,
			// 	unitPrecision: 5,
			// 	viewportUnit: 'vw',
			// 	selectorBlackList: [],
			// 	minPixelValue: 1,
			// 	mediaQuery: false
			// },
			'postcss-assets': {
				loadPaths: ['app/images/'],
				relative: true
			},
			'postcss-will-change': {},
			'postcss-color-rgba-fallback': {},
			'postcss-opacity': {},
			'postcss-pseudoelements': {},
			'postcss-vmin': {},
			'postcss-calc': {},
			'postcss-at2x': {},
			'postcss-write-svg': {},
			'postcss-aspect-ratio-mini': {},
			// 'postcss-px2rem': {
			// 	remUnit: 32
			// },
			'postcss-functions': {
				functions: {
			        px2rem: function (int) {
			        	return parseFloat(parseInt(int) / 32) + 'rem';
			        },
			        px2em: function (int, base) {
			        	return parseFloat(parseInt(int) / (base || 18)) + 'em';
			        }
			    }
			},
			'postcss-responsive-type': {},
			'autoprefixer': env === 'production' ? options.autoprefixer : false,
			'postcss-mq-keyframes': {},
			'css-mqpacker': {},
			'cssnano': env === "production" ? {} : false
		}
	}
}