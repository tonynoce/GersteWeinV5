<script lang="ts">
	import { fade } from 'svelte/transition';
	export let url: URL;
</script>

{#key url}
	<div transition:fade={{ duration: 250, delay: 300 }} />
	<slot />
{/key}
