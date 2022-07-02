<script lang="ts">
	import ThemeSelector from './ThemeSelector.svelte';
	import FaGithub from 'svelte-icons/fa/FaGithub.svelte';
</script>

<div class={'flex justify-between items-center py-5 px-10 bg-base-200 lowercase'}>
	<h1 class={'font-semibold text-xl'}>name generator</h1>
	<div class={'flex justify-end items-center gap-3'}>
		<a href={'https://github.com/Bitlatte/ng'} class={'link link-hover'}>
			<div class={'w-7 h-7'}>
				<FaGithub />
			</div>
		</a>
		<ThemeSelector />
	</div>
</div>
