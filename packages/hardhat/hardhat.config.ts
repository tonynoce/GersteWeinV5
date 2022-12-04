require('dotenv').config()

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const { ALCHEMY_POLYGON_MAINET, ALCHEMY_POLYGON_TEST_KEY, ETHERSCAN_MUMBAI, ETHERSCAN_FTMTESTNET, ALCHEMY_APIKEY_POLYGON, ALCHEMY_APIKEY_MUMBAI } = process.env;



const config: HardhatUserConfig = {
  solidity: "0.8.7",
  networks: {
    hardhat: {
      forking: {
        url: "https://polygon-mainnet.g.alchemy.com/v2/" + ALCHEMY_APIKEY_POLYGON,
        blockNumber: 35973948
      }
    },
    polygon: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/" + ALCHEMY_APIKEY_POLYGON,
      accounts: [`0x${ALCHEMY_POLYGON_MAINET}`]

    },
    mumbai: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/" + ALCHEMY_APIKEY_MUMBAI,
      accounts: [`0x${ALCHEMY_POLYGON_MAINET}`]
    },
    ftmTestnet: {
      url: "https://rpc.ankr.com/fantom_testnet",
      accounts: [`0x${ALCHEMY_POLYGON_MAINET}`]
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: ETHERSCAN_MUMBAI!,
      ftmTestnet:
        process.env.ETHERSCAN_FTMTESTNET!
    },
  }
};

export default config;
