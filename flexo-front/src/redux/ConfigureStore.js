
import {applyMiddleware, combineReducers, createStore} from "redux";
import { createForms} from "react-redux-form";
import {Sites} from "./Sites";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {Floors} from "./Floors";
import {Spaces} from "../components/spaces";
import {Desks} from "./Desk";
import {Sits} from "./Sit";



const initialTerm = {
    siteId : "",
    floorId: "",
    spaceId:""
}
export const  ConfigureStore= () =>{
    const store = createStore(
        combineReducers({
            sites:Sites,
            floors:Floors,
            spaces:Spaces,
            desks:Desks,
            sits:Sits,
            ...createForms({searchTerm: initialTerm})
        }),
        applyMiddleware(thunk, logger)
    );
    return store;
};


