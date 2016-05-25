var colors = require('colors');

var levels = {
	LOG: 		'[ LOG ]'.magenta,
	DEBUG: 	'[DEBUG]'.magenta,
	INFO: 	'[INFO ]'.green,
	WARN: 	'[WARN ]'.yellow,
	ERROR: 	'[ERROR]'.red
};

if(!console.logger) {

	console.debug = console.log.bind(console, levels.DEBUG);
	console.log = console.log.bind(console, levels.LOG);
	console.info = console.info.bind(console, levels.INFO);
	console.warn = console.warn.bind(console, levels.WARN);
	console.error = console.error.bind(console, levels.ERROR);

	function logger (thing) {
		if(!this.loggers) this.loggers = {};

		var newConsole;
		var noop = function () {};

		if(this.loggers[thing]) newConsole = this.loggers[thing];
		else {
			newConsole = {
				logger: logger,
				debug: this.debug,
				log: this.log,
				info: this.info,
				warn: this.warn,
				error: this.error,
				set: function (opts) {
					['log', 'debug', 'info', 'warn', 'error'].forEach(function(level) {
						if(opts[level] === false) newConsole[level] = noop;
					});
				}
			};
		}

		if(typeof thing !== 'function') {
			this.loggers[thing] = newConsole;
		}
		extendLogger(newConsole, thing);
		return newConsole;
	}

	console.logger = logger;
}

function extendLogger (c, thing) {

	if( typeof thing === 'function') {

		var originals = {
			log: c.log,
            debug: c.debug,
			info: c.info,
			warn: c.warn,
			error: c.error
		};

		c.log = function () {
			originals.log.bind(c, '[' + thing() + ']').apply(c, arguments);
		};

		c.debug = function () {
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
        c.debug = c.debug.bind(c, string);
		c.info = c.info.bind(c, string);
		c.warn = c.warn.bind(c, string);
		c.error = c.error.bind(c, string);
	}
}

module.exports = function (thing) {
	extendLogger(console, thing);
	return console;
};
