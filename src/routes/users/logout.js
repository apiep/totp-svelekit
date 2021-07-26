import { clear } from '$lib/cookie';

/** @type {import('@sveltejs/kit').RequestHandler */
export async function post(_) {
	return {
		status: 302,
		headers: {
			'set-cookie': clear('username'),
			location: '/',
		},
	};
}
