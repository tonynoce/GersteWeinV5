<script lang="ts">
    import { fly } from "svelte/transition"

    import {showMe} from "../../routes/stores/stores"

    export let txHash:string;
    export let allowanceCheck:boolean;
    //export let showMe:boolean;
	export let getMetamaskError:ProviderRpcError = undefined;

    /**
     * @dev interface to handle metamask errors
    */
    interface ProviderRpcError extends Error {
        message: string;
        code: number;
        data?: unknown;
    }  

    /* $: showMe; */
    $: allowanceCheck;

    export function hide() {
        $showMe = false;
        getMetamaskError = undefined;
    }
    export function show() {
        $showMe = true;
    }
</script>

{#if ($showMe === true)}
    <main transition:fly="{{ x: -200, duration: 1500 }}">
        <div class="wrapper">
            <div class = "modal">
                <!-- Checks allowance -->
                {#key allowanceCheck}
                    {#if (allowanceCheck == true)}
                        <p>
                            &#10004; Contrato Aprobado
                        </p>
                    {/if}
                
                    {#if (allowanceCheck == false)}
                        <p>
                            &#10004; Aprobando el contrato...
                        </p>
                    {/if}
                {/key}
                <!-- Print txHash -->
                {#key txHash}    
                {#if (txHash == undefined)}
                    <p>Mandando transacción...</p>
                    {:else}
                    <p>&#10004; Transacción mandada
                    </p>
                        <a
                        href="https://mumbai.polygonscan.com/tx/{txHash}"
                        target="_blank"
                        >Mirá la transacción en etherscan</a>
                    {/if}
                {/key}

                <!-- Print metamask error -->
                {#key getMetamaskError}
                    {#if (getMetamaskError != undefined)}
                        <p>
                            <!-- {getMetamaskError} -->
                            {getMetamaskError.code}
                        </p>
                        <p>
                            {getMetamaskError.message}
                        </p>
                    {/if}
                {/key}
                
                <!-- SLOT -->
                <slot/>
                <!-- Close button -->
                <div class="buttonWrapper"> 
                    <button
                    on:click={() => hide()}
                    >Cerrame</button>
                </div>
            </div>
        </div>
    </main>
{/if}


<style>

    .wrapper{
        background-color: rgb(7, 25, 63, 0.65);
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
    }
    
    .modal {
        border-radius: 5px;
        max-width: 80vw;
        padding: 5%;
        margin: 15% auto;
        background-image: radial-gradient(farthest-corner at 20px 20px,rgba(31, 127, 172, 0.7) 25%, rgba(135, 20, 189, 0.25) 80%);
        background-color: rgb(10, 48, 73, 1);
    }

    /** @dev this was experimentation and a poor choice of ccs
    .wrapper{
        background-color: rgb(10, 48, 73);
        background-image: radial-gradient(farthest-corner at 20px 20px,rgba(31, 127, 172, 0.7) 25%, rgba(135, 20, 189, 0.25) 80%);
        position: fixed;
        top: 25vh;
        left: 25vw;
        width: 25vw;
        max-width: auto;
        min-height: 15vh;
        border-radius: 5px;
        box-shadow: 0px 0px 120px 10px rgba(2, 115, 207, 0.75);
    }
    
    .modal {
        max-width: 80vw;
        padding: 1rem;
        margin: auto;
    }
    */

    .buttonWrapper {
        margin-top: 5%;
        text-align: right;
    }


</style>