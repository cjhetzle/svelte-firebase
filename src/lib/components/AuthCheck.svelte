<script>
	import { user } from '$lib/firebase';
</script>

{#if $user}
	<slot />
{:else}
	<p class="text-error my-10">
		You must be signed in to view this page.
		<a class="btn btn-primary" href="/login">Sign In</a>
	</p>
{/if}
