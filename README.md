# Develop a mini-Twitter on Ethereum

## Learning Objectives and Outcomes

- Practical understanding of smart contract developments on Ethereum
- Learn how to link front to back end

## Project Requirements

- Need to have and connect Metamask wallet account and Alchemy Test Network.
- Create an account on Alchemy and generate an API key by creating an app

## Development Steps

- Creating a smart contract using solidity and test it.
- Creating a front-end using JavaScript to interact with smart contracts
- Creating a CSS for tidiness

### Copy your wallet information in the project

In the .env file in the main project there are two fields where you need to copy your wallet information. Copy your wallet URL in 'ETHEREUM_GOERLI' field and your API key in 'WALLET_PRIVET_KEY' field.

### Deploying contracts

Inside the main project folder

```shell
npm run deploy
```

### Run Frontend
Go inside the client folder and run the following commands:

Install all the packages

```shell
yarn install
```

Run the Project

```shell
npm start
```

If the project did not start in http://localhost:3000, try another URL: http://127.0.0.1:3000
