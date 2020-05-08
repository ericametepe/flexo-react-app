import React from "react";
import SearchForm from "./SearchFormComponent";
import SiteList from "./SiteListComponent";


function Home(props) {
        return(
        <div>
            <SearchForm sites={props.sites}
                        floors={props.floors}
                        spaces={props.spaces}
                        desks={props.desks}
                        loading={props.sitesLoading}
                        errSites={props.sitesErrMsg}
                        postSit={props.postSit}
                        releaseSit={props.releaseSit}
                        rate={props.rate}
                        report={props.report}
                        sittings={props.sittings}
                        addFav={props.addFav}
                        favorites={props.favorites}
                        reports ={props.reports}
            />

            <div className="container-fluid">

            </div>

            <h4>Browse our Office buildings</h4>

            <SiteList sites={props.sites}
                      floors={props.floors}
                      spaces={props.spaces}
                      desks={props.desks}
                      sittings={props.sittings}/>
            <hr/>
        </div>

        );
    }


export default  Home;








