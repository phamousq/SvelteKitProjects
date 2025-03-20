<script lang="ts">
	import { onMount } from 'svelte';
	import { Button, MenuButton, NavItem, Dialog, Drawer, Menu, MenuItem, TextField, Toggle } from 'svelte-ux';
	import '../app.css';
	import { settings, ThemeInit, ThemeSelect } from 'svelte-ux';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

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
	<nav class="bg-orange-300 grid grid-cols-3 gap-3 items-center justify-items-start">
		<NavItem currentUrl={$page.url} path="/">
		  <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">SvelteKit Projects</span>
		</NavItem>
		<Toggle let:on={open} let:toggle let:toggleOff>
			<Button on:click={toggle}>
				Nav
			  <Menu {open} matchWidth on:close={toggleOff}>
				<MenuItem onclick={() => goto('/')}>
					Home
				</MenuItem>
				{#each routes as route}
					<MenuItem onclick={() => goto(route)}>
						{route.charAt(0).toUpperCase() + route.slice(1)}
					</MenuItem>
				{/each}
			  </Menu>
			</Button>
		  </Toggle>
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
