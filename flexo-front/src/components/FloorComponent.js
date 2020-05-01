import React,{Component} from "react";
import {chunk, freeDeskCount} from "./SiteListComponent";
import {Link} from "react-router-dom";

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
                                {freeDeskCount(space)}
                            </div>

                        </div>
                    )}
                </div>

            )
        )
    }

}
