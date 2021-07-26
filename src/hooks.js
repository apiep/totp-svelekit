import _ from 'lodash';
import { parse } from '$lib/cookie';
import db from '$lib/db';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ request, resolve }) {
	const response = await resolve(request);

	response.headers['x-powered-by'] = 'zroconf';

	return response;
}

/** @type {import('@sveltejs/kit').GetSession} */
export async function getSession(request) {
	let { username } = parse(request.headers.cookie ?? '');
	let user = await db.getUser(username);
	if (user != null) {
		user = _.omit(user, ['password']);
	}

	return { user };
}
