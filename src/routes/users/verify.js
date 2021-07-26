// @ts-check
import _ from 'lodash'
import { authenticator } from 'otplib';
import { getSession } from '../../hooks';
import db from '$lib/db';

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function post(request) {
  let { user } = await getSession(request)
  user = await db.getUser(user.username)
  let token = request.body['token']
  let verified = false

  if (user == null) {
    return {
      status: 401,
      body: { verified }
    }
  }

  // verified = totp.check(token, TOTP_SECRET);
  try {
    verified = authenticator.verify({ token, secret: user.totpSecret })
  } catch (e) {
    console.log('got error verifying token', e)
  }
  user.isTotpVerified = verified
  user.isTotpEnabled = verified
  await db.updateUser(user.username, user)

  console.log('@api :: /users/verify', { user: _.omit(user, 'password'), verified, token })
  if (!verified) {
    return {
      status: 401,
      body: { verified }
    }
  } else {
    return {
      status: 200,
      body: { verified }
    }
  }
}
