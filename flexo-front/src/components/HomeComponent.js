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
                        sittings={props.sittings}
            />
        </div>);
    }


export default  Home;








