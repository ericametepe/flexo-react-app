import React, {Component} from "react";
import {
    Link,
} from "react-router-dom";
import {RenderCount} from "./SpaceComponent";
import {findDesksByFloorId} from "./SiteComponent";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import {BreadcrumbItem} from "reactstrap";


function findDesksBySiteId(sites, floors, spaces, desks, siteId) {
    let result =[];
    let myfloors=floors.filter(f=>f.siteId.localeCompare(siteId)===0);
        myfloors.forEach(floor =>{
            let desksByFloorId = findDesksByFloorId(desks,spaces,floor.id);
            if (desksByFloorId && desksByFloorId.length>0){
               result =result.concat(desksByFloorId);
            }
        });
    return result;
}

export default class SiteList extends Component {

    render() {
    let chunkedSites =chunk(this.props.sites,3);
    const FloorsChunked=()=>{
        return (
        chunkedSites.map((chunk, index) =>
        <div className="row" key={index}>
            {chunk.map(site =>

                <div className="col-sm" key={site.id}>
                    <Link to={"/sites/"+site.id+"/floors"}>
                    <i className="map marker alternate"/>
                    <div className="description">
                        {site.name}
                    </div>
                   </Link>
                    <div className="description">
                        {site.adresse}
                    </div>
                    <div className="badge-pill">
                        <RenderCount desks={findDesksBySiteId(this.props.sites,this.props.floors,this.props.spaces,this.props.desks, site.id)}
                                     sittings={this.props.sittings}/>
                    </div>

            </div>)}
        </div>
        ))}

        return(<div className="container-fluid">
                    <FloorsChunked/>
                </div> )

    }


}

export const freeDeskCount=(site, sittings)=>{
    return 5;
};



export const chunk= (input, partitionSize=3)=>{
    let output = [];

    for (let i = 0; i < input.length; i += partitionSize)
    {
        output[output.length] = input.slice(i, i + partitionSize);
    }

    return output;
};



