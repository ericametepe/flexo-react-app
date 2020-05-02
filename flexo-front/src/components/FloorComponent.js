import React,{Component} from "react";
import {chunk, freeDeskCount} from "./SiteListComponent";
import {Link} from "react-router-dom";
import {locateElemById, locateElemsById} from "./FlexoUtils";
import {DeskStatusCounter, RenderCount} from "./SpaceComponent";



export default class Floor extends Component{


    render() {
        const chunkedSpaces = chunk(this.props.spaces,3);
        return (
            chunkedSpaces.map((chunk, index) =>
                <div className="row" key={index}>
                    {chunk.map(space =>
                        <div className="col-sm" key={space.id}>
                            <Link to={'/sites/'+this.props.siteId+'/floors/'+this.props.floorId+'/spaces/'+space.id+"/desks"}>
                            <i className="map marker alternate"/>
                            <i className="fa fa-map-marker"/>
                            <div className="text-danger">
                                {space.num}
                            </div>
                            </Link>
                            <div className="badge-pill">
                                <RenderCount desks={findDesksBySpaceId(this.props.desks,space.id)}  sittings={this.props.sittings}/>
                            </div>

                        </div>
                    )}
                </div>

            )
        )
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
