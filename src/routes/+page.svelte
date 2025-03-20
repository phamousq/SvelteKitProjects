<script lang="ts">
    import Projects from './projects/+page.svelte';
</script>

<div class="home">
    <h1>Welcome to SvelteKit</h1>
    <p>This is a demo application showcasing SvelteKit routing and layouts.</p>

    <Projects/>
</div>

<style>
    .home {
        text-align: left;
        padding: 0.25rem;
    }

    h1 {
        color: #000000;
        font-size: 2rem;
        margin-top: 1rem;
    }

    p {
        color: #444;
        font-size: 1.2rem;
        line-height: 1.6;
    }
</style>
