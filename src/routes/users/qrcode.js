import {authenticator} from 'otplib'
import qrcode from 'qrcode'
import {getSession} from '../../hooks'
import {parse} from '$lib/cookie'
import {TOTP_SERVICE_NAME} from '$lib/secrets'
import db from '$lib/db'

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get(request) {
  let cookie = parse(request.headers.cookie ?? '')
  let { user } = await getSession(request)
  user = await db.getUser(user.username)

  if (user == null) {
    return {
      status: 400
    }
  }

  authenticator.allOptions()

  user.totpSecret ??= authenticator.generateSecret();
  await db.updateUser(user.username, user)

  let secret = user.totpSecret
  let encoded = authenticator.encode(secret)
  let decoded = authenticator.decode(secret)
  let uri = authenticator.keyuri(user.username, TOTP_SERVICE_NAME, secret)

  let url = await new Promise((resolve, reject) =>
    qrcode.toDataURL(uri, { type: 'image/png' }, (err, url) => {
      if (err != null) {
        reject(err)
      } else {
        resolve(url)
      }
    })
  )

  let timeUsed = authenticator.timeUsed()
  let timeRemaining = authenticator.timeRemaining()

  console.log('@api/users/qrcode', {cookie, user, uri, secret, encoded, decoded, timeRemaining, timeUsed})

  return {
    status: 200,
    body: { url, secret },
  }
}
