<script lang="ts">
	import {
		defaultEvmStores,
		connected,
		provider,
		chainId,
		//ChainData,
		signer,
		signerAddress,
		contracts
	} from 'svelte-ethers-store';

	import { ethers } from 'ethers';

	import GersteButton from "$lib/components/GersteButton.svelte"

	import GersteWein3DLogo from '$lib/components/GersteWein3DLogo.svelte';
	
	import { Canvas } from '@threlte/core';

</script>

<svelte:head>
	<title>GersteWein Token</title>
	<meta name="description" content="GersteWeuinToken dApp" />
	
</svelte:head>



<body>
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
</body>

<style>

	a {
		text-align: center;
	}

	.wrapper{
		min-height: 50vh;
		min-height: 50vh;
	}
</style>
