<script lang="ts">
    import {fly} from "svelte/transition"

    export let txHash:string;
    export let allowanceChecked:boolean;
    export let showMe = false;

    export function hide() {
        showMe = false
    }
</script>

{#if (showMe === true)}
    <main  transition:fly="{{ x: -200, duration: 2000 }}">
        <div class="wrapper">
            <div class = "modal">
                {#if (allowanceChecked != false)}
                <p>
                    &#10004; Contrato Aprobado
                </p>
                {/if}
                {#key txHash}
                    
                {#if (txHash === undefined)}
                    <p>Mandando...</p>
                    {:else}
                    <p>&#10004; Transacción mandada
                    </p>
                        <a
                        href="https://mumbai.polygonscan.com/tx/{txHash}"
                        target="_blank"
                        >Mirá la transacción en etherscan</a>
                    {/if}
                {/key}
                <slot/>
                <div class="buttonWrapper"> 
                    <button
                    on:click={() => showMe = false}
                    >Cerrame</button>
                </div>
            </div>
        </div>
    </main>
{/if}


<style>
    .wrapper{
        position: fixed;
        top: 25vh;
        width: 35vw;
        height: 25vh;
        overflow: auto;

        box-shadow: 0px 0px 120px 10px rgba(255, 46, 238, 0.75);
    }

    .modal {
        background-color: rgb(18, 65, 97);
        max-width: 80vw;
        padding: 1rem;
        margin: auto;

    }

    .buttonWrapper {
        text-align: right;
    }

</style>