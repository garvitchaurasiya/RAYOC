import React, { Component } from 'react'
import collegerating from '../ethereum/collegerating';
import web3 from '../ethereum/web3';

export class index extends Component {
  async componentDidMount (){
    const accounts = await web3.eth.getAccounts();
    
  }
  render() {
    return (
      <div>index</div>
    )
  }
}

export default index