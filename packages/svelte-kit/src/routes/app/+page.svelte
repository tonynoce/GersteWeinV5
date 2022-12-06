<script lang="ts">
	
	import { onMount } from 'svelte';

	import { ethers } from 'ethers';

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


	import { changeNetwork, handleChainChanged, handleAccountsChanged, addGersteToken, addUSDCtToken } from "../stores/metamask"
	import { getWindowEthereum } from "../stores/metamask"

	onMount(() => {
		defaultEvmStores.setProvider();
	});

    async function getAllowance() {
		try {
			let allowanceCheck = await $contracts.USDCContract.allowance($signerAddress, GERSTEWEINCONTRACT)
			allowance.set(ethers.utils.formatEther(allowanceCheck));
			console.log($allowance)
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
	
	// mint function => checks != 0 => checks allowance first => checks if amount >= balance 
	// swap function => checks != 0 => checks if amount >= balance
</script>

<body>
	<h1>Compra - Venta</h1>

	{#key $signerAddress}
		
    {#if !$connected}
    <p>Conectando...</p>
	{/if}
	
	{#if $chainId === 80001}
	{#await getAllowance()}
    <span>Cargando...</span>
    {:then value}
	
    {#if $allowance == 0}
    <div>
		
		<h1>Hay que aprobar el contrato:</h1>
		<button
		on:click={() => {
			approveAllowance()
		}}>Aprobar el contrato</button
				>
			</div>
			
			{/if}
			
            {/await}
			
            {:else}
            <div>
				<h1> 
					Conectate a Mumbai Papu
                </h1>
                <button on:click={() => {changeNetwork()}}>Agregar red Mumbai</button>
			</div>
			{/if}
			<button
			on:click={() => {
				addGersteToken()
			}}>Añadir Gwt</button>
	{/key}
</body>