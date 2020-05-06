import React from "react";
import {Link} from "react-router-dom";

export default function PrefTab(){
    return(<ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
            <Link to="/prefs">
            <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home"
               aria-selected="true">Preferences</a>
            </Link>
        </li>

        <li className="nav-item">
            <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab"
               aria-controls="profile" aria-selected="false">Recommendations</a>
        </li></ul>);
}
