//react and Front End imports
import React, { Component } from 'react';
//import { Label, DropdownButton, MenuItem, Form } from 'react-bootstrap'

//Eth libraries
import { default as Web3} from 'web3';

//contracts
import { default as contract } from 'truffle-contract'
import auctionFactory from './contracts/AuctionFactory.json'
import auction from './contracts/Auction.json'

//styles?? can remove later
import './App.css';

    //var watching = false; //start watching to events only 
    // var passwd = false;

    var web3 = null;
    var AuctionFactory = contract(auctionFactory);
    var Auction = contract(auction);

    //variable to refer to currnet component context
    // else ctx is not visible from anonymous functions and we cant call other functions like writeMsg
    var me = null;

export default class CreateAuction extends Component {

  // componentDidMount() {}
  // componentWillUnmount() {}
  

  constructor (props) {

    super(props);
      //the url should come from config /props
     web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9090"));
     console.warn("webb3 connected  " + web3 );
     AuctionFactory.setProvider(web3.currentProvider);
     Auction.setProvider(web3.currentProvider);
    
      this.state = {
        feature: 'Auction',
        sub_feature: 'create',
        message: ' '
      }
      this.clear = this.clear.bind(this);
      this.writeMsg = this.writeMsg.bind(this);
      this.createAuction = this.createAuction.bind(this);

      me = this;
        
  }

   clear() {
      this.setState({message: null});
      //$("#msg").text('');
    }

  createAuction = (phrase ) => {
        this.clear();

        // if(!watching) {
        //   watchEvents(myAuction, result);
        //   watching = 1;
        // }
 

       try {
          let auctioneerHash = this.refs.auctioneerId.value; 
          let totalTkts = this.refs.totakTickets.value; 
          let tktPerPerson = this.refs.ticketsPerPerson.value;
          let validity = this.refs.endTimeInHours.value;
          let minAmt = this.refs.minBidAmt.value;
          console.log(auctioneerHash + " " + totalTkts + " " +tktPerPerson + " " +validity+ " " +minAmt);

          ///// CHANGE TO USER AUTH
          var unlocked = web3.personal.unlockAccount(auctioneerHash, 'welcome123', 10);
          //var info = '';
          console.log('unlocked' + unlocked);
        //   // if(!unlockaccount(auctioneerHash, phrase)) {
        //   //   return;
        //   }
          // var me = this;

          AuctionFactory.deployed().then(function(factoryInstance) {
            console.log("AuctionFactory " + factoryInstance);
            me.writeMsg("TEEETETE", false, false);
            factoryInstance.createAuction( tktPerPerson, totalTkts, minAmt, validity,{gas:1500000,from:auctioneerHash}).then(function(contractId) {
                me.writeMsg("Auction created for "+ auctioneerHash + " at address " + contractId, false, false);
             });
          });
        } catch (err) {
            me.writeMsg("Error creating auction "+ err, true, false);
        }

  }


   writeMsg = (msgVal, isErr, append) => {      
      if(isErr) {
        msgVal = "<font color='red'>" + msgVal + "</font>";
      }
      msgVal = "<p>" + msgVal + "</p>";
      if(append) {
        msgVal = this.state.message + msgVal;
      } 
      this.setState({message: msgVal});
    }

 


  render() {
    
    return (
      <div>
        <ol className="breadcrumb">
          <li className="breadcrumb-item active">{this.state.feature}</li>
          <li className="breadcrumb-item">{this.state.sub_feature}</li>
        </ol>
         <div className="card mb-3">
          <div className="card-header"> {this.state.message}</div>
          <div className="card-body">          

                  <form>
                  <div className="form-group">
                    <label htmlFor="auctioneerId">Auctioneer Address</label>
                    <input className="form-control" ref="auctioneerId"  defaultValue="0xE7D4fb00EA93027a10101A48F9b791626f232Ac6" placeholder="Auctioneer Address" />
                  </div>

                  <div className="form-group">
                    <div className="form-row">
                      <div className="col-md-6">
                        <label htmlFor="totakTickets">Total Tickets</label>
                        <input className="form-control" ref="totakTickets" min="1" type="number" placeholder="Total Tickets" />
                      </div>                    
                      <div className="col-md-6">
                        <label htmlFor="ticketsPerPerson">Tickets Per Person</label>
                        <input className="form-control" ref="ticketsPerPerson" type="number" min="1" aria-describedby="nameHelp" placeholder="Tickets Per Person" />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-row">
                      <div className="col-md-6">
                        <label htmlFor="minBidAmt">Minimum Bid Amount</label>
                        <input className="form-control" ref="minBidAmt" type="number" min="1"  placeholder="Minimum Bid Amount" />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="endTimeInHours">Duration in Hours</label>
                        <input className="form-control" ref="endTimeInHours" type="number" min="1" placeholder="Duration in Hours" />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="form-row">
                      <div className="col-md-6">
                          <a className="btn btn-primary btn-block" onClick={this.createAuction}>Create</a>
                      </div>
                      <div className="col-md-6">
                        <a className="btn btn-primary btn-block" onClick={this.getAuctionDetails}>Reset</a>
                      </div>
                    </div>
                  </div>
                </form>
          </div>
        </div>
      </div>
    );
  }
}
