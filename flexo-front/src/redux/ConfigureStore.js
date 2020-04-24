
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



const initialTerm = {
    siteId : "",
    floorId: "",
    spaceId:""
};
const initRate ={
    siteId: "",
    floorId: "42878c49-3e6d-4b6c-9965-f5299fc390adp",
    spaceId: "42878c49-3e6d-4b6c-9965-f5299fc390ad",
    deskId: "0af5dfef-cc8d-4bd9-80ba-0e70fa6bd0dr",
    rate:1,
    comment:""
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
            ...createForms({searchTerm: initialTerm}),
            ...createForms({rating: initRate}),
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
};


