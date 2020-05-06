import React,{Component} from "react";
import {chunk} from "./SiteListComponent";
import {Link} from "react-router-dom";
import {locateElemById} from "./FlexoUtils";
import {DeskStatusCounter, RenderCount} from "./SpaceComponent";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import {BreadcrumbItem} from "reactstrap";

function LinkToDesk({siteId, floorId, spaceId, spaceNum, desks}) {
    let allDesks=findDesksBySpaceId(desks, spaceId);
    if( allDesks && allDesks.length>0){
        return (
            <Link to={'/sites/' + siteId + '/floors/' + floorId + '/spaces/' + spaceId + "/desks"}>
                <i className="map marker alternate"/>
                <i className="fa fa-map-marker"/>
                <div className="text-danger">
                    {spaceNum}
                </div>
            </Link>);
    } else {
        return (<div>
            <i className="map marker alternate"/>
            <i className="fa fa-map-marker"/>
            <div className="text-danger">
                {spaceNum}
            </div>
        </div>)
    }

}


export default class Floor extends Component {

    render() {
         const chunkedSpaces = chunk(this.props.spaces, 3);
            const RenderChunkedSpace = () => chunkedSpaces.map((chunk, index) =>
                <div className="row" key={index}>
                    {chunk.map(space =>
                        <div className="col-sm" key={space.id}>
                            <LinkToDesk siteId={this.props.siteId} floorId={this.props.floorId} spaceId={space.id}
                                        spaceNum={space.num} desks={this.props.desks}/>
                            <div className="badge-pill">
                                <RenderCount desks={findDesksBySpaceId(this.props.desks, space.id)}
                                             sittings={this.props.sittings}/>
                            </div>

                        </div>
                    )}
                </div>
            );
            return (<div className="container-fluid">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem><Link to={"/sites/" + this.props.siteId + "/floors/"}>
                            {"Floors of the building " + locateElemById(this.props.sites, this.props.siteId)?.name}
                        </Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {"Open spaces of the floor " + locateElemById(this.props.floors, this.props.floorId)?.num}
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <RenderChunkedSpace/>

            </div>);
        }
    }


export const  findDesksBySpaceId= (desks, spaceId)=> {
    return desks.filter(desk =>desk.spaceId.localeCompare(spaceId)===0);
};

function ListDeskFromSpace(spaces, spaceId,desks, sittings) {
    let myspace= locateElemById(spaces,spaceId);
     let mydesks =desks.filter(desk=>desk.spaceId.localeCompare(spaceId));
      DeskStatusCounter(mydesks,sittings);
}

