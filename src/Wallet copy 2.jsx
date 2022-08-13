import './Wallet.css';
import React, { Component } from 'react'
import ClipLoader from "react-spinners/ClipLoader";
import Spinner from 'react-bootstrap/Spinner';
import { Button } from 'bootstrap';


class Wallet extends Component {

state = {
  connectWalletLoading : false
};

request = {
  method: "wallet_addEthereumChain",
  params: [{
      chainId: "0xfa2",
      rpcUrls: ["https://rpc.testnet.fantom.network/"],
      chainName: "Fantom testnet",
      nativeCurrency: {
          name: "FTM",
          symbol: "FTM",
          decimals: 18
      },
      blockExplorerUrls: ["https://ftmscan.com/"]
  }]};


connect = async function () {
  this.setState({connectWalletLoading : true});
  if (window.ethereum) {
    let chainId = await this.props.web3.eth.getChainId();
    if (chainId == this.request.chainId) {
      this.sendConnectionRequest();
    } else {
      await window.ethereum.request(this.request);
      this.sendConnectionRequest();
    }
    this.setState({connectWalletLoading : false});
  }
}.bind(this);

sendConnectionRequest = async function() {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  this.checkAccount()
}.bind(this);

checkAccount = async  function() {
  const accounts = await this.props.web3.eth.getAccounts()
  const chainId = await this.props.web3.eth.getChainId()
  if (chainId == parseInt(this.request.params[0].chainId, 16)) {
   this.props.setAccount(accounts[0])
  }
}.bind(this);

render() {
return(
  <div className='connect-wallet'>
            { this.state.connectWalletLoading ? 
            <ClipLoader className='spinner'/>
                  :
             <>{this.props.account.length == 0 ?
              <button className='connect-button shake-chunk shake-constant' id='press-connect-button' onClick={ () => this.connect()}> Connect wallet</button>
              :
              <button className='connect-button' id='connected-button' disabled>Wallet Connected<span>&#128540;</span></button>
            }</>}</div>
);
};
}

export default Wallet;
