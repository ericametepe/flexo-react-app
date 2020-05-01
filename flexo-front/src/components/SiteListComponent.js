import React from "react";
import {
    Link,
} from "react-router-dom";


export default function SiteList ({sites}) {
    let chunkedSites =chunk(sites,3);
    return (
        chunkedSites.map((chunk, index) =>
        <div className="row" key={index}>
            {chunk.map(site =>

                <div className="col-sm" key={site.id}>
                    <Link to={"/sites/"+site.id+"/floors"}>
                    <i className="map marker alternate"/>
                    <div className="description">
                        {site.name}
                    </div>
                   </Link>
                    <div className="description">
                        {site.adresse}
                    </div>
                    <div className="badge-pill">
                        {freeDeskCount(site)}
                    </div>

            </div>

                   )}
        </div>

        )


    )

}

export const freeDeskCount=(site, sittings)=>{
    return 5;
};



export const chunk= (input, partitionSize=3)=>{
    let output = [];

    for (let i = 0; i < input.length; i += partitionSize)
    {
        output[output.length] = input.slice(i, i + partitionSize);
    }

    return output;
};



