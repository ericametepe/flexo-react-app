import React,{Component} from "react";
import {chunk, freeDeskCount} from "./SiteListComponent";
import {Link} from "react-router-dom";
import {locateElemById, locateElemsById} from "./FlexoUtils";
import {DeskStatusCounter, RenderCount} from "./SpaceComponent";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import {BreadcrumbItem} from "reactstrap";



export default class Floor extends Component{


    render() {
        const chunkedSpaces = chunk(this.props.spaces,3);
        const RenderChunkedSpace = () => chunkedSpaces.map((chunk, index) =>
            <div className="row" key={index}>
                {chunk.map(space =>
                    <div className="col-sm" key={space.id}>
                        <Link
                            to={'/sites/' + this.props.siteId + '/floors/' + this.props.floorId + '/spaces/' + space.id + "/desks"}>
                            <i className="map marker alternate"/>
                            <i className="fa fa-map-marker"/>
                            <div className="text-danger">
                                {space.num}
                            </div>
                        </Link>
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
                    <BreadcrumbItem><Link to={"/sites/"+this.props.siteId+"/floors/"}>
                        {"Floors of the building "+locateElemById(this.props.sites,this.props.siteId)?.name}
                    </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        {"Open spaces of the floor "+locateElemById(this.props.floors,this.props.floorId)?.num}
                    </BreadcrumbItem>
                </Breadcrumb>
            </div>

            <RenderChunkedSpace/>

                 </div>)
    }

}

export const  findDesksBySpaceId= (desks, spaceId)=> {
    return desks.filter(desk =>desk.spaceId.localeCompare(spaceId)===0);
}

function ListDeskFromSpace(spaces, spaceId,desks, sittings) {
    let myspace= locateElemById(spaces,spaceId);
     let mydesks =desks.filter(desk=>desk.spaceId.localeCompare(spaceId));
      DeskStatusCounter(mydesks,sittings);
}
