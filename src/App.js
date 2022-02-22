import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers'
import abi from './Vote.json'
import { 
  checkWalletIsDetected,
  connectWalletHandler,
  } from './util/interact';
import candidate1img from './images/candidate1.png';
import candidate2img from './images/candidate2.png';

function App() {

//State variables
const [walletAddress, setWalletAddress] = useState("");
const [message, setMessage] = useState("red");
const [walletDetected, setWalletDetected] = useState("false")

const contractABI = abi.abi
const contractAddress = '0x5187B771259e4E7E7334616bb0290C130983FE98'

const { ethereum } = window;

const provider = new ethers.providers.Web3Provider(ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract( contractAddress, contractABI, signer);

const [candidate1, setCandidate1]= useState("")
const [candidate2, setCandidate2]= useState("")

//connect to wallet
const connectWallet = async () =>{
  setWalletAddress(await connectWalletHandler())
  setMessage("green")
};
console.log(walletAddress)

//wallet changes
const addWalletListener = ()=> {
  if (ethereum){
    ethereum.on("accountsChanged", (accounts)=>{
      if (accounts.length !== 0){
        setWalletAddress(accounts[0])
        setMessage("yellow")
      }
    })
  }
};



  //read the contract
useEffect(() => {
  const fetchCandidate= async () => {
    const res1 = await contract.candidateLookup(1)
    setCandidate1(res1)
    const res2 = await contract.candidateLookup(2)
    setCandidate2(res2)
   };
  fetchCandidate()
}, [])



//vote function
const vote = async (id) =>{
  await contract.vote(id)
}

const [voteCount1, setVoteCount1]= useState(0)
const [voteCount2, setVoteCount2]= useState(0)


const getVote1 = async () => {
  let voteCount1 = await contract.candidateLookup(0)
  setVoteCount1(voteCount1[2].toNumber())
}

const getVote2 = async () => {
  let voteCount2 = await contract.candidateLookup(1)
  setVoteCount2(voteCount2[2].toNumber())
}


const addSmartContractListener = async () => {
  contract.on('voterEvent', getVote1)
  contract.on('voterEvent', getVote2)
};


useEffect(() => {
  // connectToContract()
  setWalletDetected(checkWalletIsDetected()) 
  addWalletListener()
  addSmartContractListener()
},[]);

  return (
    <div className="app">
      <div className="top">
          {walletDetected && (
            <button className="btn slide_left" onClick = {connectWallet}>
              {walletAddress.length > 0 ? 
              ('Connected: ' + String(walletAddress).substring(0,6)+ "..." + String(walletAddress).substring(38)) :
              (<span>Connect Wallet</span>)}
            </button>)}
            <div className={message}></div>
      </div>
      
      <h1>VOTE HERE</h1>
      
      
      <div className='main-content'>
        <div className='left'>{candidate1[1]}  {voteCount1}</div>
        <div className='right'>{candidate2[1]}  {voteCount2}</div>
        <button className="btn" onClick= {()=>{vote(0); getVote1()}}>VOTE joey</button>
        <button className="btn" onClick= {()=>{vote(1); getVote2()}}>VOTE sarah</button>

      </div>
    </div>
  );
}

export default App;