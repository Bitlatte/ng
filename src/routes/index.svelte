<script lang="ts">
	import TldSelect from '$lib/TLDSelect.svelte';

	let keywords: string = '';
	let success: boolean;
	let results: string[] = [];
	let errMsg: string;
	let loading: boolean = false;

	let tld: string;

	const handleSubmit = async () => {
		if (tld === 'select a top level domain') {
			success = false;
			errMsg = 'Please Provide a TLD to continue';
		} else {
			let data = keywords.replace(/[^a-zA-Z,]+/g, '').split(',');
			loading = true;
			const res = await fetch('/api', {
				method: 'POST',
				body: JSON.stringify({ keywords: data })
			});
			const json = await res.json();
			success = json.success;
			if (success === false) {
				errMsg = 'Something went wrong with your request.';
			}
			json.names.forEach((name: string) => {
				if (name.length < 1) {
					json.names.splice(json.names.indexOf(name), 1);
				} else {
					loading = false;
					results = [...results, `${name}`.toLocaleLowerCase()];
				}
			});
		}
	};
</script>

<div class={'mt-5'}>
	<div class={'flex justify-center items-center'}>
		<div class={'w-2/3'}>
			<div class={'mb-10'}>
				<h1 class={'text-3xl font-bold'}>how it works</h1>
				<p>
					simply type a list of comma sperated words and hit submit. using openai we generate a
					number of new words inspired by the words you provided.
				</p>
			</div>
			<div class={'flex justify-between items-center'}>
				<TldSelect bind:selected={tld} />
				<div class={'input-group justify-end'}>
					<input
						class={'input input-primary w-2/3 focus:outline-none'}
						bind:value={keywords}
						placeholder={'koala, space, echo'}
					/>
					<button class={'btn lowercase'} on:click={handleSubmit}>submit</button>
				</div>
			</div>

			{#if success === false}
				<div class={'alert alert-error my-3'}>
					<div>
						<span>{errMsg}</span>
					</div>
				</div>
			{/if}
			<div class={'grid grid-cols-3 gap-3 my-10'}>
				{#if results.length >= 1}
					{#each results as result, index}
						<div class={'card bg-base-200 shadow-md'}>
							<div class={'card-body gap-10'}>
								<h1 class={'card-title font-mono font-bold text-4xl'}>{index}</h1>
								<p class={'text-center text-xl font-light'}>{result + tld}</p>
								<div class={'card-actions justify-end'}>
									<a
										href={`https://www.namecheap.com/domains/registration/results/?domain=${
											result + tld
										}`}
										class={'btn btn-primary btn-sm lowercase'}>namecheap</a
									>
								</div>
							</div>
						</div>
					{/each}
				{:else if loading}
					<div class={'col-span-3 text-center mt-10'}>
						<div
							class={'animate-spin radial-progress text-base-300'}
							style={'--value:20; --size:3rem;'}
						/>
					</div>
				{:else}
					<h1 class={'col-span-3 text-center mt-10 font-bold text-4xl'}>
						looks a bit lonely in here .
					</h1>
				{/if}
			</div>
		</div>
	</div>
</div>
