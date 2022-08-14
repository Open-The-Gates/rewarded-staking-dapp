import './Pool.css';
import React, { Component } from 'react'
import { Button, Spinner } from 'react-bootstrap';

class Pool extends Component {

render() {
return(
  <div id='staking-pool'>
  <h1 className='text'>LRNB Staking Pool</h1>
  <div className='data'>
    <div id='apy' className= 'data-box'>
      <div className='text'>APY: 2%</div>
    </div>
    <div id='staked' className= 'data-box'>
      <div className='text'>Staked 50 LRNB</div>
    </div>
    <div id='rewarded' className= 'data-box'>
      <div className='text'>Earned 20 RLNB</div>
    </div>
  </div>
  </div>
);
};
}

export default Pool;
