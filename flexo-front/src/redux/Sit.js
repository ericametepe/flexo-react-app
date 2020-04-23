import {ADD_SIT, FETCH_SITS, SITS_FAILING, UPDATE_SITTING} from "./ActionTypes";

export const Sits = (state={sits:[],errMsg:null,isLoading:false},action)=>{
    switch (action.type) {
        case FETCH_SITS:
            return({...state, sits: action.payload, errMsg: null,isLoading: false});
        case ADD_SIT:
            let sit = action.payload;
            return({...state, sits: state.sits.concat(sit), errMsg: null,isLoading: false});
        case SITS_FAILING:
            return({...state, sits: [], errMsg: action.payload,isLoading: false});
          case UPDATE_SITTING:
              let upSits = state.sits.map(sit => {
                  if (sit.id!==action.payload.id){
                      return sit;
                  }else{
                      return action.payload;
                  }
              });
            return({...state, sits: upSits, errMsg: null,isLoading: false});

        default:
            return state;
    }
};
