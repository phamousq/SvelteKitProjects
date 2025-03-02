<script lang="ts">
	import { onMount } from 'svelte';
	import { Button, Dropdown, DropdownItem, DropdownDivider, Navbar, NavBrand, NavHamburger, NavUl, NavLi } from 'flowbite-svelte';
	import { ChevronDownOutline } from 'flowbite-svelte-icons';
	import '../app.css';
	import { settings, ThemeInit, ThemeSelect } from 'svelte-ux';

	settings({
		themes: {
			light: ['light'],
			dark: ['dark'],
		},
		components: {
			Button: {
				// same as <Button class="flex-2">
				classes: 'flex-2',
				// All component that wrap Button will also use this variant by default,
				variant: 'outline',
			},
			Field: {
				// All components based on Field will use this as well.
				labelPlacement: 'top',
			},
			TextField: {
				classes: {
				// same as <TextField classes={{ container: '...' }}>
				container: 'hover:shadow-none group-focus-within:shadow-none',
				},
			},
		},
	});

	let { children } = $props();
	let routes: string[] = $state([]);
	onMount(async () => {
		const response = await fetch('/api/routes');
		routes = await response.json();
	});
</script>

<main class="app">
	<ThemeInit />
	<nav style="background-color: orange;">
		<NavBrand href="/">
		  <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">SvelteKit Projects</span>
		</NavBrand>
		<div class="grid grid-cols-[auto,1fr] gap-3 items-center justify-items-start">
			<ThemeSelect />
		</div>
		<Button><ChevronDownOutline class="w-6 h-6 text-white dark:text-white" /></Button>
		<Dropdown>
			{#each routes as route}
				<DropdownItem href="/{route}" class="text-white dark:text-white">
					{route.charAt(0).toUpperCase() + route.slice(1)}
				</DropdownItem>
			{/each}
		</Dropdown>
	  </nav>

	<main>
		{@render children?.()}
	</main>
</main>

<style>
	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem;
	}

	@media only screen and (max-width: 500px) { 
  		nav { 
			display: none; 
		} 
	}
</style>
