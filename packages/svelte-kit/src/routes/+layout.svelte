<script>
	import Header from '../lib/components/Header.svelte';

	import './styles.css';
</script>

<div class="app">
</div>
<Header />
<main>
	<slot />
</main>
<footer>
	<p>Hecho con &#x1F496 por <a>BLOCK33</a></p>
</footer>
	
	
	
	


<style>
/* 
		main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}
 */
 /* 	
 	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	} */

	footer {
		margin-top:92vh;
		position: fixed;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		color: var(--color-theme-1);
		font-weight: bold;
	}


</style>
