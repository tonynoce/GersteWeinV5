<svelte:head>
	<title>About</title>
	<meta name="description" content="About this dApp" />
</svelte:head>

<div class="text-column">
	<h1>Acerca de GersteWein</h1>
</div>
	
<div class="img-wrapper">
	<img src="GersteWeinLocal_1000px.jpg" alt="GersteWein al atardecer">
</div>

<div class="text-wrapper">
	<p>Gerste Wein es un almacén de bebidas ubicado en Berazategui.</p>	
	<p>Este token es un contrato que ejecuta una conversión de USDC a GWT Si es la primera vez que lo
		utiliza, va a tener que aprobar el contrato para poder comprar / vender.
	</p>
	<p>La seguridad del mismo está forzada por la inmutabilidad del código,<br/>
		que se encuentra alojado en la red Matic.</p>
</div>


<style>
	.img-wrapper {
		max-width: 48rem;
		flex: 0.6;
		flex-direction: column;
		justify-content: center;
		margin: 0 auto;
	}

	img {
		width: 50vw;
	}

	.text-wrapper {
		max-width: 48rem;
		flex: 0.3;
		flex-direction: column;
		justify-content: center;
		align-content: center;
		font-family: 'Courier New', Courier, monospace;
		font-size: 14pt;
	}

</style>