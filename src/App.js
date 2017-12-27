import { default as Web3} from 'web3';
import { default as contract } from 'truffle-contract'
import auctionFactory from './contracts/AuctionFactory.json'
import auction from './contracts/Auction.json'

import React, { Component } from 'react';

import './App.css';


class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      feature: 'Auction',
      sub_feature: 'create',
      message: "Welcome to "
    }
    this.statusUpdate = this.statusUpdate.bind(this);
        
  }


  statusUpdate() {
    var curStatus = this.state.feature;
    if(curStatus == 'Auction') {
      curStatus = 'File Mgmt';
      this.setState({sub_feature: 'Files'});
    } else {
      curStatus = "Auction";
      this.setState({sub_feature: 'Create'});
    }

    this.setState({feature: curStatus});
  }

  render() {
    return (
      <div>
        <ol class="breadcrumb">
          <li class="breadcrumb-item active">{this.state.feature}</li>
          <li class="breadcrumb-item">{this.state.sub_feature}</li>
        </ol>
         <div class="card mb-3">
          <div class="card-header"></div>
          <div class="card-body">
            {this.state.message} {this.state.feature}
            <p><input type="button" value="Change" id="changeState" onClick={this.statusUpdate}/></p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
