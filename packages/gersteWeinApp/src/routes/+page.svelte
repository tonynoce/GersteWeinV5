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

	import { onMount } from 'svelte';
	import {} from '$app/stores';

	import { ethers } from 'ethers';

	import { GWTabi } from '../lib/ABI/GWTabi';
	import { USDCabi } from '../lib/ABI/USDCabi';

	const GERSTEWEINCONTRACT = '0xC45d511faC07A484f9875C823eA495fb7079Bd88';
	const USDCONTRACT = '0xFEca406dA9727A25E71e732F9961F680059eF1F9';

	onMount(() => {
		defaultEvmStores.setProvider();
	});

	// instantiate GWT contract
	let gwtcontract = new ethers.Contract(GERSTEWEINCONTRACT, GWTabi, $signer);
	defaultEvmStores.attachContract('GersteWeinContract', GERSTEWEINCONTRACT, GWTabi);

	// instantiate USDC contract
	let usdccontract = new ethers.Contract(USDCONTRACT, USDCabi, $signer);
	defaultEvmStores.attachContract('USDCContract', USDCONTRACT, USDCabi);

	// stores
	let allowance: number;
	$: allowance;

	// getAllowance
	async function getAllowance() {
		try {
			allowance = await $contracts.USDCContract.allowance($signerAddress, GERSTEWEINCONTRACT);
			return allowance;
		} catch (e) {
			console.log(e);
		}
	}

	async function approveAllowance() {
		let allowanceToApprove = ethers.utils.parseEther('999999');
		try {
			$contracts.USDCContract.approve(GERSTEWEINCONTRACT, allowance);
		} catch (e) {
			console.log(e);
			return false;
		}
		return true;
	}

	// mint function
	// swap function
</script>

<svelte:head>
	<title>GersteWein Token</title>
	<meta name="description" content="GersteWeuinToken dApp" />
</svelte:head>

<div class="text-column">
	<h1>GersteWeinToken</h1>
	<p>1 USDC = 1 Gerstewein Token</p>
</div>
<body>
	{#if !$connected}
		<p>Conectando...</p>
	{:else}
		<p>Conectado a la cadena con id {$chainId} con la cuenta {$signerAddress}</p>
	{/if}
	{#if $chainId === 80001}
		<p>Conectado a Mumbai</p>

		{#await getAllowance()}
			<!--{#await $contracts.USDCContract.allowance($signerAddress, GERSTEWEINCONTRACT)}  -->
			<span>Cargando...</span>
		{:then value}
			{#if value == 0}
				<p />
				<button
					on:click={() => {
						approveAllowance();
					}}>Aprobar el contrato</button
				>
			{/if}
		{/await}
	{:else}
		Conectate a Mumbai Papu
	{/if}
</body>

<style>
</style>
