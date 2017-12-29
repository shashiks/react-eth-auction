//react and Front End imports
import React, {Component } from 'react';
import PropTypes from 'prop-types';
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

export default class AuctionDetails extends Component {

  // componentDidMount() {}
  // componentWillUnmount() {}
  

  constructor (props) {

    super(props);
      //the url should come from config /props
     web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9090"));
     console.warn("webb3 connected  " + web3 );
     AuctionFactory.setProvider(web3.currentProvider);
     Auction.setProvider(web3.currentProvider);

     // this.getAuctionDetails = this.getAuctionDetails.bind(this);
      this.state= {
          auctionId: null,
          totalTickets: null,
          ticketPerPerson: null,
          lastBidder: null,
          lastBid: null,
          highestBidder: null,
          highestBid: null,
          balanceTikets: null,
          auctionStatus: false
      }

      me = this;
        
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




  getAuctionDetails = () => {
    
    let auctioneerId = this.refs.auctioneerId.value; 
    
    AuctionFactory.deployed().then(function(factoryInstance) {
      factoryInstance.getAuction.call(auctioneerId).then(function(result) {
        console.warn("address of auction for  " + auctioneerId + " is " + result);
        var myAuction = Auction.at(result);
        console.warn("auction @  " + myAuction);

        // if(!watching) {
        //   watchEvents(myAuction, result);
        //   watching = 1;
        // }

          me.setState({auctionId : result});

        myAuction.totalTickets.call().then(function(totalTicketsVal) {
          me.setState({totalTickets : totalTicketsVal['c']});
        });
        myAuction.ticketPerPerson.call().then(function(ticketPerPersonVal) {
           me.setState({ticketPerPerson : ticketPerPersonVal['c']});
        });
        myAuction.lastBidder.call().then(function(lastBidderVal) {
          me.setState({lastBidder : lastBidderVal});
        });

        myAuction.lastBid.call().then(function(lastBidVal) {
          me.setState({lastBid : lastBidVal['c']});
        });
        myAuction.highestBidder.call().then(function(highestBidderVal) {
          me.setState({highestBidder : highestBidderVal});
        });
        myAuction.highestBid.call().then(function(highestBidVal) {
          me.setState({highestBid : highestBidVal['c']});
        });
        myAuction.balanceTikets.call().then(function(bal) {
          me.setState({balanceTikets : bal['c']});
        });
        myAuction.isActive.call().then(function(status) {
          console.log('auction status ' + status);
          if(status)
            me.setState({auctionStatus : 'Active'});
          else
            me.setState({auctionStatus : 'Expired'});
        });


      });
      
    });
    
} // getDetails

  render() {
    
    return (
      <div>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="#">Dashboard</a>
        </li>
        <li className="breadcrumb-item active">Tables</li>
      </ol>
      <form>
        <div className="card mb-3">
          <div className="card-header">
            <i className="fa fa-table"></i> Auction Details</div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                  <tbody>
                  
                    <tr>
                      <td>Auctioneer Address</td>
                      <td><input className="form-control" ref="auctioneerId"  defaultValue="0xE7D4fb00EA93027a10101A48F9b791626f232Ac6" placeholder="Enter Auctioneer Address" /></td>
                    </tr>
                    <tr>
                      <td>Auction Id</td>
                      <td>{this.state.auctionId}</td>
                    </tr>
                    <tr>
                      <td>Total Tickets</td>
                      <td>{this.state.totalTickets}</td>
                    </tr>
                    <tr>
                      <td>Tickets Per Person</td>
                      <td>{this.state.ticketPerPerson}</td>
                    </tr>
                    <tr>
                      <td>Last Bidder</td>
                      <td>{this.state.lastBidder}</td>
                    </tr>
                    <tr>
                      <td>Last Bid</td>
                      <td>{this.state.lastBid}</td>
                    </tr>
                    <tr>
                      <td>Highest Bidder</td>
                      <td>{this.state.highestBidder}</td>
                    </tr>
                    <tr>
                      <td>Highest Bid</td>
                      <td>{this.state.highestBid}</td>
                    </tr>
                    <tr>
                      <td>Tickets Remaining</td>
                      <td>{this.state.balanceTikets}</td>
                    </tr>
                    <tr>
                      <td>Auction Status</td>
                      <td>{this.state.auctionStatus}</td>
                    </tr>
                  </tbody>
                </table>                
              </div>
              <div className="form-group">
                <div className="form-row">
                  <div className="col-md-6">
                      <a className="btn btn-primary btn-block" onClick={this.getAuctionDetails}>Details</a>
                  </div>
                </div>
              </div>              
          </div>
        </div>
      </form>
      </div>
    );
  }
}


// AuctionDetails.propTypes = {
//   auctioneerId: PropTypes.string,
//   auctionId: PropTypes.string,
//   totalTickets: PropTypes.number,
//   ticketPerPerson: PropTypes.number,
//   lastBidder: PropTypes.string,
//   lastBid: PropTypes.number,
//   highestBidder: PropTypes.string,
//   highestBid: PropTypes.number,
//   balanceTikets: PropTypes.number,
//   auctionStatus: PropTypes.string
// }



