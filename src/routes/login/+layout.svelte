<script lang="ts">
	import { page } from '$app/stores';
	import AnimatedRoute from '$lib/components/AnimatedRoute.svelte';
</script>

<ul class="steps">
	<a href="/login" class="step step-primary">Sign In</a>
	<a
		href="/login/username"
		class="step"
		class:step-primary={$page.route.id?.match(/username|photo/)}>Choose Username</a
	>
	<a href="/login/photo" class="step" class:step-primary={$page.route.id?.match(/photo/)}
		>Upload Photo</a
	>
</ul>

<AnimatedRoute>
	<main class="card w-4/6 bg-neutral text-neutral-content mx-auto shadow-xl">
		<div class="card-body items-center text-center">
			<slot />
		</div>
	</main>
</AnimatedRoute>
