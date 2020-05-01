import React,{Component} from "react";
import {chunk, freeDeskCount} from "./SiteListComponent";
import {Link} from "react-router-dom";

export default class Site extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        const chunkedFloors = chunk(this.props.floors,3);

        return (
            chunkedFloors.map((chunk, index) =>
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
                                {freeDeskCount(floor)}
                            </div>

                        </div>
                    )}
                </div>

            )
        );

    }


}
