<script lang="ts">
	import '../app.css';
	import Navigation from '$lib/Navigation.svelte';
	import { onMount } from 'svelte';
	import { themeChange } from 'theme-change';

	onMount(() => {
		themeChange(false);
	});
</script>

<div>
	<Navigation />
	<div>
		<slot />
	</div>
</div>
