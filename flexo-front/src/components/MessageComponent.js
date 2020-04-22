import React from "react";
export default function Message(props){
    if (props.name==='Ametep'){
    return(<p>My name is {props.name}</p>)
    }
        else{
            return <h4>{props.greeting}</h4>
        }


}
