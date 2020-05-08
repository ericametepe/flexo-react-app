import React, {Component} from "react";
import {
    Navbar,
    Nav,
    NavItem,

} from 'react-bootstrap';
import {Link, NavLink} from "react-router-dom";
import RenderNotifPop, {RenderBell} from "./NotificationPopComponent";
import {baseUrl} from "../redux/baseUrl";
import {Control, LocalForm} from "react-redux-form";
import {Row, Col} from "reactstrap";
import FreeSearchResultBox from "./FreeSearchResultBox";






class Header extends Component{

    constructor(props) {
        super(props);

        this.state={
            isPres:false,
            displayNotifPop:false,
            keyword:"",
            resultSearch:[],
            displayBox:false
        };
        this.handleDisplayNotif=this.handleDisplayNotif.bind(this);
        this.handleUpdateNotif=this.handleUpdateNotif.bind(this);
        this.handleSubmitSearch=this.handleSubmitSearch.bind(this);
    }



    handleSubmitSearch(values){
        let {word}=values;
        if (word){
            const splitWord = word?.split(",");
            const siteName= splitWord[0]?.trim();
            const floorNum= splitWord[1]?.trim();
            let sites = this.props.sites.filter(s=>s.name.toLowerCase().search(siteName.toLowerCase())!==-1);
            let result=[];

            sites.forEach((site)=>{
                let fflors = this.props.floors.filter((floor)=>floor.siteId.localeCompare(site.id)===0);
                console.log("fflors "+JSON.stringify(fflors));
                let resultItem={};
                resultItem.siteId=site.id;
                resultItem.siteName=site.name
                resultItem.floors=fflors?.filter(f=>f.num.search(floorNum)!==-1);
                result.push(resultItem);
            });

            this.setState({
                "freeSearch":result.length>0,
                "resultSearch":result,
                "keyword" : splitWord.join(","),
                "displayBox":true
            });
            result=[];
            console.log(`sites :${JSON.stringify(sites)}
            result :${JSON.stringify(this.state.resultSearch)}
            word:${JSON.stringify(this.state.keyword)}`);

        }

    }

    handleUpdateNotif(event){
        console.log(" target "+event.target);
        this.props.ackNotifs(this.props.activeNotifs);
    }

    handleDisplayNotif(event) {
        console.log(" target "+event.target);
        this.setState({
            displayNotifPop:!this.state.displayNotifPop
        });
        console.log(" displayNotifPop  "+this.state.displayNotifPop);
        event.preventDefault();

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {
            lastSit: prevSit,
        } = prevProps;

        const {lastSit} = this.props;
        if (lastSit !== prevSit){
           console.log("Update there=========>");
            this.setState({
                isPres:!this.state.isPres
            });
        }
    }

    render() {

        return (
         <div>
             <Navbar bg="light" variant="light">
            <Navbar.Brand>
                <NavLink className="nav-link" to="/home">
                <img src={baseUrl+"logo.png"}    alt='Flexoffice' />
                </NavLink>
            </Navbar.Brand>
            <Nav className="mr-auto">
                <NavItem>
                <NavLink className="nav-link" to="/prefs">Preferences</NavLink>
                </NavItem>
                <NavItem>
                <NavLink className="nav-link" to="/acts">
                    <RenderBell activeNotifs={this.props.activeNotifs} handleNotif={(event) => this.handleDisplayNotif(event)}/>
                    <RenderNotifPop display={this.state.displayNotifPop} activeNotifs={this.props.activeNotifs} handleClear={(event)=>this.handleUpdateNotif(event)} />
                </NavLink>
                </NavItem>
                <NavItem>
                </NavItem>
            </Nav>
             <Nav className="mr-auto">
                 <LocalForm model="freeText"  className="inline mr-sm-2" onSubmit={(values) => this.handleSubmitSearch(values)}>
                 <Row className="form-group">
                     <Col xs={12}>
                     <Control.text model=".word" id="word" name="word"  className="form-control" placeholder="Building name, floor"/>
                     <button type="submit" className="btn-primary">
                         <i className="icon search"/>
                     </button>
                     </Col>
                 </Row>
                 </LocalForm>

                 <div>
                     <FreeSearchResultBox
                         resultSearch={this.state.resultSearch}
                         keyword={this.state.keyword}>
                         display={this.state.displayBox}
                     </FreeSearchResultBox>
                 </div>
             </Nav>

            </Navbar>
         </div>);
        }
}
export default Header;
