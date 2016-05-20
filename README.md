# keep-warm

[![GitHub version][github-img]][github-url]
[![NPM Version][npm-img]][npm-url]

[![Deps][deps-img]][deps-url]
[![Dev Deps][devDeps-img]][deps-url]
[![Peer Deps][peerDeps-img]][deps-url]

[![NPM Downloads][downloads-img]][npm-url]
[![GitHub stars][stars-img]][github-url]
[![GitHub forks][forks-img]][github-url]
[![GitHub issues][issues-img]][github-url]

A utility to maintain an always warm cache refreshed every x seconds

```bash
npm install --save keep-warm
```

Basic example:

```javascript
var keepWarm = require('keep-warm');

/* Params:
 * key: a unique string
 * fetch: a function returning a Promise
 * interval: cache will be updated every interval ms
 */
keepWarm('myKey', function() {
    // does something async and returns a Promise
}, 15000);

/* Params
 * key: the key you originally passed to keepWarm
 * Use when you want the data synchronously and don't care about a failure when the cache has not been initially populated
 */
var myData = keepWarm.get('myKey');

/* Params
 * key: the key you originally passed to keepWarm
 * Use when you want to wait for the cache to be populated if it's not
 */
var myData;
keepWarm.getAsync('myKey').then(function(value) {
    myData = value;
});
```

__Note__: This relies on the existence of a global [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) object as defined in the ECMAScript 6 (Harmony) proposal.

[npm-img]: http://img.shields.io/npm/v/keep-warm.svg
[downloads-img]: http://img.shields.io/npm/dm/keep-warm.svg
[npm-url]: https://www.npmjs.org/package/keep-warm
[github-img]: https://badge.fury.io/gh/kunalgolani%2Fkeep-warm.svg
[stars-img]: https://img.shields.io/github/stars/kunalgolani/keep-warm.svg
[forks-img]: https://img.shields.io/github/forks/kunalgolani/keep-warm.svg
[issues-img]: https://img.shields.io/github/issues-raw/kunalgolani/keep-warm.svg
[github-url]: https://github.com/kunalgolani/keep-warm
[deps-img]: https://img.shields.io/david/kunalgolani/keep-warm.svg
[devDeps-img]: https://img.shields.io/david/dev/kunalgolani/keep-warm.svg
[peerDeps-img]: https://img.shields.io/david/peer/kunalgolani/keep-warm.svg
[deps-url]: https://github.com/kunalgolani/keep-warm/blob/master/package.json