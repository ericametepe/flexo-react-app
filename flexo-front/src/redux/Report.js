import {CREATE_REPORT} from "./ActionTypes";

export const Reports = (state={reports:[], isLoading:false, errMsg:null},action)=>{
    switch (action.type) {
        case CREATE_REPORT:
            return ({...state, reports:state.reports.concat(action.payload), isLoading: false, errMsg: action.payload});
        default:
            return state;

    }
};
