import React, {Component} from "react";
import {Button, Table} from "react-bootstrap";
import DeskItem from "./DeskItemComponent";
import {Alert, BreadcrumbItem} from "reactstrap";
import Breadcrumb from "reactstrap/es/Breadcrumb";
import {Link} from "react-router-dom";



class Pref extends Component{

   constructor(props){
    super(props);

    this.state={
        favs :this.props.favorites
    };
    this.handleDeleteFav=this.handleDeleteFav.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
     alert("I want to know i there are changes.....");
       if(prevProps.favorites !==this.props.favorites){
        this.setState({
            "favs": this.props.favorites
        });

     }

    }

    handleDeleteFav(idFav){
       console.log("We delete this fav"+idFav);
       this.props.deleteFav(idFav);
    }

        render() {
       let favorites=this.props.favorites;
         const PrefTable= ()=> {
             if (favorites && favorites.length>0){
             return(
                 <div>
                 <div className="col-12">
                     <h3>List of your office preferences</h3>
                     <hr/>
                 </div>
                 <Table striped bordered hover size="sm">
                 <thead>
                 <tr>
                     <th>Desk</th>
                     <th>Actions</th>
                 </tr>
                 </thead>
                 <tbody>
                 {favorites.sort((a, b) => a.id > b.id ? -1 : 1).map(fav =>
                     <tr key={fav.id}>
                         <td>
                             <DeskItem postSit={this.props.postSit}
                                       deskId={fav.deskId}
                                       desks={this.props.desks}
                                       spaces={this.props.spaces}
                                       floors={this.props.floors}
                                       sites={this.props.sites}
                                       sittings={this.props.sittings}
                                       releaseSit={this.props.releaseSit}
                                       rate={this.props.rate}
                                       report={this.props.report}
                                       addFav={this.props.addFav}
                                       favorites={this.props.favorites}
                                       deleteFav={this.props.deleteFav}/>
                         </td>
                         <td>
                             <button onClick={() => this.handleDeleteFav(fav.id)} className="btn-danger">Delete</button>
                         </td>
                     </tr>)}
                 </tbody>
             </Table></div>);
             } else{
                 return(<Alert color="warning" className="container-fluid" >No preferences yet...</Alert>);
             }

         };

                 return(
                     <div className="container">
                         <div className="row">
                             <Breadcrumb>
                                 <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                                 <BreadcrumbItem active>Preferences</BreadcrumbItem>
                             </Breadcrumb>
                         </div>
                         <PrefTable/>
                     </div>);
         }
    }



    export default (Pref) ;

