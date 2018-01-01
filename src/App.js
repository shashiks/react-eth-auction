//react and Front End imports
import React, { Component } from 'react';
//import AuctionDetails from './Details.js'
//import CreateAuction from './Create.js'
//import BidAuction from './Bid.js'
import PurchaseTicket from './PurchaseTicket.js'


class App extends Component {

  // componentDidMount() {}
  // componentWillUnmount() {}
  

  // constructor (props) {
  //       super(props);
  // }

  render() {
    
    return (

        <PurchaseTicket auctionId='0x050809e4442e30295808b4b02ef3a396c39b7cfc'/>
    );
  }

  /*
  watchEvents = (bidAuction, itemId) => {
      var bidEvent = bidAuction.BidCreated({fromBlock: 'latest', toBlock: 'latest', address : itemId});
          bidEvent.watch(function(error, result){
              if(!error) {
                me.writeMsg("Bid received for Ticket Id " + result.args.pTicketId + " of amount " + result.args.bidAmount+ " from address " + result.args.bidder, false, true);
              } else {
                me.writeMsg("Err in BidCreated event "+ error, true, true);
              }
          });

        var highEvent = bidAuction.HighestBid({fromBlock: 'latest', toBlock: 'latest', address : itemId});
          highEvent.watch(function(error, result){
              if(!error) {
                me.writeMsg("Highest bid received for Ticket Id " + result.args.pTicketId + " of amount " + result.args.bidAmount + " from address " + result.args.bidder, false, true);
              } else {
                me.writeMsg("Err in Highest Bid event "+ error, true, true);
              }
          });

        var errEvent = bidAuction.BidError({fromBlock: 'latest', toBlock: 'latest', address : itemId});
          errEvent.watch(function(error, result){
              if(!error) {
                me.writeMsg(" Invalid Bid of amount " + result.args.bidAmount
                + " from address " + result.args.bidder + " <p> Error:  " +  getErrMsg(result.args.errorCode.toString()), true, true);
              }
              else {
                me.writeMsg("Err in BidError event "+ error, true, true);
              }
          });

          var tktEvent = bidAuction.TicketAlloted({fromBlock: 'latest', toBlock: 'latest', address : itemId});
          tktEvent.watch(function(error, result){
              if(!error) {
                me.writeMsg("Ticket Id " + result.args.pTicketId + " alloted to " + result.args.bidder+ " for amount " + result.args.bidAmount, false, true);
              } else {
                me.writeMsg("Err in TicketAlloted event "+ error, true, true);
              }
          });
  }
  */
}


export default App;
