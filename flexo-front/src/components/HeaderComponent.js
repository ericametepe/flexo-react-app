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
import RenderNotifPop, {RenderBell} from "./NotificationPopComponent";




class Header extends Component{

    constructor(props) {
        super(props);

        this.state={
            isPres:false,
            displayNotifPop:false
        };
        this.handleDisplayNotif=this.handleDisplayNotif.bind(this);
        this.handleUpdateNotif=this.handleUpdateNotif.bind(this);

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

                 <RenderBell activeNotifs={this.props.activeNotifs} handleNotif={(event) => this.handleDisplayNotif(event)}/>
                 <RenderNotifPop display={this.state.displayNotifPop} activeNotifs={this.props.activeNotifs} handleClear={(event)=>this.handleUpdateNotif(event)} />




            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-primary">Search</Button>
            </Form>
            </Navbar>
         </div>);
        }
}
export default Header;
