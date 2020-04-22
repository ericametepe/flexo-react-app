import React, {Component} from "react";

class DeskItem extends Component{
    constructor(props) {
        super(props);
        this.state={
            free:true,
            isInSitting:false
        };
        this.useDesk=this.useDesk.bind(this);

    }

    useDesk(event) {
        console.log(`${event.target} : Use the desk :${this.props.num} of space ${this.props.siteId} of floor ${this.props.floorId} of site ${this.props.spaceId}`);
        let sits = this.props.sittings;
        let  {siteId,floorId,spaceId,deskId}=this.props;
        let userId=localStorage.userId;

        let isInSitting = sits.some(sit => sit.siteId.localeCompare(siteId)===0 && sit.spaceId.localeCompare(spaceId)===0
            && sit.userId.localeCompare(userId)===0
            && sit.floorId.localeCompare(floorId)===0
            && sit.deskId.localeCompare(deskId)===0
            && sit.start!==null
            &&sit.end===null);

        if (isInSitting){
           alert(`U cannot sit : you have already a desk in use`);
        } else{
        this.props.postSit(siteId,floorId,spaceId,deskId);
        this.setState({
            free:false
        });
        event.preventDefault();
        event.persist();
        }

    }

    render() {
            if (this.state.free){
                return(
            <div>
                <p> Desk identifier : {this.props.num}</p>
               <button type="button"  className="btn btn-primary" onClick={event => this.useDesk(event)}>Sit</button>
            <button type="button" className="btn btn-dropbox">Rate</button>
            <button type="button" className="btn btn-bitbucket">Scan</button>
            <button type="button" className="btn btn-facebook">Ad as Favorite</button>
            <button type="button" className="btn btn-flickr">Report</button>
        </div>);
            } else {
                return (
                    <div>
                    <p> Desk identifier : {this.props.num}</p>
                    <button type="button" className="btn btn-primary" onClick={()=> this.freeDesk}>Leave</button>
                    <button type="button" className="btn btn-flickr">Rate</button>
                    <button type="button" className="btn btn-flickr">Scan</button>
                    <button type="button" className="btn btn-flickr">Ad as Favorite</button>
                    <button type="button" className="btn btn-flickr">Report</button>
                    </div>)
            }

            }

}
export default DeskItem;
