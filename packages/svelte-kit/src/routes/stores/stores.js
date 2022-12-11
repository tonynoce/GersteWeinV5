import { writable, readable } from 'svelte/store';

export const GERSTEWEINCONTRACT = '0xC45d511faC07A484f9875C823eA495fb7079Bd88';
export const USDCONTRACT = '0xFEca406dA9727A25E71e732F9961F680059eF1F9';

export let allowance = writable();

export let GWTbalance = writable();
export let USDCbalance = writable();

export const MUMBAINETWORK = {
    chainId: `0x${Number(80001).toString(16)}`,
    chainName: "Mumbai",
    nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18
    },
    rpcUrls: ["https://matic-mumbai.chainstacklabs.com"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com"]
}