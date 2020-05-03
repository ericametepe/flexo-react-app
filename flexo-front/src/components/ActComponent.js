import React, {Component} from "react";
import DeskItem from "./DeskItemComponent";
import {locateUserActions, nbUsers, onlyUnique} from "./FlexoUtils";
import {Alert, BreadcrumbItem} from "reactstrap";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import {Link} from "react-router-dom";

 class Act extends Component{
    constructor(props) {
        super(props);
    }


    render() {
        let userId=this.props.userId;

         let greports = this.props.reports;
          let ureports=this.props.userreports.length
         let  greporters = greports.map(r=>r.userId).filter(onlyUnique).length;
         let g_avg=0;
          let u_avg=0;
         if(greporters>0){
           g_avg=greports.length/greporters;
         }
         if (greports>0){
           u_avg = ureports/greports;
         }
         let gsits=this.props.sittings;
         let usits=locateUserActions(gsits,this.props.userId).length;
         let  gsitters = nbUsers(gsits);
        let gsit_avg=0;
        let usit_avg=0;
        if(gsitters>0){
            gsit_avg=gsits.length/gsitters;
        }
        if (gsits.length>0){
            usit_avg = usits/gsits.length;
        }

        let gratings=this.props.ratings;
        let uratings=locateUserActions(gratings, userId);
        let uratings_avg=0;
        let gratings_avg=0;

        if(uratings.length>0) {
            uratings_avg = uratings.map(r => r.rate).reduce((a, b) => (a + b ),0) / uratings.length;
        }
        if(nbUsers(gratings)>0){
          gratings_avg= gratings.map(e=>e.rate).reduce((a,b)=>(a+b,0))/nbUsers(gratings);
        }

        const CurrentDesk=()=> {
            if (this.props.usersit && this.props.usersit.id){
                let  {siteId,floorId,spaceId,deskId,deskNum,floorNum,spaceNum,siteName,image}=this.props.usersit;
                return (
                    <div>
                        <DeskItem postSit={this.props.postSit}
                                  deskId={deskId}
                                  siteId={siteId}
                                  floorId={floorId}
                                  spaceId={spaceId}
                                  num={deskNum}
                                  floorNum={floorNum}
                                  spaceNum={spaceNum}
                                  siteName={siteName}
                                  image={image}
                                  sittings={this.props.sittings}
                                  releaseSit={this.props.releaseSit}
                                  rate={this.props.rate}
                                  report={this.props.report}
                                  addFav={this.props.addFav}
                                  favorites={this.props.favorites}/>
                    </div>);
            }
             else{
                 return(<Alert color="warning">U don't have current desk yet </Alert>);
                 }
        };

        const LastDesk=()=> {
            if (this.props.lastsit && this.props.lastsit.id){
              let  {siteId,floorId,spaceId,deskId,deskNum,floorNum,spaceNum,siteName,image}=this.props.lastsit;
                return (
                    <div> <p>Your previous</p>
                        <DeskItem postSit={this.props.postSit}
                                  deskId={deskId}
                                  siteId={siteId}
                                  floorId={floorId}
                                  spaceId={spaceId}
                                  num={deskNum}
                                  floorNum={floorNum}
                                  spaceNum={spaceNum}
                                  siteName={siteName}
                                  image={image}
                                  sittings={this.props.sittings}
                                  releaseSit={this.props.releaseSit}
                                  rate={this.props.rate}
                                  report={this.props.report}
                                  addFav={this.props.addFav}
                                  favorites={this.props.favorites}/>
                    </div>);
            }
             else{
                 return(<Alert color="warning">No desk used since </Alert>);
                 }
        };

                     return(<div className="container-fluid">
                         <div className="row">
                             <Breadcrumb>
                                 <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                                 <BreadcrumbItem active>Activities </BreadcrumbItem>
                             </Breadcrumb>
                         </div>
                             <CurrentDesk/>
                         <br/>
                         <LastDesk/>
                         <br/>

                              <h4>Your stats...</h4>
                              <div>
                                  <ListGroup>
                                      <ListGroupItem variant="success">Your total report
                                          <span className="badge-info"> {ureports} </span>
                                          | Global report
                                         <span className="badge-info">{this.props.reports.length}</span>
                                         | Your report average <span className="badge-info"> {u_avg} </span>| Global report average
                                         <span className="badge-info"> {g_avg}</span>
                                      </ListGroupItem>

                                      <ListGroupItem className="list-group-item-success">
                                          Your total desk usage<span className="badge-info"> {usits} </span>
                                          | Global usage <span className="badge-info">{gsits.length} </span>
                                          | Your desk usage average <span className="badge-info"> {usit_avg} </span>
                                          | Global usage average <span className="badge-info"> {gsit_avg} </span>
                                      </ListGroupItem>

                                     <ListGroupItem className="list-group-item-success">
                                         Your total ratings<span className="badge-info"> {uratings.length} </span>
                                         | Global ratings <span className="badge-info">{gratings.length} </span>
                                         | Your rate average <span className="badge-info"> {uratings_avg} </span>
                                         | Global rate average <span className="badge-info">{gratings_avg}</span>
                                     </ListGroupItem>
                                  </ListGroup>
                              </div>
                    </div>);

    }

 }
export default  Act;
