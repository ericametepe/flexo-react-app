import {CREATE_FAVORITE, READ_FAVORITES} from "./ActionTypes";

export const Favorites = (state={favorites:[], isLoading:false, errMsg:null}, action)=>{
    switch (action.type) {
        case CREATE_FAVORITE:
            return ({...state,favorites: state.favorites.concat(action.payload),isLoading: false,errMsg: null});
        case READ_FAVORITES:
            return ({...state,favorites: action.payload,isLoading: false,errMsg: null});
        default:
            return state;
    }

};
