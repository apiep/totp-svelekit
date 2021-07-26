import _ from 'lodash';
import { serialize } from '$lib/cookie';
import db from '$lib/db';

/** @type import("@sveltejs/kit").RequestHandler */
export async function post(request) {
	/** @type {import('@sveltejs/kit/types/helper').ReadOnlyFormData} */
	let body = request.body;
	let username = body.get('username');
	let password = body.get('password');

	if (username == null || password == null) {
		return {
			status: 400,
			body: {
				error: 'Username or password is missing',
			},
		};
	}

	let user = await db.getUser(username);
	if (user != null) {
		return {
			status: 400,
			body: {
				error: 'Username taken',
			},
		};
	}

	user = {
		username,
		password,
		isTotpEnabled: false,
		avatarUrl: 'https://via.placeholder.com/64',
	};
	await db
		.putUser(username, user)
		.then((r) => console.log('sukses', r))
		.catch((error) => console.warn(error));

	return {
		status: 302,
		headers: {
			'set-cookie': serialize('username', username),
			location: '/',
		},
	};
}
