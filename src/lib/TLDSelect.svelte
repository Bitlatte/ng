<script lang="ts">
	let options: string[] = ['.com', '.co', '.dev', '.io', '.org', '.net', '.sh', '.xyz'];
	export let selected: string;
</script>

<select class={'select select-bordered w-1/3'} bind:value={selected}>
	<option disabled selected>select a top level domain</option>
	{#each options as option}
		<option>{option}</option>
	{/each}
</select>
