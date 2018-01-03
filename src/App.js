//react and Front End imports
import React, { Component } from 'react';

import CreateAuction from './Create.js'
import AuctionDetails from './Details.js'
import BidAuction from './Bid.js'
import PurchaseTicket from './PurchaseTicket.js'
import Settlement from './Settlement.js'

import {watchEvents} from './event-watcher.js'
// https://daveceddia.com/open-modal-in-react/


class App extends Component {

  // componentDidMount() {}
  // componentWillUnmount() {}
  
  constructor (props) {
        super(props);
        this.state = {
          currAuction: null,
          auctionId: null,
          auctioneerId: '0xE7D4fb00EA93027a10101A48F9b791626f232Ac6',
          feature: 'A',
          sub_feature: 'bid',
          message: null
        }
  }


  updateStatus = (msgVal, isErr, append, clear)  => {


        if(clear) {
          this.setState({message: null});
          return;
        }

        if(isErr) {
          msgVal = "<font color='red'>" + msgVal + "</font>";
        }
        msgVal = "<p>" + msgVal + "</p>";
        if(append && this.state.message) {
          msgVal = this.state.message + msgVal;
        } 
        this.setState({message: msgVal});
  }

  setAuctionDetails = (pAuction, pAuctioneerId) => {
    this.setState({auctioneerId: pAuctioneerId});

  }

  setAuctionId = (pAuctionObj, pAuctionId) => {

    if(pAuctionObj) {
      this.setState({auctionId: pAuctionId});
      //start listening to events when the auction is created
      watchEvents(pAuctionObj, pAuctionId, this.updateStatus);
    }

    // getErrMsg('100');

  }



  render() {
    
    return (

    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">

               <li className="nav-item" data-toggle="tooltip" data-placement="right" title="Auction Management">
                <a onClick={ () => { this.setState({feature : 'A'});  this.setState({sub_feature : 'view'})  } }  className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseExamplePages" data-parent="#exampleAccordion">
                  
                  <span className="nav-link-text">Auction Management</span>
                </a>
                <ul className="sidenav-second-level collapse" id="collapseExamplePages">
                  <li>
                    <a onClick={ () => { this.setState({feature : 'A'});this.setState({sub_feature : 'create'}) } }>Create</a>
                  </li>
                  <li>
                    <a onClick={ () => { this.setState({feature : 'A'});this.setState({sub_feature : 'view'}) } }>View</a>
                  </li>
                  <li>
                    <a onClick={ () => { this.setState({feature : 'A'});this.setState({sub_feature : 'bid'}) } }>Bid</a>
                  </li>
                  <li>
                    <a onClick={ () => { this.setState({feature : 'A'});this.setState({sub_feature : 'pay'}) } }>Pay Ticket</a>
                  </li>
                  <li>
                    <a onClick={ () => { this.setState({feature : 'A'});this.setState({sub_feature : 'settle'}) } }>Settle Payments</a>
                  </li>
                  <li>
                    <a onClick={ () => { this.setState({feature : 'A'}); this.setState({sub_feature : 'del'}) } }>Remove</a>
                  </li>
                </ul>
              </li>

             <li className="nav-item" data-toggle="tooltip" data-placement="right" title="File Management">
                <a onClick={ () => { this.setState({feature : 'F'});  this.setState({sub_feature : 'write'})  } }  className="nav-link nav-link-collapse collapsed" data-toggle="collapse" href="#collapseFileMgmt" data-parent="#Accordion">
                  
                  <span className="nav-link-text">File Management</span>
                </a>
                <ul className="sidenav-second-level collapse" id="collapseFileMgmt">
                  <li>
                    <a onClick={ () => {this.setState({feature : 'F'}); this.setState({sub_feature : 'dir'}) } }>Create Dir</a>
                  </li>
                  <li>
                    <a onClick={ () => {this.setState({feature : 'F'}); this.setState({sub_feature : 'write'}) } }>Write Content</a>
                  </li>
                  <li>
                    <a onClick={ () => {this.setState({feature : 'F'}); this.setState({sub_feature : 'read'}) } }>View Content</a>
                  </li>
                  <li>
                    <a onClick={ () => {this.setState({feature : 'F'}); this.setState({sub_feature : 'upload'}) } }>Upload File</a>
                  </li>
                  <li>
                    <a onClick={ () => {this.setState({feature : 'F'}); this.setState({sub_feature : 'download'}) } }>Download File</a>
                  </li>
                  <li>
                    <a onClick={ () => {this.setState({feature : 'F'}); this.setState({sub_feature : 'del'}) } }>Remove Files / Dir</a>
                  </li>
                </ul>
              </li>

            </ul>
          </div>
        </nav>

          <div className="content-wrapper">
          <div className="container-fluid">
              <ol className="breadcrumb">
                <li className="breadcrumb-item active">{this.state.feature}</li>
                <li className="breadcrumb-item">{this.state.sub_feature}</li>
              </ol>
              
                <div className="card-header"> 
                      <div dangerouslySetInnerHTML={{__html: this.state.message}} />
                </div>

                  { this.state.feature === 'A' && this.state.sub_feature === 'create' && 
                    <CreateAuction onAuctionDetails={this.setAuctionDetails} notifier={this.updateStatus}/>
                   } 


                  { this.state.feature === 'A' && this.state.sub_feature === 'view' && 
                    <AuctionDetails auctioneerId={this.state.auctioneerId} onAuctionId={this.setAuctionId} notifier={this.updateStatus} />
                   } 

                  { this.state.feature === 'A' && this.state.sub_feature === 'bid' && 
                    <BidAuction auctionId={this.state.auctionId} notifier={this.updateStatus} />
                   } 

                  { this.state.feature === 'A' && this.state.sub_feature === 'pay' && 
                    <PurchaseTicket auctionId={this.state.auctionId} notifier={this.updateStatus} />
                   } 

                  { this.state.feature === 'A' && this.state.sub_feature === 'settle' && 
                    <Settlement auctioneerId={this.state.auctioneerId} auctionId={this.state.auctionId} notifier={this.updateStatus}/>
                  } 



            </div> 
          </div>

        </div>


    );
  }
}


export default App;
