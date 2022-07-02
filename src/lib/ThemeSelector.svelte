<script lang="ts">
	interface ThemeOption {
		name: string;
		value: string;
	}
	const options: ThemeOption[] = [
		{ name: 'light', value: 'lofi' },
		{ name: 'dark', value: 'black' }
	];
</script>

<select data-choose-theme class={'select select-bordered select-sm'}>
	<option disabled selected>choose a theme</option>
	{#each options as option}
		<option value={option.value}>{option.name}</option>
	{/each}
</select>
