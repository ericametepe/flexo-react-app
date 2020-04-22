import React, {Component} from "react";
import {Navbar, Nav, Form,FormControl,Button,NavItem, Jumbotron} from 'react-bootstrap';
import {NavLink} from "react-router-dom";
import Notif from "./NotifComponent";


class Header extends Component{


    constructor(props) {
        super();
        this.displayNotif=this.displayNotif.bind(this);
    }


    displayNotif() {
        console.log("ok===========>");
        return(<Notif></Notif>);
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
                <NavLink className="nav-link" to="/notifs">
                    <span className="fa fa-bell"></span>
                </NavLink>
                </NavItem>

            </Nav>
                 <div onClick={(event)=> this.displayNotif()}> <span className="fa fa-bell"></span> </div>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-primary">Search</Button>
            </Form>
            </Navbar>
         </div>);
        }



}
export default Header;
