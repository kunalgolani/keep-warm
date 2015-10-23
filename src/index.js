'use strict';

var co = require('co'),
	wait = require('wait-then'),
	{throttle} = require('underscore'),
	cache = {},
	fetchers = {};


function keepWarm(key, fetch, interval) {
	fetchers[key] = fetch;

	co(function *() {

		while (true) {
			cache[key] = yield fetch();
			yield wait(interval);
		}

	}).catch(() => console.error(`Refreshing ${key} cache failed`));

}


var fetchOnce = throttle(key => {

	co(function *() {

		cache[key] = yield fetchers[key]();

	}).catch(() => console.error(`Warming up ${key} cache failed`));

}, 100);


keepWarm.get = function(key) {

	if (cache[key])
		return cache[key];

	fetchOnce(key);
	throw new Error(`${key} missing from cache, fetching now`);

};

module.exports = keepWarm;