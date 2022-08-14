import { IListProvider } from "../../components/@list/List";
import { TaskCompProps } from "../../components/@task/Task";

export type ACTIONTYPE = | {type:"CREATE_NEW_LIST", payload:IListProvider}
| {type:"UPDATE_THE_LIST", payload:IListProvider}
| {type:"REMOVE_THE_LIST", payload:{index:number}}
| {type:"LOAD_THE_LIST", payload:IListProvider[]};

function listReducer (state:IListProvider[], action:ACTIONTYPE){
    switch(action.type){
        case "CREATE_NEW_LIST":
            return [...state, action.payload];
        case "UPDATE_THE_LIST":
            state[action.payload.id] = action.payload;
            return [...state];
        case "REMOVE_THE_LIST":
            state.filter(list => list.id !==action.payload.index);
            return [...state];
        case "LOAD_THE_LIST":
            return [...action.payload];
        default:
            return [...state]
    }
}
export default listReducer;