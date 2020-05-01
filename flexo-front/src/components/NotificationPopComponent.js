import {ListGroup, ListGroupItem} from "react-bootstrap";
import React from "react";
export default function RenderNotifPop({display, lastSit,lastPref}) {
    if (display){
        return <div>
            <ListGroup>
                <SitItem lastSit={lastSit}></SitItem>
                <PrefItem lastPref={lastPref}></PrefItem>
            </ListGroup>
        </div>
    }
    else {
        return <div></div>
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


