import React, {Component} from "react";
import {chunk} from "./SiteListComponent";
import DeskItem from "./DeskItemComponent";
import {fullDeskInfo, isBusy, locateElemById} from "./FlexoUtils";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import {BreadcrumbItem} from "reactstrap";
import {Link} from "react-router-dom";

class Space extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        const chunkedDesks = chunk(this.props.desks,1);
        const Counter=()=> <RenderCount sittings={this.props.sittings} desks={this.props.desks}/>;
        const RowDesk=()=>
           (
            chunkedDesks.map((chunk, index) =>
                <div className="row" key={index}>
                    {chunk.filter(d=>d && d!==null).map(desk =>

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
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to={'/sites/' + this.props.siteId + '/floors/'}>
                        {"Floors of the building "+locateElemById(this.props.sites,this.props.siteId)?.name}
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem>
                        <Link to={'/sites/' + this.props.siteId + '/floors/' + this.props.floorId + '/spaces/'}>
                            {'Spaces of floor: '+locateElemById(this.props.floors,this.props.floorId)?.num}
                        </Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{"Desks of the space "+locateElemById(this.props.spaces, this.props.spaceId)?.num} </BreadcrumbItem>
                </Breadcrumb>
            </div>
                    <Counter/>
                   <RowDesk/>
               </div>);

   }
}

export function DeskStatusCounter(desks,sittings) {
    let busyCount= desks.filter(d=>isBusy(sittings,d.id)).filter(t=>t).length;
    let freeCount= desks.filter(d=>!isBusy(sittings,d.id)).filter(t=>t).length;
    let total= desks.length;

    return  {busyCount,freeCount,total};
}

export function RenderCount({desks, sittings}) {
    let {busyCount,freeCount,total} = DeskStatusCounter(desks, sittings);
    if (total && total>0){
    return (
        <div className="col-lg-pull-12">
            <span className="badge-success">{" Free desk :"+freeCount}</span>
            <span className="badge-warning">{" Ocupied desk :"+busyCount}</span>

            <span className="badge-info">{" Total :"+total}</span>

        </div>)
    }
    else {
        return (<div className="col-lg-pull-12">
            <span className="badge-info">{" Total :"+total}</span>

        </div>);
    }
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

