<script lang="ts">
	import GersteButton from "$lib/components/GersteButton.svelte"
	import ModalGenerico from "$lib/components/ModalGenerico.svelte";

	import GersteWein3DLogo from '$lib/components/GersteWein3DLogo.svelte';
	import { Canvas, T } from '@threlte/core';
	import { onMount } from "svelte";

	//size={{width: 00, height: 200}}
	// size={{width: windowWidth-15, height: 500}}
	let windowWidth:number;
	let showMe:boolean;

	onMount(() => {
		showMe = true
	})
</script>

<svelte:head>
	<title>Gerste Wein Token</title>
	<meta name="description" content="GersteWeinToken dApp" />
</svelte:head>

<svelte:window bind:innerWidth={windowWidth}/>

<body>
	<div class="text-column">
	<h1>Gerste Wein Token</h1>
	</div>
	<div class=wrapper>
		<Canvas>
			<GersteWein3DLogo />
			<T.PointLight position={[-5, 3, 10]} intensity={0.5} color={"rgb(70, 70, 80)"}/>
			<T.PointLight position={[5, 3, -10]} intensity={0.5} color={"rgb(70, 70, 80)"}/>
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
</body>

<ModalGenerico {showMe}>
	<h1>La app esta en Beta</h1>
	<p>Por el momento está deployeada en Mumbai<br/>
	Si vas a "Cómo Funciona" vas a poder pedir tanto USD cómo Matic<br/>
	para interactuar con la app.</p>
</ModalGenerico>

<style>

	a {
		text-align: center;
	}

	.wrapper{
		background-image: radial-gradient(rgba(35, 65, 75, 0.442) 10%, rgba(102, 51, 153, 0) 60%);
		min-width: 70vw;
		min-height: 50vh;
		cursor: grab;
	}
	
</style>
