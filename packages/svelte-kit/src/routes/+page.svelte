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

	import { GWTabi } from '../lib/ABI/GWTabi';
	import { USDCabi } from '../lib/ABI/USDCabi';

	import GersteWein3DLogo from '$lib/components/GersteWein3DLogo.svelte';

	import { GERSTEWEINCONTRACT, USDCONTRACT, MUMBAINETWORK} from "./stores/stores"

	import { Canvas } from '@threlte/core';
	import { Scene } from 'three';



	// instantiate GWT contract
	let gwtcontract = new ethers.Contract(GERSTEWEINCONTRACT, GWTabi, $signer);
	defaultEvmStores.attachContract('GersteWeinContract', GERSTEWEINCONTRACT, GWTabi);

	// instantiate USDC contract
	let usdccontract = new ethers.Contract(USDCONTRACT, USDCabi, $signer);
	defaultEvmStores.attachContract('USDCContract', USDCONTRACT, USDCabi);


</script>

<svelte:head>
	<title>GersteWein Token</title>
	<meta name="description" content="GersteWeuinToken dApp" />
</svelte:head>




<body>
	<div class="text-column">
		<h1>GersteWeinToken</h1>
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
		<a href="/app" class="text-column">Entrar a la app</a>
	</div>
	
</body>

<style>
</style>
