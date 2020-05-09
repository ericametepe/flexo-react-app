import {Link} from "react-router-dom";
import React from "react";



 function FreeSearchResultBox({resultSearch,keyword}){
    if ( keyword && keyword.length && resultSearch.length>0){
        return(
            <div>
                <p>Result for search : <mark>{keyword}</mark></p>

                <ul className="list-group">
                    <Link to={"/sites/"+resultSearch[0].siteId+"/floors"}>
                        <p>Site : {resultSearch[0].siteName} </p>
                    </Link>
                    {resultSearch[0].floors.map(f=>{
                        return  (
                            <li key={f.id} className="list-group-item-success">
                                <Link to={'/sites/' + resultSearch[0].siteId + '/floors/' + f.id + '/spaces/'}>
                                    {f.num}
                                </Link>
                            </li>)
                    })}

                </ul>
            </div>
        )
    } else if (keyword && keyword!=="") {
        return (<div>
            <p>No Result for search :<mark>{keyword}</mark></p>
            <Link to={"/home"}> Browse offices here...</Link>
        </div>);
    } else {
        return (<div></div>);
    }
}

export default  FreeSearchResultBox;
