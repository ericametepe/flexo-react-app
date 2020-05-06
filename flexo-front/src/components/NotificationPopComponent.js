import {ListGroupItem} from "react-bootstrap";
import React from "react";

function Notifs({activeNotifs}){
    return (activeNotifs.map((notif) =>
        <ul className="list-group">
            <li className="list-group-item-success" key={notif.id}>{notif.type.toLowerCase() + " "+ notif.nStart} </li>
        </ul>

    ))
}
export default function RenderNotifPop({display, activeNotifs, handleClear}) {
    if (display){
       return (<div onMouseLeave={handleClear}>
               <Notifs activeNotifs={activeNotifs} />
               </div>

       );
    }
    else {
        return (<div></div>);
    }

}

function SitItem({lastSit}) {
    if (lastSit){
        return(<ListGroupItem>
            {'Your last sit occurs at:'+lastSit.start }
        </ListGroupItem>);
    }
        else{
            return null;
        }
    }

    function PrefItem({lastPref}) {
    if (lastPref){
        return(<ListGroupItem>
            {'Your pref desk added occurs:'+lastPref.date }
        </ListGroupItem>);
    }
        else{
            return null;
        }
    }


export function RenderBell ({activeNotifs,handleNotif}){
    if (activeNotifs && activeNotifs.length>0){
        return(
            <div> <span>Activities</span>
                         <span className="badge badge-pill badge-danger"  name="notif"
                               onClick={handleNotif}>
                              {activeNotifs.length}
                             <i className="fa fa-bell"/>

                         </span>

            </div>);
    }
    else{
        return(<div> <span>Activities</span>  <i className="fa fa-bell"> </i> </div>);

    }
};


