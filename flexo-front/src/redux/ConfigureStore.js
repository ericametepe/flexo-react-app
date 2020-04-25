
import {applyMiddleware, combineReducers, createStore} from "redux";
import { createForms} from "react-redux-form";
import {Sites} from "./Sites";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {Floors} from "./Floors";
import {Spaces} from "../components/spaces";
import {Desks} from "./Desk";
import {Sits} from "./Sit";
import {Rating} from "./Rating";
import {Reports} from "./Report";



const initialTerm = {
    siteId : "",
    floorId: "",
    spaceId:""
};
const initRate ={
    rate:1,
    comment:""
};
const initReport ={
    email:"",
    issueType:"",
    description:""
};
export const  ConfigureStore= () =>{
    const store = createStore(
        combineReducers({
            sites:Sites,
            floors:Floors,
            spaces:Spaces,
            desks:Desks,
            sits:Sits,
            ratings:Rating,
            reports:Reports,
            ...createForms({searchTerm: initialTerm}),
            ...createForms({rating: initRate}),
            ...createForms({reporting: initReport}),
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
};


