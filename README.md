# loginator
A simple javascript logging mechanism.

## Installation
```
npm install --save acoll/loginator
```

**loginator** lets you create a simple hierarchy of loggers

## Usage

```js
var logger = require('loginator')('cli');

logger.useColors = false;
logger.showDebug = false;

logger.info('HELLO WORLD')
// [INFO ] [cli] HELLO WORLD

var subLogger = logger('child-of-cli');

subLogger.showDebug = true;

subLogger.debug('HELLO FROM CHILD');
// [DEBUG] [cli] [child-of-cli] HELLO FROM CHILD
```