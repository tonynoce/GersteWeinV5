<script lang="ts">
    import { ethers } from "ethers";
	import { BigNumber } from "ethers";
    import { fromBn } from "evm-bn";

	import { contracts, signerAddress } from 'svelte-ethers-store';

    //	import github from '$lib/images/github.svg';
    import usdcoin from "$lib/images/usdc-logo.svg"
    import GersteWeinCoin from "$lib/images/GersteWeinCoin.svg"

    export let coin:string;

    let balance:any;

    /**
     * @dev gets balance of input coin
    */
    async function getBalance(coin:string) {
        try {
            if (coin == "GWT" ){
                balance = await $contracts.GersteWeinContract.balanceOf($signerAddress);
                balance = fromBn(BigNumber.from(balance), 6);
                balance = Number(balance).toFixed(2);
                return balance
            }

            if (coin == "USD" ){
                balance = await $contracts.USDCContract.balanceOf($signerAddress);
                balance = fromBn(BigNumber.from(balance), 6);
                balance = Number(balance).toFixed(2);
                return balance
            }   
        } catch (e) {
            console.log(e)
        }
    }

</script>



<div> 
    {#if (coin == "GWT")} 
        {#await getBalance("GWT")}
            <p>Cargando Balance de {coin}</p>
        {:then value} 
                {balance}
        {/await}
    <img src={GersteWeinCoin} alt="GWT token">
    {/if}  
    
    {#if (coin == "USD")} 
        {#await getBalance("USD")}
        <p>Cargando Balance de {coin}</p>
        {:then value} 
                {balance}
        {/await}    
        <img src={usdcoin} alt="USDC token">
    {/if}
    
</div>
<style>
    
    p {
        font-family: gersteWeinFont;
        font-size: 14pt;
    }

    div {
        font-family: gersteWeinFont;
        font-size: 24pt;
        padding: 1rem;
        text-align: center;
        size: 50px;
    }

</style>