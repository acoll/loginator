var logger = require('./')(__filename.replace(__dirname, ''));

// turn off colors at the root
logger.useColors = false;
logger.showWarn = false;

logger.info('THIS IS THE ROOT LOGGER.', 'MULTIPLE THINGS CAN ALWAYS BE PASSED');
var x = {
	name: 'Adam',
	age: 1000
};

logger.info('Log an object if you want to:', x);

// Make a child logger for logging with the current user's id
var userLogger = logger('user=15732');
userLogger.debug('Login event');

// Make a child logger with a functin for the context value.
var intervalLogger = userLogger(() => new Date);
setInterval(() => intervalLogger.info('Hello Interval'), 2000);

var logger1 = logger('logger-1');

logger1.useColors = true;
logger1.showWarn = true;
logger1.info('HELLO INFO');
logger1.debug('HELLO DEBUG');
logger1.warn('HELLO WARN');
logger1.error('HELLO ERROR');

var logger2 = logger1('logger-2');
logger2.info('HELLO INFO');
logger2.debug('HELLO DEBUG');
logger2.warn('HELLO WARN');
logger2.error('HELLO ERROR');

var logger8 = logger2('logger-3')('logger-4')('logger-5')('logger-6')('logger-7')('logger-8');
logger8.info('HELLO DEEP LOGGER');

setTimeout(() => {
	intervalLogger.debug('Yea lets do colors again.');
	intervalLogger.useColors = true;
}, 4000);