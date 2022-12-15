<script lang="ts">
    import { ethers } from "ethers";
	import { BigNumber } from "ethers";
    import { fromBn } from "evm-bn";

	import { contracts, signerAddress } from 'svelte-ethers-store';
    import { USDCbalance, GWTbalance} from "../../routes/stores/stores"

    import { fade } from "svelte/transition"


    //	import github from '$lib/images/github.svg';
    import usdcoin from "$lib/images/usdc-logo.svg"
    import GersteWeinCoin from "$lib/images/GersteWeinCoin.svg"

    export let coin:string;

    let balance:any;

    /**
     * @dev gets balance of input coin
    */
    export async function getBalance(coin:string) {
        try {
            if (coin == "GWT" ){
                balance = await $contracts.GersteWeinContract.balanceOf($signerAddress);
                balance = fromBn(BigNumber.from(balance), 6);
                balance = Number(balance).toFixed(2);
                $GWTbalance = balance;
                return balance
            }

            if (coin == "USD" ){
                balance = await $contracts.USDCContract.balanceOf($signerAddress);
                balance = fromBn(BigNumber.from(balance), 6);
                balance = Number(balance).toFixed(2);
                $USDCbalance = balance;
                return balance
            }   
        } catch (e) {
            console.log(e)
        }
    }

</script>



<div> 
    {#if (coin == "GWT")} 
    <div>
        <img src={GersteWeinCoin} alt="GWT token">
    </div>
        {#await getBalance("GWT")}
            <p>Cargando...</p>
        {:then value}
        <h2 transition:fade>
            {$GWTbalance}
        </h2> 
        {/await}
    {/if}  
    
    {#if (coin == "USD")} 
    <div>
        <img src={usdcoin} alt="USDC token">
    </div >
        {#await getBalance("USD")}
            <p>Cargando...</p>
        {:then value} 
        <h2 transition:fade>
            {$USDCbalance}
        </h2>
        {/await}    
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
        padding: 1vw;
        text-align: center;

    }

    img {
        width: 100px;
    }

    h2 {
        text-align: center;
        margin: auto;
    }
</style>