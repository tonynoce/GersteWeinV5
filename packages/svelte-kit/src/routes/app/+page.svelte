<script lang="ts">
	import { onMount } from 'svelte';

	import { ethers } from 'ethers';
	import { BigNumber } from "ethers";
	import { fromBn } from "evm-bn";

	import { fade } from "svelte/transition"

	import {
		defaultEvmStores,
		connected,
		provider,
		chainId,
		//ChainData,
		signer,
		signerAddress,
		contracts
	} from 'svelte-ethers-store';

	
	import GersteButton from "$lib/components/GersteButton.svelte"
	import NumberInput from '$lib/components/NumberInput.svelte'
	import CoinInfo from "$lib/components/CoinInfo.svelte"
	import TxHashModal from '$lib/components/TxHashModal.svelte';

	
	import { changeNetwork, handleChainChanged, addGersteToken, addUSDCtToken } from "../stores/metamask"
	import { getWindowEthereum } from "../stores/metamask"
	
	import {showMe} from "../../routes/stores/stores"
	import { GERSTEWEINCONTRACT, USDCONTRACT, MUMBAINETWORK, USDCbalance, GWTbalance} from "../stores/stores"
	import { GWTabi } from '$lib/ABI/GWTabi';
	import { USDCabi } from '$lib/ABI/USDCabi';
	import { allowance } from "../stores/stores"

	import beer from "$lib/images/Beers/Beer_2.png"
	import beerEmpty from "$lib/images/Beers/Beer_2_empty.png"

	// instantiate GWT contract
	let gwtcontract = new ethers.Contract(GERSTEWEINCONTRACT, GWTabi, $signer);
	defaultEvmStores.attachContract('GersteWeinContract', GERSTEWEINCONTRACT, GWTabi);

	// instantiate USDC contract
	let usdccontract = new ethers.Contract(USDCONTRACT, USDCabi, $signer);
	defaultEvmStores.attachContract('USDCContract', USDCONTRACT, USDCabi);

	/**
	 * @dev Prompt metamask to connect
	 * and go to the mumbai network
	*/
	onMount(() => {
		defaultEvmStores.setProvider();

		if ($chainId != 80001) {
			changeNetwork()
		}
	});
	
	let allowanceCheck:any;
	let numberCito:number = 0;
	
	let isInstalled:boolean;
	let onboardingOn;

	let txHash:any;

	let weBuying:number = 0;
	let weSelling:number = 0;

	let metamaskError: ProviderRpcError;
	let metamaskMessage:ProviderMessage;
	let getMetamaskError:any = undefined;

	$: numberCito
	$: txHash
	$: getMetamaskError
	$: weBuying
	$: weSelling


	$:{
		if (numberCito == 10) {
			alert('Ojo con el h??gado !')
		}
	}

	$:{
		if (numberCito == 33) {
			alert('Todo sucede c??mo debe suceder.')
		}
	}
	/**
     * @dev interface to handle metamask messages
    */
	interface ProviderMessage {
	  	type: string;
  		data: unknown;
	}

	/**
     * @dev interface to handle metamask errors
    */
    interface ProviderRpcError extends Error {
        message: string;
        code: number;
        data?: unknown;
    }  

	// mint function => checks != 0 => checks allowance first => checks if amount >= balance 
    async function getAllowance() {
		try {
			//console.log(`${$signerAddress}, ${GERSTEWEINCONTRACT}`)
	
			$allowance = await $contracts.USDCContract.allowance($signerAddress, GERSTEWEINCONTRACT);
			//console.log(`allowance es ${$allowance}`)

			if ($allowance == 0) {
				allowanceCheck = false;
			} else {
				allowanceCheck = true;
			}
			
			return allowanceCheck
		} catch (e:any) {
			metamaskError = e
            //console.log("MESSAGE: ", metamaskError.message)
            console.log("CODE: ",metamaskError.code);
			getMetamaskError = metamaskError;
            //console.log("DATA: ",metamaskError.data)
		}
	}
		
	async function approveAllowance() {
		let allowanceToApprove = ethers.utils.parseEther('999999999999');
		try {
			const tx = await $contracts.USDCContract.approve(GERSTEWEINCONTRACT, allowanceToApprove);
			txHash = tx.hash;
			await $provider.waitForTransaction(txHash);
			console.log(txHash);
			// recheck allowance after
			await getAllowance()
		} catch (e:any) {
			metamaskError = e
            console.log("CODE: ",metamaskError.code);
			getMetamaskError = metamaskError;
            //console.log("DATA: ",metamaskError.data)
			return false;
		}
		return true;
	}

	async function getGWTbalance() {
		let balance = await $contracts.GersteWeinContract.balanceOf($signerAddress);
		balance = fromBn(BigNumber.from(balance), 6);
		balance = Number(balance).toFixed(2);
		$GWTbalance = balance;
	}

	async function getUSDCbalance() {
		let balance = await $contracts.USDCContract.balanceOf($signerAddress);
		balance = fromBn(BigNumber.from(balance), 6);
		balance = Number(balance).toFixed(2);
		$USDCbalance = balance;
	}
	
	async function mintMeSome() {
		let amount2 = numberCito*1e6;
		const tx = await $contracts.GersteWeinContract.mintMeSome(amount2);
		txHash = tx.hash;
		console.log(txHash);
		return true;
	}

	function clearModal() {
		numberCito = 0;
		txHash = undefined;
		setTimeout(() => {
			$showMe = false;
		}, 2500)
	}
	/**
	 * @notice this is a backup just in case
	 async function mintMeSome() {
		 let amount2 = numberCito*1e6;
		 try {
			 const tx = await $contracts.GersteWeinContract.mintMeSome(amount2);
			 txHash = tx.hash;
			 console.log(txHash);
			} catch (e:any) {
				//console.log(e);
				//$showMe = false
				metamaskError = e
				//console.log("MESSAGE: ", metamaskError.message)
				console.log("CODE: ",metamaskError.code);
				getMetamaskError = metamaskError;
				//console.log("DATA: ",metamaskError.data)
				return false;
		}
		return true;
	}
	*/

	async function buyingFunction() {
		$showMe = true;
		await mintMeSome();
		await $provider.waitForTransaction(txHash);
		console.log("esperanding...")

		await getGWTbalance();
		await getUSDCbalance();
	}

	async function swapMeSome() {
		let amount2 = numberCito*1e6;
		const tx = await $contracts.GersteWeinContract.swapMeSome(amount2);
		txHash = tx.hash;
		console.log(txHash);
		return true
	}
	/** 
	 * @notice this is a backup just in case
	async function swapMeSome() {
		let amount2 = numberCito*1e6;
		try {
			const tx = await $contracts.GersteWeinContract.swapMeSome(amount2);
			//console.log(tx)
			txHash = tx.hash;
			console.log(txHash);
		} catch (e:any){
			metamaskError = e;
            console.log("CODE: ",metamaskError.code);
			getMetamaskError = metamaskError;
			return false;
		}
		return true
	}
	*/

	async function sellFunction(){
		$showMe = true;
		//allowanceCheck = false;
		await swapMeSome();
		await $provider.waitForTransaction(txHash);
		console.log("esperanding...")
		await getGWTbalance();
		await getUSDCbalance();
	}
	
	/**
	 * @dev checks if the input value is different from zero
	 * and that the user has enough USDtokens
	*/
	async function buyGWT() {
		if (numberCito != 0 && $USDCbalance >= numberCito) {
			weBuying = 1;
			if (allowanceCheck == undefined) {
				await getAllowance();
			}
				if (allowanceCheck != 0) {
					try {
							buyingFunction()
							weBuying = 0;
						} catch (e:any) {
							console.log(e);
							metamaskError = e
							console.log("CODE: ",metamaskError.code);
							handleMetamaskError()
							clearModal()
						}
				} else {
					$showMe = true;
					try {				
						await approveAllowance();
						await $provider.waitForTransaction(txHash);
						await mintMeSome();
						await $provider.waitForTransaction(txHash);
						console.log("esperanding...")
	
						await getGWTbalance();
						await getUSDCbalance();
						numberCito = 0;
						$showMe = false;
						txHash = undefined;
						weBuying = 0;
					} catch (e:any) {
						console.log(e);
						metamaskError = e
						console.log("CODE: ",metamaskError.code);
						handleMetamaskError()
						clearModal();
					}
				}
				
	  		}
		}	

	// swap function => checks != 0 => checks if amount >= balance
	async function sellGWT() {
		if (numberCito != 0 && $GWTbalance >= numberCito) {
			weSelling = 1;
			try {
				sellFunction();
				weSelling = 0;
			}  catch (e:any) {
				console.log(e);
				metamaskError = e
				console.log("CODE: ",metamaskError.code);
				
				handleMetamaskError()
				getMetamaskError = metamaskError;
				weSelling = 0;
				clearModal()

			}
		}
	} 
	
	// check if onboarding needs to be done
	function isMetamaskInstalled() {
		isInstalled = getWindowEthereum();
		if (isInstalled === undefined) {
			onboardingOn = true;
			isInstalled = false;
			console.log(isInstalled, " metamask no ta instalado")
		} return false
	}

	isMetamaskInstalled()

	// handle account change and set the allowanceCheck to undefined
	function handleAccountsChanged() {
    try {
        getWindowEthereum().on('accountsChanged', (accounts:string[]) => {
        // Handle the new accounts, or lack thereof.
        // "accounts" will always be an array, but it can be empty.
		allowanceCheck = undefined;
		clearModal()
        //console.log("hubo un cambio de usuario: ", accounts)
        //window.location.reload();
        }); 
    } catch (err) {
    console.log("error! la cuenta le pasa algo")
        }   
    }

	handleAccountsChanged();

	function handleMetamaskError() {
		// EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
		console.log("Catching a message: ", metamaskError)
		try {
			getWindowEthereum().on('message', (message: ProviderMessage) => {
				if (message.type === -32603) {
					console.log('ERRROE');
				}
				if (message.type === 4001) {
					console.log('ERRROE');
				}
				console.log("Catching a message later: ", message)
			});
		} catch (err) {
    		console.log("error! la cuenta le pasa algo")
        }
      }

</script>
<TxHashModal {txHash} {allowanceCheck} {getMetamaskError}>
</TxHashModal>

<!-- Check if metamask is available -->
{#if isInstalled == false}
<body>
	<div>
		<h1>Hay que instalar Metamask</h1>
	</div>
	<div style= "text-align: center">
		
		<a href="https://metamask.io/" target="_blank" rel="noreferrer">
			<GersteButton>Llevame a Metamask
		</GersteButton></a>
	</div>
</body>

	{:else}

	<!-- Main app body -->
{#key $signerAddress}

<body>	
	<h1>Compra - Venta</h1>
    {#if !$connected}
    	<p  style= "text-align: center">Conectando...</p>
	{/if}
	
	{#if $chainId === 80001}
				
<!-- 		<h1
		transition:fade
		>
			{numberCito}
		</h1> -->
		<!-- Beer mugs -->
		<div class="beerWrapper" >
		{#if (numberCito == 0)}
			<img src={beerEmpty} alt="Vaso de birra vacio"
			transition:fade="{{delay: 0,duration: 500}}">

		{/if}
			{#if (numberCito < 10)}	
				{#each Array(numberCito) as beers }
					<img src={beer} alt="Birra n??mero {numberCito}" 
					transition:fade="{{delay: 0,duration: 500}}">
				{/each}
			{:else}
					{#each Array(10) as beers }
						<img src={beer} alt="Birra n??mero {numberCito}" 
						transition:fade="{{delay: 0,duration: 500}}">
				{/each}
			{/if}
			<!-- <img src={beer} alt="Beer {numberCito}"> -->
		</div>
		<div>
			<input 
					type=number
					min="0" max="100"
					autofocus
					bind:value={numberCito}
					>
		</div>
			<div style= "text-align: center">
				<GersteButton
					on:click={() => {buyGWT()}}
					>Comprar
				</GersteButton>
				<GersteButton
					on:click={() => {sellGWT()}}
					>Vender
				</GersteButton>
			</div>

	
		<div  style="text-align: center"
		>
		<p>
			Conectado con la cuenta:
		</p>
		<h3>
			{$signerAddress}
		</h3>
	</div>
	<!-- Coins display -->
		<div
		class="coins"
		>
			<CoinInfo coin={"GWT"}/>
			<CoinInfo coin={"USD"}/>
		</div>
	<div
	style="text-align: center; padding: 2rem">
		<GersteButton
			on:click={() => {
				addGersteToken()
			}}>Add GWT a Metamask
		</GersteButton>
	</div>
	{:else}
	<!-- Change network to Mumbai -->
		<div style="text-align: center"
		>
			<h2> 
				Conectate a la red Mumbai:
			</h2>
			<GersteButton
				on:click={() => {changeNetwork()}}
				>Agregar red Mumbai
			</GersteButton>
						</div>
	{/if}
</body>

{/key}
{/if}

<style>

 	div input {
		margin: 15px;
	}
	
	.beerWrapper {
		display: flex;
		justify-content: center;
		width: 90%;
		margin: auto 15% auto;
	}
	
	.beerWrapper img {
		align-items: center;
		align-self: center;
		width: 3em;
		padding: 3px;
		transition: all 0.5s;
	}

	.beerWrapper img:hover {
		width: 4em;
		padding: 12px;
	}

	input {
		font-family: gersteWeinFont;
		text-align: center; 
		font-size:38pt;
		color: white;
		background: rgba(255, 255, 255, 0.1);
		border-color: rgba(0, 0, 0, 0);
		width: 100%;
		box-shadow: 0px 0px 120px 10px rgba(255, 46, 238, 0);
		transition: box-shadow 1.5s
	}

	input:hover{
        -webkit-box-shadow:0px 0px 80px 5px rgba(255, 46, 238, 0.35);
        -moz-box-shadow: 0px 0px 80px 5px rgba(255, 46, 238, 0.35);
        box-shadow: 0px 0px 120px 10px rgba(255, 46, 238, 0.75);
	}

	.coins{
		display: flex;
		margin: 3rem;
		justify-content: center;
	}

	input[type=number]::-webkit-inner-spin-button, 
	input[type=number]::-webkit-outer-spin-button {
  		opacity: 1;
	}

</style>