import {ADD_DESKS, DESKS_FAILED, LOADING_DESKS} from "./ActionTypes";

export const Desks = (state={desks:[],errMsg:null,isLoading:false},action)=>{
    switch (action.type) {
        case LOADING_DESKS:
            return({...state, desks:[], errMsg: null,isLoading: true,});
        case DESKS_FAILED:
            return({...state, desks:[], errMsg: action.payload,isLoading: false});
        case ADD_DESKS:
            return({...state, desks:action.payload, errMsg: null,isLoading: false});
        default:
            return state;



    }
}
