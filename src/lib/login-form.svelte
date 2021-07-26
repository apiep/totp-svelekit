<script>
	export let action = '/users/verified-login';
	export let username = '';
	export let token = '';
</script>

<form method="post" {action}>
	<fieldset>
		<label for="username">Username</label>
		<input
			id="username"
			name="username"
			bind="username"
			type="text"
			bind:value={username}
		/>
	</fieldset>
	<fieldset>
		<label for="token">OTP Token</label>
		<input
			id="token"
			name="token"
			type="number"
			bind:value={token}
		/>
	</fieldset>

	<input type="submit" value="Submit" />
	<input type="reset" value="Reset" />
</form>

<style>
	form {
		max-width: 200px;
		/* margin: 0 auto; */
		/* margin-top: 40vh; */
	}
	fieldset {
		border: 0;
		padding: 10px 0;
	}
</style>
