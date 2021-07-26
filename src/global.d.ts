/// <reference types="@sveltejs/kit" />

declare module 'jsondb' {
	export default function createDb(name: string, ext: string): Db;

	class Db {
		put<T>(key: string, value: T, cb?: (error: Error) => void): void;
		get<T>(key: string, cb?: (error: Error, value: T) => void): void;
	}
}
