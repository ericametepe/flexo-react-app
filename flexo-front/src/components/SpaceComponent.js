import React, {Component} from "react";
import {chunk} from "./SiteListComponent";
import DeskItem from "./DeskItemComponent";
import {fullDeskInfo, isBusy} from "./FlexoUtils";

class Space extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        const chunkedDesks = chunk(this.props.desks,3);
        const Counter=()=> <RenderCount sittings={this.props.sittings} desks={this.props.desks}/>;
        const RowDesk=()=>
           (
            chunkedDesks.map((chunk, index) =>
                <div className="row" key={index}>

                    {chunk.map(desk =>
                        <div className="col-sm" key={desk.id}>
                                <i className="fa fa-map-marker"/>
                            <div className={isBusy(this.props.sittings,desk.id)?"text-warning":"text-success"}>
                            <RenderDesk postSit={this.props.postSit}
                                        deskId={desk.id}
                                        desks={this.props.desks}
                                        spaces={this.props.spaces}
                                        floors={this.props.floors}
                                        sites={this.props.sites}
                                        sittings={this.props.sittings}
                                        releaseSit={this.props.releaseSit}
                                        rate={this.props.rate}
                                        report={this.props.report}
                                        addFav={this.props.addFav}
                                        favorites={this.props.favorites}/>
                            </div>

                        </div>
                    )}

                </div>

            )
        );
        return (<div className="container-fluid">
                    <Counter/>
                   <RowDesk/>
               </div>);

   }
}

export function DeskStatusCounter(desks,sittings) {
    let busyCount= desks.filter(d=>isBusy(sittings,d.id)).length;
    let freeCount= desks.filter(d=>!isBusy(sittings,d.id)).length;
    let total= desks.filter(d=>d && d.id!==null).length;

    return  {busyCount,freeCount,total};
}

export function RenderCount({desks, sittings}) {
    let {freeCount,total} = DeskStatusCounter(desks, sittings);
    return (
        <div className="col-lg-pull-12">
            <span className="badge-success">{" Free desk :"+freeCount}</span>

            <span className="badge-warning">{" Total :"+total}</span>

        </div>)
}




function RenderDesk({postSit, deskId,desks,spaces,floors,sites,sittings,releaseSit,rate,report,addFav,favorites}){
       let info = fullDeskInfo(deskId,desks, spaces, floors, sites, sittings);

        return (
            <div>
                <DeskItem postSit={postSit}
                          deskId={info.id}
                          siteId={info.siteId}
                          floorId={info.floorId}
                          spaceId={info.spaceId}
                          num={info.num}
                          floorNum={info.floorNum}
                          spaceNum={info.spaceNum}
                          siteName={info.siteName}
                          image={info.image}
                          sittings={sittings}
                          releaseSit={releaseSit}
                          rate={rate}
                          report={report}
                          addFav={addFav}
                          favorites={favorites}/>

        </div>);


}

export default Space;

