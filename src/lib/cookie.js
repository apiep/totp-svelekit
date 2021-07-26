import cookie from 'cookie';

const $7_DAYS = 60 * 60 * 24 * 7

/**
 * @param {string} key
 * @param {string} value
 * @returns {string}
 */
export const serialize = (key, value) =>
	cookie.serialize(key, value, {
		path: '/',
		sameSite: true,
		maxAge: $7_DAYS
	});

/**
 * @param {string} key
 */
export const clear = (key) =>
	cookie.serialize(key, null, {
		path: '/',
		sameSite: true,
		maxAge: 0,
	});

/**
 * @param {string} key
 * @return {Record<string, string>}
 */
export const parse = (key) => cookie.parse(key);
