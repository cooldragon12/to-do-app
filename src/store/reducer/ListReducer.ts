import { IListProvider } from "../../components/@list/List";
import { TaskProps } from "../../components/@task/Task";
/**
 * This gives the action type that involves Task within List
 */
export type ACTIONTYPE =
// List ACTIONTYPE
| {type:"CREATE_NEW_LIST", payload:IListProvider}
| {type:"UPDATE_THE_LIST", payload:IListProvider}
| {type:"REMOVE_THE_LIST", payload:{index:number}}
| {type:"LOAD_THE_LIST", payload:IListProvider[]}
// Task ACTIONTYPE
| {type:"ADD_TASK", payload:TaskProps}
| {type:"EDIT_TASK", payload:{index: number, listId:string}}
| {type:"SAVE_TASK", payload:{index: number, content:string, listId:string}}
| {type:"REMOVE_TASK", payload:{index:number, listId:string}}
| {type:"CHECK_TRUE_TASK", payload:{index:number, listId:string}}
| {type:"CHECK_FALSE_TASK", payload:{index:number, listId:string}}

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
        // For Task Reducer
        case "ADD_TASK":
            console.log("added a task:"+(state.length));
            return[...state, {task:action.payload,index:state.length,edit:false}]
        case "CHECK_TRUE_TASK":
            let list = state.find(x=> x.id === action.payload.listId);
            let os = list?.tasks[action.payload.index].check;
            os = true;
            return [...state,list]
        case "CHECK_FALSE_TASK":
            state[action.payload.listId].tasks[action.payload.index].check = false;
            console.log('nasave ay '+state[action.payload.index].tasks[action.payload.listId].check);
            return [...state]
        case "SAVE_TASK":
            console.log("saved")
            state[action.payload.listId].tasks[action.payload.index].content = action.payload.content;
            state[action.payload.listId].tasks[action.payload.index].editing = false
            return[...state]
        case "EDIT_TASK":
            console.log("pumasok dito")
            state[action.payload.listId].tasks[action.payload.index].editing = true;
            return[...state];
        case "REMOVE_TASK":
            state[action.payload.listId].tasks.splice(action.payload.index,1);
            return[...state];
        default:
            return [...state]
    }
}


export default listReducer;