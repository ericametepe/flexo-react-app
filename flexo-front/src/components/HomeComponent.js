import React from "react";
import SearchForm from "./SearchFormComponent";


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
            />
        </div>);
    }


export default  Home;








