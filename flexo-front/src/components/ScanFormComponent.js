import React from "react";
import {Card, CardBody, CardImg,CardTitle} from "reactstrap";
import {baseUrl} from "../redux/baseUrl";

export  function ScanForm({display, image,num}) {
         if (display){
        return(<Card>
               <CardBody>
                  <CardTitle>Use your smartphone to activate the action</CardTitle>
               </CardBody>
               <CardImg top src={baseUrl + image} alt={num} />
      </Card>);
      }
         else{
             return (<div></div>);
         }

}
