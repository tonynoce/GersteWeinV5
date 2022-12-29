<svelte:head>
	<title>About</title>
	<meta name="description" content="About this dApp" />
</svelte:head>


<body>
	<div class="text-column">
		<h1>Acerca de Gerste Wein</h1>
	</div>
	<!-- 
		<img src="GersteWeinLocal_1000px.jpg" alt="GersteWein al atardecer">
	-->
	<picture>
		<source media="(max-width: 600px)" srcset="GersteWeinLocal_600px.jpg" />
		<source media="(min-width: 999px)" srcset="GersteWeinLocal_1000px.jpg" />
		<img src="GersteWeinLocal_1000px.jpg" alt="GersteWein al atardecer">
	</picture>
	<div class="text-wrapper">
		<p>Gerste Wein es un almacén de bebidas ubicado en Berazategui.</p>	
		<p>La idea de este token surgio luego de varias charlas y con la propuesta de
			acercar el mundo crypto a la gente y las cervezas.
		</p>
		<p>Utilice bajo su responsabilidad, cómo su bebida.
		</p>
		</div>
</body>
		
		
<style>
/* 	body {
		margin-left: 10vw;
		margin-right: 10vw;
	} */

	picture {
		margin: auto;
	}

	.text-wrapper {
		font-family: 'Courier New', Courier, monospace;
		font-size: 14pt;
		margin-left: 3vw;
		margin-right: 3vw;
	}

</style>