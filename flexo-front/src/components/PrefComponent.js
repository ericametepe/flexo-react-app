import React, {Component} from "react";

class Pref extends Component{

    constructor(props) {
        super(props);
    }

    render() {
        return (   <div name="pref">
                <h2>Preferences</h2>

                <div name="vtable">
                    <table className="ui celled table"  v-if="localPrefs && localPrefs.length>0">
                        <thead>
                        <tr>
                            <th>Site</th>
                            <th>Floor</th>
                            <th>Desk</th>
                            <th>Desk status</th>
                            <th> </th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td data-label="sName">localPref.siteName</td>
                            <td data-label="fName">localPref.floorId</td>
                            <td data-label="dName"> localPref.deskNumber</td>
                            <td data-label="staName">localPref.deskStatus</td>
                        </tr>
                    </tbody>
                </table>
    </div>
            </div>);
    }

}



export default   Pref;
