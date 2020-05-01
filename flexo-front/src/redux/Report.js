import {CREATE_REPORT, READ_REPORTS} from "./ActionTypes";

export const Reports = (state={reports:[], isLoading:false, errMsg:null},action)=>{
    switch (action.type) {
        case CREATE_REPORT:
            return ({...state, reports:state.reports.concat(action.payload), isLoading: false, errMsg: action.payload});
        case READ_REPORTS:
            return ({...state, reports:action.payload, isLoading: false, errMsg: null});
        default:
            return state;

    }
};
