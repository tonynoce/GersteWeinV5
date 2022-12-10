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
	import NumberInput from '$lib/components/NumberInput.svelte'
	import CoinInfo from "$lib/components/CoinInfo.svelte"

	import { changeNetwork, handleChainChanged, handleAccountsChanged, addGersteToken, addUSDCtToken } from "../stores/metamask"
	import { getWindowEthereum } from "../stores/metamask"
	

	/**
	 * @dev Prompt metamask to connect
	 * and go to the mumbai network
	*/
	onMount(() => {
		defaultEvmStores.setProvider();

		if ($chainId != 80001) {
			changeNetwork()
		}
	});
	
	let allowanceCheck:any;
	let numberCito:number = 0;
	
	let isInstalled:boolean;
	let onboardingOn;
	
	$:numberCito

	// mint function => checks != 0 => checks allowance first => checks if amount >= balance 
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
			$contracts.GersteWeinContract.swapMeSome(amount2);
		}  catch (e) {
			console.log(e);
		}
	}
	} 
	
	// check if onboarding needs to be done
	function isMetamaskInstalled() {
		isInstalled = getWindowEthereum();
		if (isInstalled === undefined) {
			onboardingOn = true;
			isInstalled = false;
			console.log(isInstalled, " metamask no ta instalado")
		} return false
	}

	isMetamaskInstalled()
	
</script>

{#if isInstalled == false}
<body>
	<div>
		<h1>Hay que instalar Metamask</h1>
	</div>
	<div style= "text-align: center">
		
		<a href="https://metamask.io/" target="_blank" rel="noreferrer">
			<GersteButton>Llevame a Metamask
		</GersteButton></a>
	</div>
</body>

	{:else}
{#key $signerAddress}
		
<body>	
	<h1>Compra - Venta</h1>
	
    {#if !$connected}
    	<p  style= "text-align: center">Conectando...</p>
	{/if}
	
	{#if $chainId === 80001}
				
		<h1>
			{numberCito}
		</h1>

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
		<div  style="text-align: center"
		>
		<p>
			Conectado con la cuenta:
		</p>
		<h3>
			{$signerAddress}
		</h3>
	</div>
	<div
	class="coins"
	>
		<CoinInfo coin={"GWT"}/>
		<CoinInfo coin={"USD"}/>
	</div>

	<div
	style="text-align: center; padding: 2rem">
		<GersteButton
		on:click={() => {
			addGersteToken()
		}}>Add GWT a Metamask
		</GersteButton>
	</div>

	</body>

{/key}
{/if}

<style>

	div {
		margin: 1em;
	}

	input {
		font-family: gersteWeinFont;
	}

	.coins{
		display: flex;
		margin: 3rem;
		justify-content: center;
	}

</style>