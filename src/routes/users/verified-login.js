import {authenticator} from 'otplib'
import db from '$lib/db'
import { serialize } from '$lib/cookie'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(request) {
  let username = request.body.get('username')
  let token = request.body.get('token')

  let user = await db.getUser(username)
  if (user == null) {
    return {
      status: 400
    }
  }

  let verified = false
  let secret = user.totpSecret
  try {
    verified = authenticator.check(token, secret)
  } catch (e) {
    return {
      status: 400
    }
  }

  if (!verified) {
    return {
      status: 400,
      body: { verified }
    }
  } else {
    return {
      status: 302,
      headers: {
        'set-cookie': serialize('username', username),
        location: '/',
      },
    }
  }
}
