import React, {Component} from "react";
import {
    Navbar,
    Nav,
    Form,
    FormControl,
    Button,
    NavItem,
    Badge,
} from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import RenderNotifPop from "./NotificationPopComponent";




class Header extends Component{

    constructor(props) {
        super(props);
        this.state={
            displayNotif:false,
            isPres:false
        };
        this.handleDisplayNotif=this.handleDisplayNotif.bind(this);
    }

    handleDisplayNotif(event) {
        this.setState({
            displayNot:!this.state.displayNot,
            isPres:false
        });
        console.log(" ==="+event.target);
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
                <img src="assets/logo.png"    alt='Flexoffice' />
                </NavLink>
            </Navbar.Brand>
            <Nav className="mr-auto">
                <NavItem>
                <NavLink className="nav-link" to="/prefs">Preferences</NavLink>
                </NavItem>
                <NavItem>
                <NavLink className="nav-link" to="/acts">Activities</NavLink>
                </NavItem>
                <NavItem>
                </NavItem>

            </Nav>
                 <Badge variant={this.state.isPres?"danger":"light"}  name="notif" onClick={(event)=> this.handleDisplayNotif(event)} draggable="true">
                     <i className="fa fa-bell"/>
                     <RenderNotifPop display={this.state.displayNot} lastSit={this.props.lastSit} lastPref={this.props.lastPref} />
                 </Badge>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-primary">Search</Button>
            </Form>
            </Navbar>
         </div>);
        }
}
export default Header;
