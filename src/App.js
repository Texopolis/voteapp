import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { 
  contract,
  currentVoteCount,
  connectWallet,
  vote,
  updateVoteCount,
  getCurrentWalletConnected
} from './util/interact';

//State variables
const [walletAddress, setWallet] = useState("");
const [status, setStatus] = useState("");
const [message, setMessage] = useState("No connection to the network.");
const [newMessage, setNewMessage] = useState("");


function App() {

  return (
    <div>
      <h1>VOTE HERE</h1>
    </div>
  );
}

export default App;