var logger = require('./')('test123');

logger.useColors = false;
logger.showWarn = false;

logger.info('HELLO1');
logger.warn('HELLO');
logger.debug('hello');

var sub = logger('more more');

var subDown = logger(() => (new Date));

subDown.info('bleh');
setTimeout(() => subDown.debug('LSKDJFLSKDJFLSDKFJ'), 1500);

sub.useColors = true;
sub.showWarn = true;
sub.info('stuff in sub');
sub.warn('sldkjsldkf');

var sub2 = sub('another layer');

sub2.info('Deep');

sub2.error('bleh');

sub2.error('bleh');
sub2.showError = false;
sub2.error('bleh');

sub2.error('NOPE WE WONT SEE THIS');

var soDeep = logger('stuff')('thing')('more')('later')('way down');

soDeep.error('SWEET');
