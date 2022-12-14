<script lang="ts">
	import GersteButton from "$lib/components/GersteButton.svelte"

	import GersteWein3DLogo from '$lib/components/GersteWein3DLogo.svelte';
	import { Canvas, T } from '@threlte/core';

	//size={{width: 00, height: 200}}
	let windowWidth:number;
</script>

<svelte:head>
	<title>GersteWein Token</title>
	<meta name="description" content="GersteWeinToken dApp" />
</svelte:head>

<svelte:window bind:innerWidth={windowWidth}/>

<main>
	<h1>GersteWeinToken</h1>
	<div class="text-column">
	</div>
	<div class=wrapper>
		<Canvas size={{width: windowWidth-15, height: 500}}>
			<GersteWein3DLogo />
			<T.PointLight position={[-5, 3, 10]} intensity={1} color={"rgb(20, 70, 220)"}/>
			<T.PointLight position={[5, 3, -10]} intensity={1} color={"rgb(20, 70, 220)"}/>
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
	}
</style>
