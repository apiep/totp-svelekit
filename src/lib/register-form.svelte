<script>
	export let action = '/users/register';
	export let username = 'apiep';
	export let password = 'qwe12345';
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
		<label for="password">Password</label>
		<input
			id="password"
			name="password"
			type="password"
			bind:value={password}
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
