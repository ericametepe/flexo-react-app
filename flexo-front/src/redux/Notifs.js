import {UPDATE_NOTIF, READ_NOTIFS, CREATE_NOTIFS} from "./ActionTypes";

export const Notifs=(state={notifs:[], errMsg:null, isLoading:false},action)=>{
    switch (action.type) {
        case READ_NOTIFS:
            return{...state,notifs: state.notifs,errMsg: null, isLoading: false};

        case UPDATE_NOTIF:
                let nots = state.notifs.map(not=>{
                    if (not.id !== action.payload.id){
                        return not;
                    }else{
                        return action.payload;
                    }
                });
            return{...state,notifs: nots,errMsg: null, isLoading: false};
        case CREATE_NOTIFS:
            return {...state, notifs:state.notifs.concat(action.payload),errMsg: null,isLoading: false};

        default:
            return state;

    }
};
