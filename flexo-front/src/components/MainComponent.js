import React, {Component} from "react";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import {Switch, Route, withRouter} from "react-router-dom";
import Home from "./HomeComponent";
import Pref from "./PrefComponent";
import Act from "./ActComponent";
import Notif from "./NotifComponent";
import {
    ackNotifs,
    addFav, deleteFav,
    fetchDesks, fetchFavorites,
    fetchFloors, fetchNotifs, fetchRatings, fetchReports,
    fetchSites,
    fetchSits,
    fetchSpaces, locateUser,
    postSit, rate,
    releaseSit,
    report
} from "../redux/ActionCreators";
import {connect} from "react-redux";
import {fullDeskInfo, locateElemById, locateUserActions, locateUserLastAction} from "./FlexoUtils";
import Site from "./SiteComponent";
import Floor from "./FloorComponent";
import Space from "./SpaceComponent";




export const mapStateToProps = state => {
    return {
        sites:  state.sites,
        floors: state.floors,
        spaces: state.spaces,
        desks:  state.desks,
        sits:   state.sits,
        favorites: state.favorites,
        reports:state.reports,
        ratings:state.ratings,
        notifs:state.notifs
    };
};


export const mapDispatchToProps = dispatch => ({
    fetchSites:  () => dispatch(fetchSites()),
    fetchFloors: () => dispatch(fetchFloors()),
     fetchSpaces:() => dispatch(fetchSpaces()),
    fetchDesks: ()  => dispatch(fetchDesks()),
     fetchSits : ()  => dispatch(fetchSits()),
     postSit: (siteId,floorId,spaceId,deskId) => dispatch(postSit(siteId,floorId,spaceId,deskId)),
     releaseSit: (sitting) => dispatch(releaseSit(sitting)),
     rate: (rating) => dispatch(rate(rating)),
     report: (reporting) => dispatch(report(reporting)),
     addFav: (fav) => dispatch(addFav(fav)),
     deleteFav:(idFav)=>dispatch(deleteFav(idFav)),
     fetchFavorites: () => dispatch(fetchFavorites()),
     fetchReports : () => dispatch(fetchReports()),
     fetchRatings:()=>dispatch(fetchRatings()),
     fetchNotifs:()=>dispatch(fetchNotifs()),
     ackNotifs:(notifs)=>dispatch(ackNotifs(notifs))

});

class Main extends Component{

    constructor(props) {
        super(props);
        this.state={
            userId:""
        }
    }


    componentDidMount() {
        this.props.fetchSites();
        this.props.fetchFloors();
        this.props.fetchSpaces();
        this.props.fetchDesks();
        this.props.fetchSits();
        this.props.fetchFavorites();
        this.props.fetchReports();
        this.props.fetchRatings();
        this.props.fetchNotifs();
    }

    render() {
        const currentUser=locateUser();
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
                      addFav={this.props.addFav}
                      sittings={this.props.sits.sits}
                      favorites={this.props.favorites.favorites}
                      reports={this.props.reports.reports}
                />)
        };

        const UserPref= ()=>{
            return (<Pref favorites={this.props.favorites.favorites.filter(f => f.userId.localeCompare(currentUser)===0)}
                          sittings={this.props.sits.sits}
                          sites={this.props.sites.sites}
                          floors={this.props.floors.floors}
                          spaces={this.props.spaces.spaces}
                          desks={this.props.desks.desks}
                          postSit={this.props.postSit}
                          releaseSit={this.props.releaseSit}
                          deleteFav={this.props.deleteFav}
                          rate={this.props.rate}
                          report={this.props.report}
                          addFav={this.props.addFav}
                          reports={this.props.reports.reports}/>)
        };


        const UserActs= ()=>{
            let usersit = Object.assign({}, this.props.sits.sits.find(sit=>sit.userId.localeCompare(currentUser)===0
                && sit.start!==null && sit.end===null));


            if (usersit && usersit.id) {
                let site = locateElemById(this.props.sites.sites,usersit.siteId);
                let space = locateElemById(this.props.spaces.spaces,usersit.spaceId);
                let floor = locateElemById(this.props.floors.floors, usersit.floorId);
                let desk = locateElemById(this.props.desks.desks,usersit.deskId);

                if (desk && desk.id){
                let {num, image}= desk;
                usersit.deskNum=num;
                usersit.image=image;
                usersit.floorNum=floor?.num;
                usersit.spaceNum=space?.num;
                usersit.siteName=site?.name;
                usersit.adresse=site?.adresse;

                }

            }
            let lastsit = Object.assign({},
                this.props.sits.sits.filter(sit=>sit.userId.localeCompare(currentUser)===0
                && sit.start!==null
                && sit.end!==null).sort((a,b)=>a.id>b.id?-1:1))[0];

            if (lastsit && lastsit.id) {
                let site = locateElemById(this.props.sites.sites,lastsit.siteId);
                let space = locateElemById(this.props.spaces.spaces,lastsit.spaceId);
                let floor = locateElemById(this.props.floors.floors, lastsit.floorId);
                let desk = locateElemById(this.props.desks.desks,lastsit.deskId);
                let {num, image}= desk;
                lastsit.deskNum=num;
                lastsit.image=image;
                lastsit.floorNum=floor?.num;
                lastsit.spaceNum=space?.num;
                lastsit.siteName=site?.name;
                lastsit.adresse=site?.adresse;

            }

            return (<Act reports={this.props.reports.reports}
                          userreports={this.props.reports.reports.filter(report => report.userId.localeCompare(currentUser)===0)}
                          sittings={this.props.sits.sits}
                          usersit={usersit}
                          lastsit={lastsit}
                          ratings={this.props.ratings.ratings}
                          desks={this.props.desks.deskId}
                          floors={this.props.floors.floors}
                          spaces={this.props.spaces}
                          userId={currentUser}
                          releaseSit={this.props.releaseSit}
                          postSit={this.props.postSit}
                          rate={this.props.rate}
                          report={this.props.report}
                          addFav={this.props.addFav}
                          favorites={locateUserActions(this.props.favorites.favorites,currentUser)}
            />);
    };

        const UserHeader = ()=> {
            let displayNotif=false;
            let activeNotifs=[];

            if (this.props.notifs.notifs && this.props.notifs.notifs.length){
               displayNotif= this.props.notifs.notifs.filter(not=>not.userId.localeCompare(currentUser)===0).some(not=>not.nEnd===null);
               activeNotifs= this.props.notifs.notifs.filter(not=>not.userId.localeCompare(currentUser)===0 && not.nEnd===null);
            }

          return(<Header
              displayNotif={displayNotif}
              notifs={this.props.notifs.notifs}
              ackNotifs={this.props.ackNotifs}
              activeNotifs={activeNotifs}

          />);
        };

        const SiteWithFloors=({match})=> {
            return(<Site siteId={match.params.siteId}
                         sites={this.props.sites.sites}
                         desks={this.props.desks.desks}
                         sittings={this.props.sits.sits}
                         spaces={this.props.spaces.spaces}
                         floors={this.props.floors.floors.filter(f=>f.siteId.localeCompare(match.params.siteId)===0)}

            />)
        };
        const FloorWithSpaces=({match})=> {
            return(<Floor siteId={match.params.siteId}
                          sites={this.props.sites.sites}
                          floorId={match.params.floorId}
                          floors={this.props.floors.floors}
                          desks={this.props.desks.desks}
                          sittings={this.props.sits.sits}
                          spaces={this.props.spaces.spaces.filter(s=>s.floorId.localeCompare(match.params.floorId)===0)}/>)
        };

        const SpaceWithDesks=({match})=> {
            return(<Space siteId={match.params.siteId}
                          floorId={match.params.floorId}
                          spaceId={match.params.spaceId}
                          releaseSit={this.props.releaseSit}
                          postSit={this.props.postSit}
                          rate={this.props.rate}
                          report={this.props.report}
                          addFav={this.props.addFav}
                          sittings={this.props.sits.sits}
                          favorites={this.props.favorites.favorites}
                          reports={this.props.reports.reports}
                          sites={this.props.sites.sites}
                          floors={this.props.floors.floors}
                          spaces={this.props.spaces.spaces}
                          desks={this.props.desks.desks.filter(d=>d.spaceId.localeCompare(match.params.spaceId)===0)}/>)
        };


        return (
            <div>
            <UserHeader/>
                <Switch>
                    <Route path="/home"  component={HomePage}/>
                    <Route path="/prefs"   component={UserPref}/>
                    <Route path="/acts" exact  component={UserActs}/>
                    <Route path="/notifs"   component={Notif}/>
                    <Route path="/sites/:siteId/floors" exact  component={SiteWithFloors}/>
                    <Route path="/sites/:siteId/floors/:floorId/spaces" exact  component={FloorWithSpaces}/>
                    <Route path="/sites/:siteId/floors/:floorId/spaces/:spaceId/desks" exact  component={SpaceWithDesks}/>

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
