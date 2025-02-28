<script lang="ts">
    import { onMount } from "svelte";
    
    let routes: string[] = [];
    onMount(async () => {
        const response = await fetch('/api/routes');
        routes = await response.json();
    });

</script>

<div style=" padding: 20px;">
    <!-- <h1>Projects (API, SSR)</h1> -->

    <ol>
        {#each routes as route}
            <li>
                <a href="/{route}">{route}</a>
            </li>
        {/each}
    </ol>
</div>

<style>
    ol li {
    list-style: decimal;
    list-style-position: inside;
}
</style>