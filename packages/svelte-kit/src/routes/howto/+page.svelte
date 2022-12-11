<script lang="ts">
    import type { PageData } from './$types';
    
    export let data: PageData;
</script>


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
    
    img {
        position: fixed;
        z-index: 0;
    }

</style>