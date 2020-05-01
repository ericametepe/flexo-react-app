import {ADD_FLOORS, FLOORS_FAILED, SITES_LOADING} from "./ActionTypes";

export const Floors = (state = {floors:[], isLoading:true, errMsg:null}, action) => {
    switch (action.type){
        case ADD_FLOORS:
            return{...state,isLoading: true,errMsg: null,floors: action.payload};
        case FLOORS_FAILED:
            return {...state,isLoading: false,errMsg: action.payload, floors:[]};
        case SITES_LOADING:
            return {...state,isLoading: true,errMsg: null, floors: []};
        default:
            return state;

    }
}
