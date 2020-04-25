import {CREATE_FAVORITE} from "./ActionTypes";

const Favorite = (state={favorites:[], isLoading:false, errMsg:null}, action)=>{
    switch (action.type) {
        case CREATE_FAVORITE:
            return ({...state,favorites: state.favorites.concat(action.payload),isLoading: false,errMsg: null});
        default:
            return state;
    }

};
