<script lang="ts">
	import AuthCheck from '$lib/components/AuthCheck.svelte';
	import { db, user, userData } from '$lib/firebase';
	import { doc, getDoc, writeBatch } from 'firebase/firestore';

	let username = '';
	let loading = false;
	let isAvailable = false;
	let debounceTimer: NodeJS.Timeout;
	const re = /^(?=[a-zA-Z0-9._]{3,16}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

	$: isValid = username?.length > 2 && username.length < 16 && re.test(username);
	$: isTouched = username.length > 0;
	$: isTaken = isValid && !isAvailable && !loading;

	async function checkAvailability() {
		clearTimeout(debounceTimer);
		loading = true;
		if (username === '') isAvailable = false;

		debounceTimer = setTimeout(async () => {
			console.log('checking availability', username);
			const ref = doc(db, 'usernames', username);
			const exists = await getDoc(ref).then((doc) => doc.exists());

			isAvailable = !exists;
			loading = false;
		}, 500);
	}

	async function confirmUsername() {
		console.log('confirming username', username);
		const batch = writeBatch(db);
		batch.set(doc(db, 'usernames', username), { uid: $user?.uid });
		batch.set(doc(db, 'users', $user!.uid), {
			username,
			photoURL: $user?.photoURL ?? null,
			published: true,
			bio: 'I am the Walrus',
			links: [
				{
					title: 'Test Link',
					url: 'https://kung.foo',
					icon: 'custom'
				}
			]
		});

		await batch.commit();
	}
</script>

<AuthCheck>
	{#if $userData?.username}
		<p class='text-xl'>
			You username is <span class="text-green-400 font-semibold text-2xl">@{$userData.username}</span>
		</p>
		<p>(Usernames cannot be changed)</p>
		<a class='btn btn-primary text-white text-lg font-bold' href="/login/photo">UPLOAD PROFILE IMAGE</a>
	{:else}
		<h1>Choose Username</h1>
		<form class="w-2/5" on:submit|preventDefault={confirmUsername}>
			<input
				type="text"
				placeholder="username"
				class="input w-full"
				bind:value={username}
				on:input={checkAvailability}
				class:input-error={!isAvailable && isTouched}
				class:input-warning={isTaken}
				class:input-success={isAvailable && isValid && !loading}
			/>
			<div class="my-2">
				{#if loading}
					<p class="text-gray-500">Checking availability of @{username}...</p>
				{/if}

				{#if !isValid && isTouched}
					<p class="text-error text-sm">
						Username must be between 3 and 16 characters long, alphanumeric only
					</p>
				{/if}

				{#if isValid && !isAvailable && !loading}
					<p class="text-warning text-sm">Username @{username} is already taken.</p>
				{/if}

				{#if isAvailable && isValid && !loading}
					<button class="btn btn-success my-2">Confirm username @{username}</button>
				{/if}
			</div>
		</form>
	{/if}
</AuthCheck>
