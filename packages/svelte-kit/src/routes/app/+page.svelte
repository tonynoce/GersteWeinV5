<script lang="ts">
	
	import { onMount } from 'svelte';

	import { ethers } from 'ethers';
	import { BigNumber } from "ethers";


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

    import { GERSTEWEINCONTRACT, USDCONTRACT, MUMBAINETWORK} from "../stores/stores"
	import { allowance } from "../stores/stores"

	import GersteButton from "$lib/components/GersteButton.svelte"
	import NumberInput from '$lib/components/NumberInput.svelte';


	import { changeNetwork, handleChainChanged, handleAccountsChanged, addGersteToken, addUSDCtToken } from "../stores/metamask"
	import { getWindowEthereum } from "../stores/metamask"

	let onboardingOn = false;
	

	onMount(() => {
		defaultEvmStores.setProvider();
	});

	let numberCito:number = 0;
	$:numberCito

	let allowanceCheck:any;

    async function getAllowance() {
		try {
			console.log(`${$signerAddress}, ${GERSTEWEINCONTRACT}`)
			allowanceCheck = await $contracts.USDCContract.allowance($signerAddress, GERSTEWEINCONTRACT)
			allowanceCheck = ethers.utils.formatEther(allowanceCheck);
			
			$allowance = allowanceCheck;
			
			return allowanceCheck
				} catch (e) {
			console.log(e);
		}
	}
		
	async function approveAllowance() {
		let allowanceToApprove = ethers.utils.parseEther('999999');
		try {
			$contracts.USDCContract.approve(GERSTEWEINCONTRACT, allowanceToApprove);
		} catch (e) {
			console.log(e);
			return false;
		}
		return true;
	}
	
	async function mintMeSome() {
		let amount2 = numberCito*1e6;
		try {
			$contracts.GersteWeinContract.mintMeSome(amount2);
		} catch (e) {
			console.log(e);
			return false;
		}
		return true;
	}
	
	// mint function => checks != 0 => checks allowance first => checks if amount >= balance 
	async function buyGWT() {
		if (numberCito != 0) {		
		await getAllowance();
		if (allowanceCheck != 0) {
			await mintMeSome();
		} else {
			await approveAllowance();
			await mintMeSome();
		}
	}
	}	

	// swap function => checks != 0 => checks if amount >= balance
	async function sellGWT() {
		if (numberCito != 0) {		
			let amount2 = numberCito*1e6;
		try {
			$contracts.GersteWeinContract.mintMeSome(amount2);
		}  catch (e) {
			console.log(e);
		}
	}
	}
	
	const isMetamaskInstalled = () => {
		let isInstalled = getWindowEthereum();
		//console.log(isInstalled, " no ta instalado")
		if (isInstalled === undefined) {
			onboardingOn = true;
		} return false
	}

	
	
</script>

<body>
	<h1>Compra - Venta</h1>
	{#if isMetamaskInstalled() == true}
	hay que
		{:else}
	{/if}
	
	{#key $signerAddress}
		
    {#if !$connected}
    <p>Conectando...</p>
	{/if}
	
	{#if $chainId === 80001}
			
	<h1>
		{numberCito}
	</h1>
	<!-- 			<div style="input text-align:center"> 
		<NumberInput
		bind:numberCito 
		/>
	</div> -->
	<div style= "text-align: center; font-size:26pt">
		<input 
				type=number
				min="0" max="100"
				bind:value={numberCito}
				>
			</div>
			<div style= "text-align: center">
				<GersteButton
				on:click={() => {buyGWT()}}
				>Comprar</GersteButton>
				<GersteButton
				on:click={() => {sellGWT()}}
				>vender</GersteButton>
			</div>
			{:else}
			<div style="text-align: center"
			>
				<h1 > 
					Conectate a Mumbai Papu
				</h1>
				<button
				 on:click={() => {changeNetwork()}}>Agregar red Mumbai</button>
			</div>
			{/if}
	<div class="text-column">
		<button
		style="text-align: center"
	on:click={() => {
		addGersteToken()
	}}>Añadir Gwt</button>
	</div>
	{/key}
</body>

<style>
	input {
		font-family: gersteWeinFont;
	}
</style>