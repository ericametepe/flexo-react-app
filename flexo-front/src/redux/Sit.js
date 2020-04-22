import {ADD_SIT, FETCH_SITS, SITS_FAILING} from "./ActionTypes";

export const Sits = (state={sits:[],errMsg:null,isLoading:false},action)=>{
    switch (action.type) {
        case FETCH_SITS:
            return({...state, sits: action.payload, errMsg: null,isLoading: false});
        case ADD_SIT:
            let sit = action.payload;
            return({...state, sits: state.sits.concat(sit), errMsg: null,isLoading: false});
        case SITS_FAILING:
            return({...state, sits: [], errMsg: action.payload,isLoading: false});

        default:
            return state;
    }
};
