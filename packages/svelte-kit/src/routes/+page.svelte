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
	
	import { GERSTEWEINCONTRACT, USDCONTRACT, MUMBAINETWORK} from "./stores/stores"
	
	import { Canvas } from '@threlte/core';
	
	import { GWTabi } from '../lib/ABI/GWTabi';
	import { USDCabi } from '../lib/ABI/USDCabi';
	// instantiate GWT contract
	let gwtcontract = new ethers.Contract(GERSTEWEINCONTRACT, GWTabi, $signer);
	defaultEvmStores.attachContract('GersteWeinContract', GERSTEWEINCONTRACT, GWTabi);

	// instantiate USDC contract
	let usdccontract = new ethers.Contract(USDCONTRACT, USDCabi, $signer);
	defaultEvmStores.attachContract('USDCContract', USDCONTRACT, USDCabi);

	function handleClick() {
		alert('clicked')
	}

</script>

<svelte:head>
	<title>GersteWein Token</title>
	<meta name="description" content="GersteWeuinToken dApp" />
	
</svelte:head>



<body>
	<h1>GersteWeinToken</h1>
	<div class="text-column">
	</div>
		<Canvas>
				<GersteWein3DLogo />
		</Canvas>
	<div>
		<h2>
			Bienvenido!
		</h2>
	</div>
	<div class="text-column">
		<a href="/app"><GersteButton>Entrar a la app</GersteButton></a>
			<!-- 		<a href="/app" class="text-column">Entrar a la app</a>
 -->	</div>
</body>

<style>
	a{
		text-align: center;
	}
</style>
