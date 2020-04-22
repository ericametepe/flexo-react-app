import React, {Component} from "react";

 class Act extends Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            <h4 className="ui horizontal divider header">
                <i className="bar chart icon"></i>
                Your behaviour in stats...
            </h4>
            <div className="ui four statistics">
                <div className="ui red statistic">
                    <div className="value">
                        profile.statParameters.reportCounter
                    </div>
                    <div className="label">
                        Your Reports
                    </div>
                </div>
                <div className="statistic">
                    <div className="value">
                        <span>gprofile.reports.sum</span>
                    </div>
                    <div className="label">
                        Global report
                    </div>
                </div>
                <div className="statistic">
                    <div className="value">
                        <span>gprofile.reports.average</span>
                    </div>
                    <div className="label">
                        Global Report average
                    </div>
                </div>
                <div className="statistic">
                    <div className="value">
                        <i className="icon user"></i>
                        gprofile.reports.count
                    </div>
                    <div className="label">
                        Total of Reporters
                    </div>
                </div>
            </div>
            </div>)
    }
}
export default  Act;
