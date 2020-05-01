import React, {Component} from "react";
import {Card, Table} from "react-bootstrap";
import {isBusy} from "./DeskItemComponent";
import {Alert} from "reactstrap";

class Pref extends Component{

   constructor(props){
    super(props);

    this.state={
        favs :this.props.favorites
    };
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
     alert("I want to know i there are changes.....");
       if(prevProps.favorites !==this.props.favorites){
        this.setState({
            "favs": this.props.favorites
        });

     }

    }

        render() {
            if (this.props.favorites && this.props.favorites.length>0){
        return(
          <div name="vtable">
              <p>{this.state.favs.length}</p>
          <Table striped bordered hover size="sm">
              <thead>
              <tr>
                  <th>Site</th>
                  <th>Desk status</th>
              </tr>
              </thead>
              <tbody>
              {this.props.favorites.sort((a, b) => a.id>b.id?-1:1).map(fav =>
                  <tr key={fav.id}>
                  <td>
                      <Card bg={isBusy(this.props.sittings,fav.deskId)?"warning":"success"}>
                      <Card.Header>Office : {fav.siteId}</Card.Header>
                      <Card.Body>
                          <Card.Title>Office @ </Card.Title>
                          <Card.Text>
                             Desk : {fav.deskId}
                             <br/>
                             Floor: {fav.floorId}
                             <br/>
                             Date: {fav.date}
                          </Card.Text>
                      </Card.Body>
                      </Card>
                  </td>
                  <td data-label="dName">{isBusy(this.props.sittings,fav.deskId)?'Occupied':'Free'} </td>
              </tr>)}
              </tbody>
          </Table>
      </div>);
    } else{
       return(<div><Alert color="warning"> No desk favorite yet...</Alert></div>);
    }

    }
    }

    export default (Pref) ;

