<svelte:head>	
<link href="https://cdn.jsdelivr.net/npm/daisyui@2.11.0/dist/full.css" rel="stylesheet" type="text/css" />
<script src="https://cdn.tailwindcss.com"></script>
</svelte:head>


<script lang="ts">
	import { onMount } from 'svelte';
	export const prerender = true;
	let { children } = $props();
	let routes: string[] = $state([]);
	// Dark mode state
	let darkMode = $state(false);
	onMount(async () => {
		const response = await fetch('/api/routes');
		routes = await response.json();


		// Dark mode persistence
		const storedDarkMode = localStorage.getItem('darkMode');

		// Load dark mode preference
		if (storedDarkMode) darkMode = storedDarkMode === 'true';

		// Apply initial dark mode class on body
		updateBodyClass();

	});
	// Function to toggle dark mode
	function toggleDarkMode() {
		darkMode = !darkMode;
	}

	$effect(() => {

		// Persist dark mode preference
		localStorage.setItem('darkMode', darkMode.toString());
		updateBodyClass();
	});
	function updateBodyClass() {
		if (darkMode) {
			document.body.classList.add('dark-mode');
			document.body.classList.remove('light-mode'); // Ensure light-mode is removed
		} else {
			document.body.classList.remove('dark-mode');
			document.body.classList.add('light-mode'); // Add light-mode class if needed for specific light mode styles
		}
	}
	let isDropdownOpen = $state(false) // default state (dropdown close)

const handleDropdownClick = () => {
  isDropdownOpen = !isDropdownOpen // togle state on click
}

const handleDropdownFocusLoss = ({ relatedTarget, currentTarget }) => {
  // use "focusout" event to ensure that we can close the dropdown when clicking outside or when we leave the dropdown with the "Tab" button
  if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) return // check if the new focus target doesn't present in the dropdown tree (exclude ul\li padding area because relatedTarget, in this case, will be null) 
  isDropdownOpen = false
}
</script>

<div class="app">
	<nav>
		<div class="flex justify-between items-center">
			<div class="dropdown" onfocusout={handleDropdownFocusLoss}>
				<button class="btn m-1" onclick={handleDropdownClick} >
				{#if isDropdownOpen}
					<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										class="inline-block h-6 w-6 stroke-current">
										<title>Close Dropdown</title>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M6 18L18 6M6 6l12 12" />
									</svg>
					{:else}
					<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										class="inline-block h-6 w-6 stroke-current">
										<title>Open Dropdown</title>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M4 6h16M4 12h16M4 18h16" />
									</svg>
				{/if}
				</button>
				<ul class="dropdown-content menu p-2 shadow bg-base-100 rounded-box" style:visibility={isDropdownOpen ? 'visible' : 'hidden'}>
					<ul>
						<!-- <li><a href="/">Home</a></li> -->
						{#each routes as route}
							<li>
								<a href="/{route}" class="btn text-slate-300">
									{route.charAt(0).toUpperCase() + route.slice(1)}
								</a>
							</li>
						{/each}
					</ul>
				</ul>
			</div>
		</div>
		<div class="nav-content">
			<div class="logo">
				<a href="/">SvelteKit Demo</a>
			</div>
		</div>
		<!-- Dark Mode Toggle Button -->
		<div class="dropdown">
			<button class="btn m-1" onclick={toggleDarkMode}>
				{#if darkMode}
				<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									class="inline-block h-6 w-6 stroke-current">
									<title>Close Dropdown</title>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
								</svg>
				{:else}
				<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									class="inline-block h-6 w-6 stroke-current">
									<title>Open Dropdown</title>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
								</svg>
			{/if}
			</button>
		</div>

	</nav>

	<main>
		{@render children?.()}
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	nav {
		background-color: #ff875f;
		padding: 1rem;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.nav-content {
		max-width: 1200px;
		margin: 0 auto;
	}

	.logo a {
		color: white;
		font-size: 1.5rem;
		font-weight: bold;
		text-decoration: none;
	}

	main {
		flex: 1;
		padding: 0rem;
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
	}

	@media (max-width: 768px) {
		.nav-content {
			flex-direction: column;
			gap: 1rem;
		}
	}
	@media only screen and (max-width: 500px) { 
  		nav { 
			display: none; 
		} 
}

	/* Light Mode Styles (Default) */
	:global(body.light-mode) {
		background-color: #ffffff; /* Default light background */
		color: #333; /* Default dark text for light mode */
	}

	/* Dark Mode Styles */
	:global(body.dark-mode) {
		background-color: #1d3040; /* Dark background color */
		color: #bfc2c7; /* Light text color for dark mode */
	}
</style>