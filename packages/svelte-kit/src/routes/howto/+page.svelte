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
        showMe = true;
        try {
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
        <!-- AI video... -->
        <h3>Tito te explica: </h3>
        <div style="position: relative; overflow: hidden; padding-top: 56.25%; margin-bottom: 15px;"><iframe src="https://share.synthesia.io/embeds/videos/d06e2042-0fc5-46ac-92dc-4ca2f4eff080" loading="lazy" title="Synthesia video player - Your AI video" allow="encrypted-media; fullscreen;" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; border: none; padding: 0; margin: 0; overflow:hidden;"></iframe></div>
        <li>
            El primer paso es adquirir Matic para poder interactuar con la blockchain.
        </li>
        <li>
            El segundo paso es conseguir USDC en un swap.
        </li>
        <li>
            El tercer paso es cambiar USDC por GWT en este sitio.
        </li>
        <li>
            El cuarto paso es cambiar ese GWT por una pinta de su gusto en Gerstewein !            
        </li>
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
    <div class="text-wrapper">
        <h2>Matic Faucet</h2>
        <p>
            Si necesitás matic podés pedir en la faucet oficial
        </p>
    </div>
    <div>
        <a href="https://faucet.polygon.technology/" target="_blank">
            <GersteButton>
                Conseguir Matic
            </GersteButton>
        </a>
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