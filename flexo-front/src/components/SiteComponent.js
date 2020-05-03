import React,{Component} from "react";
import {chunk, freeDeskCount} from "./SiteListComponent";
import {Link} from "react-router-dom";
import {RenderCount} from "./SpaceComponent";
import {findDesksBySpaceId} from "./FloorComponent";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import {BreadcrumbItem} from "reactstrap";
import {locateElemById} from "./FlexoUtils";

export function findDesksByFloorId(desks,spaces, floorId ){
    let myspaces = spaces.filter(sp=>sp.floorId.localeCompare(floorId));
    let result =[];
    myspaces.forEach(sp=>{
        let mydesk = findDesksBySpaceId(desks,sp.id);
        if (mydesk && mydesk.length>0){
           result= result.concat(mydesk);
           }
    });
    return result;
}

export default class Site extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        const chunkedFloors = chunk(this.props.floors,3);
        const RenderChunkedFloors=()=>
              (chunkedFloors.map((chunk, index) =>
                <div className="row" key={index}>
                    {chunk.map(floor =>
                        <div className="col-sm" key={floor.id}>
                            <Link to={"/sites/"+this.props.siteId+"/floors/"+floor.id+"/spaces"}>
                                <i className="map marker alternate"/>
                                <div className="description">
                                    {floor.num}
                                </div>
                            </Link>
                            <div className="badge-pill">
                                <RenderCount desks={findDesksByFloorId(this.props.desks,this.props.spaces, floor.id)} sittings={this.props.sittings}/>
                            </div>

                        </div>
                    )}
                </div>

            ));


        return (
            <div>
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{"Floors of the building "+locateElemById(this.props.sites,this.props.siteId)?.name} </BreadcrumbItem>
                </Breadcrumb>
            </div>
                <RenderChunkedFloors/>
            </div>

        );

    }


}
