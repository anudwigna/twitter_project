import React,{useState,useEffect} from 'react';
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';
import Rightbar from './components/Rightbar';
import { Button,useNotification,Loading } from '@web3uikit/core';
import { Twitter,Metamask } from '@web3uikit/icons'; 
import { ethers,utils } from 'ethers';
import Web3Modal from 'web3modal';
import { TwitterContractAddress } from './config';
import TwitterAbi from './abi/Twitter.json';
var toonavatar = require('cartoon-avatar');

function App() {
  const [isAuthenticated,setIsAuthenticated] = useState(false);
  const [provider,setProvider] = useState(window.ethereum);
  const notification = useNotification();
  const [loading,setLoadingState] = useState(false);

  const warningNotification = () =>{
    notification({
      type: 'warning',
      message: 'Change network to Goerli to visit this site',
      title: 'Switch to Goerli Test Network',
      position: 'topR'
    });
  };

  const infoNotification = (accountNum) =>{
    notification({
      type: 'info',
      message: accountNum,
      title: 'Connected to GoerliEther Account',
      position: 'topR'
    });
  };


  useEffect(()=>{
    if(!provider){
      window.alert("No Metamask Installed");
      window.location.replace("https://metamask.io");
    }

    connectWallet();

    const handleAccountsChanged = (accounts) => {
      if(provider.chainId === "0x13881"){
        infoNotification(accounts[0]);
      }
      // Just to prevent reloading twice for the very first time
      if(JSON.parse(localStorage.getItem('activeAccount')) != null){
        setTimeout(()=>{window.location.reload()},3000);
      }
    };

    const handleChainChanged = (chainId)=>{
      if(chainId !== "0x13881"){
        warningNotification();
      }
      window.location.reload();
    }

    const handleDisconnect = ()=>{};

    provider.on("accountsChanged",handleAccountsChanged);
    provider.on("chainChanged",handleChainChanged);
    provider.on("disconnect",handleDisconnect);
  },[]);


  const connectWallet = async () =>{
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    let provider = new ethers.providers.Web3Provider(connection);
    const getnetwork = await provider.getNetwork();
    const EthChainId = 5;
    if(getnetwork.chainId !== EthChainId){
      warningNotification();
      try {
        await provider.provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: utils.hexValue(EthChainId) }]
        }).then(()=>window.location.reload());

      }catch(switchError){
        // This error code indicates that the chain has not been added to Metamask
        // So will add Ethereum network to their metamask
        if(switchError.code === 4902){
          try{
            await provider.provider.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: utils.hexValue(EthChainId),
                  chainName: "Ethereum Testnet",
                  rpcUrls : ["https://blockscan.com/"],
                  blockExplorerUrls: ["https://goerli.etherscan.io/"],
                  nativeCurrency : {
                    symbol:"GOERLI",
                    decimals:18
                  }
                }
              ]
            }).then(()=>window.location.reload());

          }catch(addError){
            throw addError;
          }
        }

      }

    }else{
      // It will execute if Ethereum chain is connected
      // We will verify if the user exists or not in our blockchain or else we will update user details in our contract and localstorage
      const signer = provider.getSigner();
      const signerAddress = await signer.getAddress();
      const contract = new ethers.Contract(TwitterContractAddress,TwitterAbi.abi,signer);
      const getUserDetail = await contract.getUser(signerAddress);

      if(getUserDetail['profileImg']){
        // If user Exsists
        window.localStorage.setItem("activeAccount",JSON.stringify(signerAddress));
        window.localStorage.setItem("userName",JSON.stringify(getUserDetail['name']));
        window.localStorage.setItem("userBio",JSON.stringify(getUserDetail['bio']));
        window.localStorage.setItem("userImage",JSON.stringify(getUserDetail['profileImg']));
        window.localStorage.setItem("userBanner",JSON.stringify(getUserDetail['profileBanner']));

      }else{
        // First Time user
        // Get a Random avatar and update in the contract
        setLoadingState(true);
        let avatar = toonavatar.generate_avatar();
        let defaultBanner = "";
        window.localStorage.setItem("activeAccount",JSON.stringify(signerAddress));
        window.localStorage.setItem("userName",JSON.stringify(''));
        window.localStorage.setItem("userBio",JSON.stringify(''));
        window.localStorage.setItem("userImage",JSON.stringify(avatar));
        window.localStorage.setItem("userBanner",JSON.stringify(defaultBanner));

        try{
          const transaction = await contract.updateUser('','',avatar,defaultBanner);
          await transaction.wait();
        }catch(error){
          console.log("ERROR",error);
          notification({
            type: 'warning',
            message: 'Get Test Goerli from Go faucet',
            title: 'Require minimum 0.1 Goerli',
            position: 'topR'
          });
          setLoadingState(false);
          return;
        }

      }

      setProvider(provider);
      setIsAuthenticated(true);

    }
  }

  return (
     <>
     { isAuthenticated ? (
         <div className='page'>
         <div className='sideBar'>
           <Sidebar/>
         </div>
         <div className='mainWindow'>
           <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/settings' element={<Settings />} />
           </Routes>
         </div>
         <div className='rightBar'>
           < Rightbar />
         </div>
       </div>

     ): (
       <div className='loginPage'>
         <Twitter fill= 'rgb(0, 173, 253)' fontSize={200}/>Twitter Clone<></>
         { loading ? <Loading size={50} spinnerColor="green" /> :  <Button onClick={connectWallet} size="xl" text='Link Your Meta Metamask Wallet' theme='primary' icon={< Metamask />} /> }
        
       </div>
     )}
     
     </>
  );
}

export default App;
