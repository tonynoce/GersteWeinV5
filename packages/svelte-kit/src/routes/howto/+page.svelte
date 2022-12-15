<script lang="ts">
    import { onMount } from 'svelte';
    import type { PageData } from './$types';
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
    
    import GersteButton from "$lib/components/GersteButton.svelte"
    import TxHashModal from '$lib/components/TxHashModal.svelte';

    const faucetUSDCcontractAddress = "0xFEca406dA9727A25E71e732F9961F680059eF1F9"
    const faucetUSDABI = ["function mintTokens(uint _numberOfTokens) external"]

    onMount(() => {
		defaultEvmStores.setProvider();
	});

    defaultEvmStores.attachContract('faucetUSDCcontract', faucetUSDCcontractAddress, faucetUSDABI);

    //	defaultEvmStores.attachContract('GersteWeinContract', GERSTEWEINCONTRACT, GWTabi);
    let faucetUSDCcontract = new ethers.Contract(faucetUSDCcontractAddress, faucetUSDABI, $signer);

    let txHash:any;
	let showMe = false;

	$: txHash

    /**
     * @dev interface to handle metamask errors
    */
    interface ProviderRpcError extends Error {
        message: string;
        code: number;
        data?: unknown;
    }   

    async function getMeFaucetUSD() {
        try {
            showMe = true;
            let tx = await $contracts.faucetUSDCcontract.mintTokens("100");
            
            txHash = tx.hash;
            await $provider.waitForTransaction(txHash)
            showMe = false;
        } catch (e:any) {
            //console.log(e)
            //let metamaskError = Object.keys(e)
            let metamaskError: ProviderRpcError = e
            console.log(metamaskError.message)
            console.log(metamaskError.code)
            console.log(metamaskError.data)
            showMe = false;
        }
    }
    
    export let data: PageData;
</script>

<TxHashModal {showMe} {txHash}>
</TxHashModal>

<body>
    <h1>Como funciona?</h1>

    <div class="text-wrapper">
        <p>
            El primer paso es adquirir Matic para poder interactuar con la blockchain.
        </p>
        <p>
            El segundo paso es conseguir USDC en un swap.
        </p>
        <p>
            El tercer paso es cambiar USDC por GWT en este sitio.
        </p>
        <p>
            El cuarto paso es cambiar ese GWT por una pinta de su gusto en Gerstewein !            
        </p>
    </div>

    <div class="text-wrapper">
        <h2>Faucet</h2>
        <p>La app se encuentra en modo testeo así que podés conseguir 100usd de la faucet</p>
    </div>
    <div class="text-column">
        <GersteButton
        on:click={() => {getMeFaucetUSD()}}
        >
        Conseguir 100USD
        </GersteButton>
    </div>
</body>


<style>
    .text-wrapper {
		max-width: 48rem;
		flex: 0.3;
		flex-direction: column;
		justify-content: center;
		margin: 0 auto;
		font-family: 'Courier New', Courier, monospace;
		font-size: 14pt;
	}
</style>