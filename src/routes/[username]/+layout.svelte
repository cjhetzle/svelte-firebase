<script lang="ts">
	import { userData } from '$lib/firebase';
	$: href = `/${$userData?.username}/`;
</script>

<main>
	<div class="flex justify-between w-full navbar bg-base-100">
		<div class="justify-start">
			<a class="btn btn-ghost text-xl" {href}>daisyUI</a>
		</div>
		<div class="justify-end">
			<a class="btn btn-ghost" href="/login">Login</a>
		</div>
	</div>
</main>
<slot />
