import _ from 'lodash';
import { serialize } from '$lib/cookie';
import db from '$lib/db';

/** @type import('@sveltejs/kit').RequestHandler */
export const post = async (req) => {
	let username = req.body.get('username');
	let password = req.body.get('password');
	let user = await db.getUser(username);

	if (user == null || user.password !== password) {
		return {
			// Unauthorized Http code
			status: 401,
			body: {
				error: 'Unauthorized',
			},
		};
	}

	return {
		status: 302,
		headers: {
			'set-cookie': serialize('username', username),
			location: '/',
		},
	};
};
