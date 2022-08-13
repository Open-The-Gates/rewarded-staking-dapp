import React, { useState, useEffect } from 'react'
import { Button, Spinner } from 'react-bootstrap';
import Web3 from 'web3'

function Wallet() {
let [web3, setWeb3] = useState(null)
var connectWalletLoading = false;
useEffect(() => {
  checkAccount()
}, [])

async function connect() {
  connectWalletLoading = true;
  if (window.ethereum) {
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      checkAccount()
    } catch (err) {
      console.log('user did not add account...', err)
    }
  }
  connectWalletLoading = false;
}

// invoke to check if account is already connected
async function checkAccount() {
  let web3 = new Web3(window.ethereum)
  setWeb3(web3)
  const accounts = await web3.eth.getAccounts()
  this.props.setAccount(accounts[0])
}

return (
  <div className='connectWallet'>
    <p>hello</p>
                <Button style={{ backgroundColor: "#689775" }} size= "lg" disabled>Wallet Connected<span>&#128540;</span></Button>
             
            </div>
);
}

export default Wallet;
