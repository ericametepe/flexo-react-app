import {CREATE_RATING} from "./ActionTypes";

export const Rating =(state={ratings:[],isLoading:false,errMsg: null},action) =>{
    switch (action.type) {
        case CREATE_RATING:
            return {...state,isLoading: false, errMsg: null, ratings: state.ratings.concat(action.payload)};
         default:
             return state;

    }
}
