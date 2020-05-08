import React, {Component} from "react";

import {Button, ListGroup, ListGroupItem} from "react-bootstrap";
import {Control, Form} from "react-redux-form";
import {ScanForm} from "./ScanFormComponent";
import RateForm from "./RateFormComponent";
import {Link} from "react-router-dom";
import {FeedLabel} from "semantic-ui-react";
import {AVG_RATINGS, count_reports, formatNumber} from "./FlexoUtils";
const ISSUES_NUM =["Technical issue","Desk in use","Not Clean","Other","Not functional"];

export const isBusy=(sittings, deskId)=> sittings.some(sit=> sit.deskId.localeCompare(deskId)===0 && sit.end===null && sit.start!==null);
const isYours=(sittings, deskId, userId)=> sittings.some(sit=> sit.deskId.localeCompare(deskId)===0 && sit.end===null && sit.userId.localeCompare(userId)===0);
const isYourFav=(favs, deskId, userId)=> favs.some(sit=> sit.deskId.localeCompare(deskId)===0  && sit.userId.localeCompare(userId)===0);

function RenderDeskOwner({userId, deskId, sittings}){
    let test = isYours(sittings,deskId, userId);
    if (test) {
        return (<span className="fa fa-search-location">Your current office</span>);
    }
        else
            return(<span></span>);
    }



function ReportForm({displayReport, handleSubmitReport}) {
    if (displayReport){
      return  (<div name="reportF" >
            <Form model="reporting"  name="report"  onSubmit={values => handleSubmitReport(values)}>
                <Control.select model=".issueType" name="issueType">
                    {ISSUES_NUM.map(r =>
                        <option key={r}  value={r}>{r}</option>
                    )}.concat(<option key="default" value="">Choose an issue</option>)
                </Control.select>
                <Control.text model=".description" placeholder="description"></Control.text>
                <Button  type="submit" variant="primary"> Submit </Button>
            </Form>
        </div>);
    }else{
        return(<div></div>);
    }
}


class DeskItem extends Component{
    constructor(props) {
        super(props);
        this.state={
            free:true,
            displayRate:false,
            displayReport:false,
            disableFav:false,
            displayScan:false
        };
        this.useDesk=this.useDesk.bind(this);
        this.freeDesk=this.freeDesk.bind(this);
        this.handleSubmitRate=this.handleSubmitRate.bind(this);
        this.handleDisplayRate=this.handleDisplayRate.bind(this);
        this.handledisplayReport=this.handledisplayReport.bind(this);
        this.handleSubmitReport=this.handleSubmitReport.bind(this);
        this.handleAddFavorite=this.handleAddFavorite.bind(this);
        this.handleDisplayScan=this.handleDisplayScan.bind(this);


    }

    handledisplayReport(event){

        this.setState(
            {displayReport:!this.state.displayReport}
        );
        event.preventDefault();
    }

    handleSubmitReport(values){
        let  {siteId,floorId,spaceId,deskId}=this.props;
         values = {siteId,floorId,spaceId,deskId};
        alert(` form data:${JSON.stringify(values)}props=${JSON.stringify(this.props)}`);
        this.props.report(values);
    }

    handleDisplayRate(event){
        console.log(`Rate what ? ${event.target}`);
        this.setState(
            {displayRate:!this.state.displayRate}
        );
        event.preventDefault();
    }
     handleSubmitRate(values) {
         let  {siteId,floorId,spaceId,deskId}=this.props;
         let rate = {siteId,floorId,spaceId,deskId};
         Object.assign(rate,values);
       alert(`our rate ${JSON.stringify(rate)} : form data:${JSON.stringify(values)}`);
        this.props.rate(values);
    };

    useDesk(event) {
        console.log(`${event.target} : Use the desk :${this.props.num} of space ${this.props.siteId} of floor ${this.props.floorId} of site ${this.props.spaceId}`);

        let  {siteId,floorId,spaceId,deskId,sittings}=this.props;
        let localuserId=localStorage.userId;

        let idx = sittings.findIndex(sit =>
            sit.userId.localeCompare(localuserId)===0
            && sit.start!==null
            && sit.end===null

        );

        if (idx!==-1){
            let sit = sittings[idx];
            let url=`/sites/${sit.siteId}/floors/${sit.floorId}/spaces/${sit.spaceId}/desks`;
           alert(`U cannot sit : you have already a desk in use check it at this tab: Activities ` );

        } else{
        this.props.postSit(siteId,floorId,spaceId,deskId);
        }

        event.preventDefault();
        event.persist();

    }

    freeDesk(event) {
        let  {deskId}=this.props;
        let userId=localStorage.userId;

        let sit = this.props.sittings.find(s =>
             s.userId.localeCompare(userId)===0
            && s.deskId.localeCompare(deskId)===0
            && s.start!==null
            && s.end===null);

        if (sit && sit.id){
            this.props.releaseSit(sit);
        } else {
            alert( "You are not allowed to release this desk check yours at tab : Activities");
        }
        event.preventDefault();

        }


    render() {

        let  {deskId, sittings,ratings,reports,favorites}=this.props;
        let userId =localStorage.userId;

        const formRate=()=> {
         if(this.state.displayRate){
            return  (<div name="rateF" >
                <Form name="rate" model="rating" onSubmit={values => this.handleSubmitRate(values)}>
                    <Control.select model=".rate" name="rate">
                      <option key="default" value="">Choose a rate</option>
                      <option  value="1">Choose a rate</option>
                      <option  value="2">Choose a rate</option>
                      <option  value="3">Choose a rate</option>
                    </Control.select>
                    <label>Your comment</label>
                    <Control.text model=".comment"></Control.text>
                    <button type="button" className="btn-primary"> Submit Rate </button>
                </Form>
            </div>);
         }
        };

        const isBusyTest=isBusy(sittings,deskId);

        const isFav = isYourFav(this.props.favorites,deskId, userId);
        return(
            <div>
                <ListGroup horizontal>
                    <RenderDeskOwner userId={userId} sittings={sittings} deskId={deskId}/>&nbsp;
                    Desk  : {this.props.num} &nbsp;
                   <Link to={'/sites/' + this.props.siteId + '/floors/' + this.props.floorId + '/spaces/' + this.props.spaceId + "/desks"}>
                       Space : {this.props.spaceNum}&nbsp;&nbsp;
                   </Link>
                    <FeedLabel>Floor  :&nbsp;&nbsp;</FeedLabel>
                    <Link to={"/sites/"+this.props.siteId+"/floors/"+this.props.floorId+"/spaces"}>
                      {this.props.floorNum}&nbsp;&nbsp;
                    </Link>
                    Building :&nbsp;&nbsp;
                    <Link to={"/sites/"+this.props.siteId+"/floors/"}>
                         {this.props.siteName}
                    </Link>
                </ListGroup>

                <div className="container" name="desk">
                    <div className="row">
                   <div className="col" name="sit">
                    <form name={isBusyTest?'Exit':'sit'} onClick={isBusyTest? event =>  this.freeDesk(event):event=>this.useDesk(event)}>
                    <div   className="ui primary button" >
                          {isBusy(sittings, deskId)?'Exit':'Sit'}
                    </div>
                        <i className="ui basic blue left pointing label">{sittings?sittings.filter(sit=>sit.deskId.localeCompare(deskId)===0 &&
                        sit.start!==null && sit.end!==null).length:0}</i>
                    </form>
                   </div>

                    <div className="col">
                    <button type="button" className="ui yellow button"  onClick={event => this.handleDisplayRate(event)}>
                        <i className="star icon">   </i>
                    </button>
                        <i className="ui basic yellow left pointing label">{AVG_RATINGS(ratings)}</i>
                     <RateForm displayRate={this.state.displayRate} handleSubmitRate={this.handleSubmitRate}/>
                    </div>

                        <div className="col">
                    <div name="scan">
                        <div  className="ui black button" onClick={this.handleDisplayScan}>
                        <i className="barcode icon">Scan</i>
                        </div>

                        <ScanForm display={this.state.displayScan} image={this.props.image} num={this.props.num}/>
                    </div>
                        </div>

                        <div className="col">
                        <button  className="ui pink button" onClick={this.handleAddFavorite}  disabled={isFav}>
                            <i className="heart icon"></i>
                        </button>
                            <i className="ui basic pink left pointing label">{formatNumber(favorites?favorites.filter(f=>f.deskId.localeCompare(deskId)===0).length:0)}</i>
                        </div>

                        <div className="col-md-auto">
                        <div className="ui red button" onClick={event => this.handledisplayReport(event)}>
                            <i className="flag icon"></i>
                        </div>
                            <i className="ui basic red left pointing label">{count_reports(reports,userId)}</i>
                        <ReportForm displayReport={this.state.displayReport}  handleSubmitReport={this.handleSubmitReport}/>
                        </div>
                </div>
                    <hr/>
        </div>
            </div>);
            }

    handleAddFavorite() {
        let  {siteId,floorId,spaceId,deskId}=this.props;
        let fav = {siteId,floorId,spaceId,deskId};
        this.props.addFav(fav);
        this.setState({
            disableFav:!this.state.disableFav
        });
    }

    handleDisplayScan() {
        this.setState({
            displayScan:!this.state.displayScan
        });
    }
}
export default DeskItem;
