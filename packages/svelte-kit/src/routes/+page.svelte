<script lang="ts">
	import GersteButton from "$lib/components/GersteButton.svelte"

	import GersteWein3DLogo from '$lib/components/GersteWein3DLogo.svelte';
	import { Canvas } from '@threlte/core';
	
</script>

<svelte:head>
	<title>GersteWein Token</title>
	<meta name="description" content="GersteWeinToken dApp" />
	
</svelte:head>



<main>
	<h1>GersteWeinToken</h1>
	<div class="text-column">
	</div>
	<div class=wrapper>
		<Canvas>
			<GersteWein3DLogo />
		</Canvas>
	</div>
	<div>
		<h2>
			Bienvenido!
		</h2>
	</div>
	<div class="text-column">
		<a href="/app"><GersteButton>Entrar a la app</GersteButton></a>
	</div>
</main>

<style>

	a {
		text-align: center;
	}

	.wrapper{
		background-image: radial-gradient(rgba(35, 65, 75, 0.442) 10%, rgba(102, 51, 153, 0) 60%);
		width: 100%;
	}
</style>
