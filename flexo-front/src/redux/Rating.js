import {CREATE_RATING, FETCH_RATINGS} from "./ActionTypes";

export const Rating =(state={ratings:[],isLoading:false,errMsg: null},action) =>{
    switch (action.type) {
        case CREATE_RATING:
            return {...state,isLoading: false, errMsg: null, ratings: state.ratings.concat(action.payload)};
        case FETCH_RATINGS:
            return {...state,ratings: action.payload, isLoading: false, errMsg: null};
         default:
             return state;

    }
};
