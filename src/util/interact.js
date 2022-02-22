
const { ethereum } = window;

//check for wallet in browser and if present display button to connect
export const checkWalletIsDetected = async () => {
    if (!ethereum) {
      console.log("Make sure you have Metamask installed")
      return false;
    } else {
      console.log('Wallet detected- let"s do this!')
      return true
    }}
 
    

//connect wallet- needs to be a button Function
export const connectWalletHandler = async ()=>{
  if (!ethereum){
    alert("Please install Metamask")
    return;
  }
  try {
    await ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await ethereum.request({ method: 'eth_accounts' });
    if (accounts.length != 0) {
        const account = await accounts[0]
        console.log("account at", account);
        return account
    } else {
        console.log('No authorized account found');
    }
  }
  catch (error) {
    console.log(error)
  }
}


// export const updateVoteCount = async () => {

// }

  //get accounts from metamask
// export const getAccounts = async () => {
//   const accounts = await ethereum.request({ method: 'eth_accounts' });
//   if (accounts.length != 0) {
//     const account = await accounts[0]
//     return account;
//   } else {
//     console.log('No authorized account found');
//   }
// }


// export const currentVoteCount = (props) =>{
//     let candidate1 = props.candidateLookup(1)
//     return candidate1[1]
// }

// export const connectWallet = async () =>{

// }

// const getCurrentWalletConnected = async () =>{

// }




// ///////////////////////////////////////////////////////////////////


// const [currentAccount, setCurrentAccount] = useState(null);
// const [contractConnected, setContractConnected] = useState(true);




// //wallet connect button
// const connectWalletButton = ()=>{
//   return(
//     <button onClick={connectWalletHandler}>Connect Wallet</button>
//   )
// }



// //connect to Contract
// const load = async ()=>{
//   try {
//     if (ethereum) {
//       provider = new ethers.providers.Web3Provider(ethereum);
//       signer = provider.getSigner();
//       contract = new ethers.Contract( ADDRESS, ABI, signer);
//       //Interact with Contract
//       // const candidates = await voteContract.getCandidates();
//       // console.log(candidates[1][0].toNumber())
//       // console.log(candidates[1][1].toNumber())
//       // console.log(candidates[0][0])
//       // console.log(candidates[0][1])

//       // const canTest = await voteContract.candidateLookup(2)
//       // console.log(canTest[2].toNumber())

//       //get info from contract -2 candidates
//       candidate1 = await contract.candidateLookup(1)
//       candidate2 = await contract.candidateLookup(2)
//       console.log(candidate1[0].toNumber(), candidate1[1], candidate1[2].toNumber())
//       console.log(candidate2[0].toNumber(), candidate2[1], candidate2[2].toNumber())
//       // setContractConnected(true);
//       return await candidate1
//       // voteContract.vote(2)
//     }else{
//       console.log("No wallet connected")
//     }
//   } catch (error) {
//     console.log(error)
//   }
// }




// //connect to contract button
// const loadButton = ()=>{
//   return(
//     <button onClick={load}>Load Contract</button>
//   )
// }

// //Vote function

// useEffect(()=>{checkWalletIsConnected()}, [])
