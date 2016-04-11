var colors = require('colors');

function makeLogger (names, parentLogger) {

	function log(level, args) {

		names.forEach(function(n) {
			var val = n;
			if(typeof(n) === 'function') val = n();
			[].unshift.call(args, '[' + val + ']');
		});
		[].unshift.call(args, '[' + level + ']');

		var consoleFn = console[level.toLowerCase()] || console.log;

		consoleFn.apply(console, args);
	};

	function logger (name) {
		if(!logger.loggers) logger.loggers = {};

		if(logger.loggers[name]) return logger.loggers[name];

		var newLogger = makeLogger([name].concat(names), logger);

		logger.loggers[name] = newLogger;

		return newLogger;
	};

	if(parentLogger) {
		logger.useColors = parentLogger.useColors;
		logger.showInfo = parentLogger.showInfo;
		logger.showDebug = parentLogger.showDebug;
		logger.showWarn = parentLogger.showWarn;
		logger.showError = parentLogger.showError;
	} else {
		logger.useColors = true;
		logger.showInfo = true;
		logger.showDebug = true;
		logger.showWarn = true;
		logger.showError = true;
	}


	logger.info = function () {
		if(!logger.showInfo) return;
		var level = 'INFO';
		if(logger.useColors) level = level.green;
		log(level, arguments);
	};

	logger.debug = function () {
		if(!logger.showDebug) return;
		var level = 'DEBUG';
		if(logger.useColors) level = level.magenta;
		log(level, arguments);
	};

	logger.warn = function () {
		if(!logger.showWarn) return;
		var level = 'WARN';
		if(logger.useColors) level = level.yellow;
		log(level, arguments);
	};

	logger.error = function () {
		if(!logger.showError) return;
		var level = 'ERROR';
		if(logger.useColors) level = level.red;
		log(level, arguments);
	};

	return logger;
};


module.exports = makeLogger([]);