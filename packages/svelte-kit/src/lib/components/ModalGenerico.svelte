<script lang="ts">
    import {fly} from "svelte/transition"

    export let showMe = false;

    export function hide() {
        showMe = false
    }
</script>

{#if (showMe === true)}
    <modal transition:fly="{{ x: -200, duration: 750 }}">
        <div class="wrapper">
            <div class = "modal">
                <!-- SLOT -->
                <slot/>
                <!-- Close button -->
                <div class="buttonWrapper"> 
                    <button
                    on:click={() => showMe = false}
                    >Cerrame</button>
                </div>
            </div>
        </div>
    </modal>
{/if}


<style>
    .wrapper{
        background-color: rgb(10, 48, 73);
        background-image: radial-gradient(farthest-corner at 20px 20px,rgba(31, 127, 172, 0.7) 25%, rgba(135, 20, 189, 0.25) 80%);
        position: fixed;
        top: 25vh;
        left: 25vw;
        width: 45vw;
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

    .buttonWrapper {
        margin-top: 10%;
        text-align: right;
    }

</style>