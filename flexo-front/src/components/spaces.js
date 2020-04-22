import {ADD_SPACES, LOADING_SPACES, SPACES_FAILED} from "../redux/ActionTypes";

export const Spaces = (state={isLoading:false, errMsg:null,spaces:[]},action)=>{
    switch (action.type) {
        case LOADING_SPACES:
            return{...state,isLoading: true,errMsg: null,spaces: []};
        case SPACES_FAILED:
            return{...state,isLoading: true,errMsg: action.payload,spaces: action.payload};
         case ADD_SPACES:
            return{...state,isLoading: false,errMsg: null,spaces: action.payload};
        default:
            return state;


    }

}
