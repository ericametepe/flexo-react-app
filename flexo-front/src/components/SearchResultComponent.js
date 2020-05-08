import React, {Component} from "react";
import DeskItem from "./DeskItemComponent";



class SearchResult extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const RenderDeskItems =()=>{
            if (this.props.found){
                return (
                    this.props.items.map(item =>
                        <DeskItem postSit={this.props.postSit}
                                  key={item.id}
                                  deskId={item.id}
                                  siteId={item.siteId}
                                  floorId={item.floorId}
                                  spaceId={item.spaceId}
                                  siteName={item.siteName}
                                  spaceNum={item.spaceNum}
                                  floorNum={item.floorNum}
                                  num={item.num}
                                  image={item.image}
                                  sittings={this.props.sittings}
                                  releaseSit={this.props.releaseSit}
                                  rate={this.props.rate}
                                  report={this.props.report}
                                  addFav={this.props.addFav}
                                  favorites={this.props.favorites}
                                  reports={this.props.reports}/>
                    ))
            }
            else
            {
                return(<div> </div>

                );
            }
        };
        return(<div>
             <RenderDeskItems/>
            </div>);

    }

}

export default SearchResult;
