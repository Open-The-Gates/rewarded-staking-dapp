import React, { Component } from 'react'
import { Button, Spinner } from 'react-bootstrap';

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
  this.props.setAccount(accounts[0])
}.bind(this);

render() {
return(
  <div className='connectWallet'>
            { this.state.connectWalletLoading ? 
            <Spinner animation="border" style={{ color: "#C7493A", marginRight: "30px" }}/> :
             <>{this.props.account.length == 0 ?
              <Button style={{ backgroundColor: "#C7493A" }} size= "lg" onClick={ () => this.connect()}> Connect wallet</Button>
              :
                <Button style={{ backgroundColor: "#689775" }} size= "lg" disabled>Wallet Connected<span>&#128540;</span></Button>
            }</>}</div>
);
};
}

export default Wallet;
