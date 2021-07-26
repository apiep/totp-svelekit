// @ts-check
import { join } from 'path';
// const join = require('path').join
import Datastore from 'nedb';
import _ from 'lodash';
// import createDb from 'jsondb'
// import {JSONFile, Low} from 'lowdb'

/**
 * @typedef {Object} User
 * @prop {string} User.username
 * @prop {string} User.password
 * @prop {string} User.avatarUrl
 * @prop {string} User.totpSecret
 * @prop {boolean} User.isTotpEnabled
 * @prop {boolean} User.isTotpVerified
 */

/**
 * @typedef {Object} Db
 * @prop {User[]} users
 */

const db = new Datastore({ filename: 'data.db', autoload: true });

// export const db = createDb('db', '.json')
export default {
	/**
	 * @template T
	 * @param {string} username
	 * @return {Promise<User>}
	 */
	getUser: (username) =>
		new Promise(async (resolve, reject) => {
			db.findOne({ username }, (err, value) => {
				if (err != null) {
					reject(err);
				}
				resolve(value);
			});
		}),
	/**
	 * @param {string} username
	 * @param {Record<string, any>} value
	 * @return {Promise<void>}
	 */
	putUser: (username, value) =>
		new Promise(async (resolve, reject) => {
			db.insert({ username, ...value }, (err, _) => {
				if (err != null) {
					reject(err);
				}
				resolve();
			});
		}),
	updateUser: (username, value) => new Promise((resolve, reject) => {
		db.update({ username }, value, {}, (err, value) => {
			if (err != null) {
				reject(err)
			} else {
				resolve(value)
			}
		})
	})
};
