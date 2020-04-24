import React, {Component} from "react";
import DeskItem from "./DeskItemComponent";

class SearchResult extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.items&& this.props.items.length>0){
              return (
                   this.props.items.map(item =>
                    <DeskItem postSit={this.props.postSit}
                              key={item.id}
                              deskId={item.id}
                              siteId={item.siteId}
                              floorId={item.floorId}
                              spaceId={item.spaceId}
                              num={item.num}
                              sittings={this.props.sittings}
                              releaseSit={this.props.releaseSit}
                              rate={this.props.rate}/>
              ))
        }
      else
        {
            return(<h4>No data Browse our sites here</h4>);
        }
    }

}

export default SearchResult;
