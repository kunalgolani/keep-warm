'use strict';

var co = require('co');
var wait = require('wait-then');

var _require = require('underscore');

var throttle = _require.throttle;
var cache = {};
var fetchers = {};

var fetchOnce = throttle(key => co(function* () {

	cache[key] = yield fetchers[key]();
	return cache[key];
}).catch(e => console.error('Warming up ' + key + ' cache failed', e)), 100);

function keepWarm(key, fetch, interval) {
	fetchers[key] = fetch;

	co(function* () {

		while (true) {
			try {
				cache[key] = yield fetch();
			} catch (e) {
				console.error('Refreshing ' + key + ' cache failed', e);
			}
			yield wait(interval);
		}
	});

	return fetchOnce(key);
}

keepWarm.get = function (key) {

	if (cache[key]) return cache[key];

	fetchOnce(key);
	throw new Error(key + ' missing from cache, fetching now');
};

keepWarm.getAsync = function* (key) {

	if (cache[key]) return cache[key];

	return yield fetchOnce(key);
};

module.exports = keepWarm;