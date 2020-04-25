import React, {Component} from "react";

import {Button} from "react-bootstrap";
import {Control, Form} from "react-redux-form";
const RATES_NUM =[1,2,3,4,5];
const ISSUES_NUM =["Technical issue","Desk in use","Not Clean","Other","Not functional"];



function RateForm({displayRate, handleSubmitRate}) {
    if (displayRate){
    return  (<div name="rateF" >
        <Form model="rating"  name="rate"  onSubmit={values => handleSubmitRate(values)}>
            <Control.select model=".rate" name="rate">
                {RATES_NUM.map(r =>
                    <option key={r}  value={r}>{r}</option>
                )}.concat(<option key="default" value="">Choose a rate</option>)
            </Control.select>
            <label>Your comment</label>
            <Control.text model=".comment"></Control.text>
            <Button  type="submit" variant="outline-primary"> Submit </Button>
        </Form>
    </div>);
    }else{
        return(<div></div>);
    }
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
            displayReport:false
        };
        this.useDesk=this.useDesk.bind(this);
        this.freeDesk=this.freeDesk.bind(this);
        this.handleSubmitRate=this.handleSubmitRate.bind(this);
        this.handleDisplayRate=this.handleDisplayRate.bind(this);
        this.handledisplayReport=this.handledisplayReport.bind(this);
        this.handleSubmitReport=this.handleSubmitReport.bind(this);

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
           alert(`U cannot sit : you have already a desk in use: ${JSON.stringify(sittings[idx])}`);
        } else{
        this.props.postSit(siteId,floorId,spaceId,deskId);
        }

        event.preventDefault();
        event.persist();

    }

    freeDesk(event) {
        let  {siteId,floorId,spaceId,deskId, sittings}=this.props;
        let userId=localStorage.userId;
        console.log(`${event.target} : Use the desk :${this.props.num} of space ${this.props.siteId}
         of floor ${this.props.floorId} 
         of site ${this.props.spaceId} userId:${userId}`);

        let idx = sittings.findIndex(sit =>
             sit.userId.localeCompare(userId)===0
            && sit.deskId.localeCompare(deskId)===0
            && sit.spaceId.localeCompare(spaceId)===0
            && sit.floorId.localeCompare(floorId)===0
            && sit.siteId.localeCompare(siteId)===0
            && sit.start!==null
            &&sit.end===null);

        if (idx && idx!==-1){
            let sit = sittings[idx];
            this.props.releaseSit(sit);
        } else {
            alert(userId + "You are not allowed to release this desk"+JSON.stringify(this.props));
        }

        event.preventDefault();
        event.persist();
        }


    render() {
        let  {siteId,floorId,spaceId,deskId, sittings}=this.props;

        let userId =localStorage.userId;

        let idxPresent  = sittings.findIndex(sit => sit.userId.localeCompare(userId)===0 &&
            sit.start!=null
            && sit.end===null
            && sit.deskId.localeCompare(deskId)===0
            && sit.spaceId.localeCompare(spaceId)===0
            && sit.floorId.localeCompare(floorId)===0
            && sit.siteId.localeCompare(siteId)===0
        );


        let  idx  = sittings.findIndex(sit => sit.siteId.localeCompare(siteId)===0
            && sit.spaceId.localeCompare(spaceId)===0
            && sit.floorId.localeCompare(floorId)===0
            && sit.deskId.localeCompare(deskId)===0
            && sit.start!==null
            &&sit.end===null);

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
                    <Button type="submit" className="btn-primary"> Submit Rate </Button>
                </Form>
            </div>);
         }
        };


            if (idx===-1){
                return(
            <div>
                <p> Desk identifier : {this.props.num}</p>
               <button type="button"  className="btn btn-primary" onClick={event => this.useDesk(event)}>Sit</button>
            <button type="button" className="btn btn-primary"  onClick={event => this.handleDisplayRate(event)}>Rate</button>
                <RateForm displayRate={this.state.displayRate} handleSubmitRate={this.handleSubmitRate}></RateForm>
            <button type="button" className="btn btn-primary">Scan</button>
            <button type="button" className="btn btn-primary">Ad as Favorite</button>
            <button type="button" className="btn btn-primary" onClick={event => this.handledisplayReport(event)}>Report</button>
                <ReportForm displayReport={this.state.displayReport}  handleSubmitReport={this.handleSubmitReport}></ReportForm>
        </div>);
            } else {
                return (
                    <div>
                    <p> Desk identifier : {this.props.num}</p>
                    <button type="button" className="btn btn-primary" onClick={(event)=> this.freeDesk(event)}>Leave</button>
                    <button type="button" className="btn btn-flickr">Rate</button>
                    <button type="button" className="btn btn-flickr">Scan</button>
                    <button type="button" className="btn btn-flickr">Ad as Favorite</button>
                    <button type="button" className="btn btn-flickr">Report</button>
                    <button type="button" className="btn btn-flickr">U're here</button>
                    </div>)
            }

            }




}
export default DeskItem;
