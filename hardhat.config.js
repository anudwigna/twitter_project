require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks:{
    goerli:{
      url:process.env.ETHEREUM_GOERLI,
      accounts:[process.env.WALLET_PRIVET_KEY]
    }

  }
};
