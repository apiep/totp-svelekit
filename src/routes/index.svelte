<script>
	import { derived } from 'svelte/store';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { session } from '$app/stores';
	import RegisterForm from '$lib/register-form.svelte';
	import LoginForm from '$lib/login-form.svelte';

	let user = derived(session, (it) => it.user);

	let action = 'login';
	let token = '123456';
	let secret = '';
	let status = '';
	let qrCode = 'https://via.placeholder.com/200';

	let doVerifyToken = async (event) => {
		let data = await axios[event.target.method](event.target.action, { token })
			.then(r => r.data)
			.then(() => status = 'Success')
			.catch(() => {
				status = 'Failed';
			})
		console.log('@doVerifyToken', data)
	}

	onMount(async () => {
		if ($user != null) {
			let {url, secret: s} = await axios.get('/users/qrcode')
				.then(r => r.data)

			qrCode = url
			secret = s
		}
	})
</script>

<main>
	{#if $user != null}
		Hi {$user?.username}
	{/if}
	{#if $user != null && !$user.isTotpVerified}
		<form method=post action=/users/verify on:submit|preventDefault={doVerifyToken}>
			<img src={qrCode} alt=qrcode height=200 width=200 />
			<span>{secret}</span>

			<fieldset>
				<label for="token">Token</label>
				<input type="text" bind:value={token} />
			</fieldset>

			<button type="submit">Verify</button> {status}
		</form>
	{/if}

	{#if $user == null}
		<button type="button" on:click={() => (action = 'login')}>Login</button>
		<button type="button" on:click={() => (action = 'verified-login')}>Verified Login</button>
		<button type="button" on:click={() => (action = 'register')}>Register</button>
	{:else}
		<form method="post" action="/users/logout">
			<button type="submit">Logout</button>
		</form>
	{/if}

	{#if $user == null}
		{#if action === 'register'}
			<h1>Register</h1>
			<RegisterForm action="/users/register" username="" password="" />
		{:else if action === 'verified-login'}
			<h1>Login with OTP Token</h1>
			<LoginForm action=/users/verified-login username='' password='' />
		{:else}
			<h1>Login</h1>
			<RegisterForm action="/users/login" />
		{/if}
	{/if}
</main>

<style>
	form {
		max-width: 200px;
	}
	fieldset {
		border: 0;
		padding: 10px 0;
	}
</style>
