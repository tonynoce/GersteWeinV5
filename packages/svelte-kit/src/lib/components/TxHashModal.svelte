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
        background-color: rgb(10, 48, 73);
        background-image: radial-gradient(farthest-corner at 20px 20px,rgba(31, 127, 172, 0.7) 25%, rgba(135, 20, 189, 0.25) 80%);
        position: fixed;
        top: 25vh;
        width: 45vw;
        min-height: 15vh;
        border-radius: 5px;
        box-shadow: 0px 0px 120px 10px rgba(2, 115, 207, 0.75);
    }
    
    .modal {
        max-width: 80vw;
        padding: 1rem;
        margin: auto;
    }

    .buttonWrapper {
        margin-top: 20%;
        text-align: right;
    }

</style>