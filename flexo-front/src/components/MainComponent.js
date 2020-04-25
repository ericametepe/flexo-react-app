import React, {Component} from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import {Switch, Route, withRouter} from "react-router-dom";
import Home from "./HomeComponent";
import Pref from "./PrefComponent";
import Act from "./ActComponent";
import Notif from "./NotifComponent";
import {
    fetchDesks,
    fetchFloors,
    fetchSites,
    fetchSits,
    fetchSpaces,
    postSit, rate,
    releaseSit,
    report
} from "../redux/ActionCreators";
import {connect} from "react-redux";


const mapStateToProps = state => {
    return {
        sites:  state.sites,
        floors: state.floors,
        spaces: state.spaces,
        desks:  state.desks,
        sits: state.sits
    };
};

const mapDispatchToProps = dispatch => ({
    fetchSites:  () => dispatch(fetchSites()),
    fetchFloors: () => dispatch(fetchFloors()),
     fetchSpaces:() => dispatch(fetchSpaces()),
    fetchDesks: ()  => dispatch(fetchDesks()),
     fetchSits : ()  => dispatch(fetchSits()),
     postSit: (siteId,floorId,spaceId,deskId) => dispatch(postSit(siteId,floorId,spaceId,deskId)),
     releaseSit: (sitting) => dispatch(releaseSit(sitting)),
     rate: (rating) => dispatch(rate(rating)),
     report: (reporting) => dispatch(report(reporting))

});

class Main extends Component{

    componentDidMount() {
        this.props.fetchSites();
        this.props.fetchFloors();
        this.props.fetchSpaces();
        this.props.fetchDesks();
        this.props.fetchSits();
    }

    render() {
        const HomePage = ()=>{
            return(
                <Home sites={this.props.sites.sites}
                      floors={this.props.floors.floors}
                      spaces={this.props.spaces.spaces}
                      desks={this.props.desks.desks}
                      sitesLoading={this.props.sites.isLoading}
                      sitesErrMsg={this.props.sites.errMsg}
                      postSit={this.props.postSit}
                      releaseSit={this.props.releaseSit}
                      rate={this.props.rate}
                      report={this.props.report}
                      sittings={this.props.sits.sits}
                />)
        };

        return (
            <div>
            <Header/>
                <Switch>
                    <Route path="/home"  component={HomePage}/>
                    <Route path="/prefs"   component={Pref}/>
                    <Route path="/acts" exact  component={Act}/>
                    <Route path="/notifs"   component={Notif}/>
                </Switch>
            <Footer/>
            </div>

        )
    }




}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Main)
);
