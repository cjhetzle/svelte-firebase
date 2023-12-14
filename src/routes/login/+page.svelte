<script lang="ts">
	import { auth, user } from '$lib/firebase';

	import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

	async function signInWithGoogle() {
		const provider = new GoogleAuthProvider();
		const user = await signInWithPopup(auth, provider);
		console.log(user);
	}
</script>

<h2>Login</h2>

{#if $user}
	<h2 class="card-title">Welcome, <span class="text-green-400">{$user.displayName}</span></h2>
	<a class="btn btn-success text-white" href="/login/username">NEXT</a>
{:else}
	<button class="btn btn-primary" on:click={signInWithGoogle}>Sign in with Google</button>
{/if}
