<script>
	import '../app.css';
	import { page } from '$app/stores';
  
	let { children } = $props();
	let options = ['dashboard', 'players', 'quests', 'dungeons'];
	let selectedOption = $state($page.route.id === '/' ? 'dashboard' : String($page.route.id).slice(1));
	/** @type { HTMLDivElement }*/
	let buttonGroup;
	let highlightStyle = $state({ left: 0, width: 0 });

	function updateHighlight() {
    /** @type {HTMLButtonElement | null} */
    const selectedButton = buttonGroup.querySelector(`a[id="${selectedOption}"]`);
    if (selectedButton) {
			const { offsetLeft, offsetWidth } = selectedButton;
			highlightStyle = { left: offsetLeft, width: offsetWidth };
    }
  }
	
  $effect(updateHighlight);
</script>

<nav class="p-4 sticky top-0 z-10 bg-slate-900">
	<div class="flex items-center gap-4">
		<a href="/" onclick={() => selectedOption = 'dashboard'} class="text-xl font-bold text-white/60">For The Quest</a>
		<div class="flex flex-col items-center gap-2">
			<div bind:this={buttonGroup} class="relative inline-flex rounded-lg bg-white/5 p-1">
				<div
					class="absolute top-1 bottom-1 rounded-md bg-blue-600 transition-all duration-200"
					style="left: {`${highlightStyle.left}px`}; width: {`${highlightStyle.width}px`};"
				></div>
				{#each options as option}
					<a href={option === 'dashboard' ? '/' : `/${option.toLowerCase()}`}
						id={`${option}`}
						class="relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors {option === selectedOption ? 'text-white' : 'text-white/80 hover:text-white'}"
						onclick={() => selectedOption = option}
					>
						{option[0].toUpperCase() + option.slice(1)}
					</a>
				{/each}
			</div>
		</div>
	</div>
</nav>

{@render children()}

<!-- <Sidebar.Provider class="" style="">
	<AppSidebar />
	<main>
		<nav class="flex h-16 items-center justify-start px-4">
			<div class="flex items-center space-x-3">
				<Sidebar.Trigger class="w-8 h-8"/>
				<h1 class="text-lg font-semibold">For The Quest</h1>
			</div>
		</nav>
		{@render children()}
	</main>
</Sidebar.Provider> -->
