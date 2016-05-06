var colors = require('colors');

var levels = {
	LOG: 		'[ LOG ]'.magenta,
	INFO: 	'[INFO ]'.green,
	WARN: 	'[WARN ]'.yellow,
	ERROR: 	'[ERROR]'.red
};

if(!console.logger) {

	console.log = console.log.bind(console, levels.LOG);
	console.info = console.info.bind(console, levels.INFO);
	console.warn = console.warn.bind(console, levels.WARN);
	console.error = console.error.bind(console, levels.ERROR);

	function logger (thing) {
		// console.log('Making new logger', thing, this);
		var newConsole = Object.assign({ logger: logger }, this);
		this.loggers = this.loggers || {};
		this.loggers[thing] = newConsole;
		extendLogger(newConsole, thing);
		return newConsole;
	}

	console.logger = logger;
}

function extendLogger (c, thing) {

	if( typeof thing === 'function') {

		var originals = {
			log: c.log,
			info: c.info,
			warn: c.warn,
			error: c.error
		};

		c.log = function () {
			originals.log.bind(c, '[' + thing() + ']').apply(c, arguments);
		};

		c.info = function () {
			originals.info.bind(c, '[' + thing() + ']').apply(c, arguments);
		};

		c.warn = function () {
			originals.warn.bind(c, '[' + thing() + ']').apply(c, arguments);
		};

		c.error = function () {
			originals.error.bind(c, '[' + thing() + ']').apply(c, arguments);
		};
	} else {
		var string = '[' + thing + ']';
		c.log = c.log.bind(c, string);
		c.info = c.info.bind(c, string);
		c.warn = c.warn.bind(c, string);
		c.error = c.error.bind(c, string);
	}
}

module.exports = console;
