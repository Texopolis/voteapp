export const contract;

export const currentVoteCount = async () =>{

}

export const connectWallet = async () =>{

}

const getCurrentWalletConnected = async () =>{

}

export const vote = async () =>{

}

export const updateVoteCount = async () => {

}



///////////////////////////////////////////////////////////////////
import abi from './Vote.json';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers'


const ABI = abi.abi;
const ADDRESS = "0x98B3cDD6e2fE44A3f2fCAfFb036c20f6E6595709"
;
const { ethereum } = window;
let provider = null;
let signer = null;
let contract = null;
let candidate1= [];
let candidate2 = null;


const [currentAccount, setCurrentAccount] = useState(null);
const [contractConnected, setContractConnected] = useState(true);

//check for wallet in browser
const checkWalletIsConnected = async () => {
  if (!ethereum) {
    console.log("Make sure you have Metamask installed")
    return;
  } else {
    console.log('Wallet detected- let"s do this!')
  }

  const accounts = await ethereum.request({ method: 'eth_accounts' });

  if (accounts.length != 0) {
    const account = accounts[0]
    console.log('Found authorized account: ', account);
  } else {
    console.log('No authorized account found');
  }
}

//connect wallet- need to be a button Function
const connectWalletHandler = async ()=>{
  if (!ethereum){
    alert("Please install Metamask")
  }

  try {
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    setCurrentAccount(accounts[0]);
    console.log('Using account at address: ', currentAccount);
  }
  catch (error) {
    console.log(error)
  }
}

//wallet connect button
const connectWalletButton = ()=>{
  return(
    <button onClick={connectWalletHandler}>Connect Wallet</button>
  )
}



//connect to Contract
const load = async ()=>{
  try {
    if (ethereum) {
      provider = new ethers.providers.Web3Provider(ethereum);
      signer = provider.getSigner();
      contract = new ethers.Contract( ADDRESS, ABI, signer);
      //Interact with Contract
      // const candidates = await voteContract.getCandidates();
      // console.log(candidates[1][0].toNumber())
      // console.log(candidates[1][1].toNumber())
      // console.log(candidates[0][0])
      // console.log(candidates[0][1])

      // const canTest = await voteContract.candidateLookup(2)
      // console.log(canTest[2].toNumber())

      //get info from contract -2 candidates
      candidate1 = await contract.candidateLookup(1)
      candidate2 = await contract.candidateLookup(2)
      console.log(candidate1[0].toNumber(), candidate1[1], candidate1[2].toNumber())
      console.log(candidate2[0].toNumber(), candidate2[1], candidate2[2].toNumber())
      // setContractConnected(true);
      return await candidate1
      // voteContract.vote(2)
    }else{
      console.log("No wallet connected")
    }
  } catch (error) {
    console.log(error)
  }
}




//connect to contract button
const loadButton = ()=>{
  return(
    <button onClick={load}>Load Contract</button>
  )
}

//Vote function

useEffect(()=>{checkWalletIsConnected()}, [])
