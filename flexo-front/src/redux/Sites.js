import {ADD_SITES, SITES_FAILING, SITES_LOADING} from "./ActionTypes";

export const Sites = (state = {sites:[], isLoading:true, errMsg:null}, action) => {
    switch (action.type){
        case ADD_SITES:
            return{...state,isLoading: true,errMsg: null,sites: action.payload};
        case SITES_FAILING:
            return {...state,isLoading: false,errMsg: action.payload, sites:[]};
        case SITES_LOADING:
            return {...state,isLoading: true,errMsg: null, sites: []};
        default:
            return state;

    }
}
