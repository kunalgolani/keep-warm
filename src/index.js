'use strict';

var co = require('co'),
	wait = require('wait-then'),
	{throttle} = require('underscore'),
	cache = {},
	fetchers = {};


var fetchOnce = throttle(key => {

	return co(function *() {

		cache[key] = yield fetchers[key]();
		return cache[key];

	}).catch(() => console.error(`Warming up ${key} cache failed`));

}, 100);


function keepWarm(key, fetch, interval) {
	fetchers[key] = fetch;

	co(function *() {

		while (true) {
			cache[key] = yield fetch();
			yield wait(interval);
		}

	}).catch(() => console.error(`Refreshing ${key} cache failed`));

	return fetchOnce(key);
}


keepWarm.get = function(key) {

	if (cache[key])
		return cache[key];

	fetchOnce(key);
	throw new Error(`${key} missing from cache, fetching now`);

};

keepWarm.getAsync = function *(key) {

	if (cache[key])
		return cache[key];

	return yield fetchOnce(key);

};

module.exports = keepWarm;