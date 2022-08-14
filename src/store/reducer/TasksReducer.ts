import { TaskCompProps, TaskProps } from "../../components/@task/Task"


export type ACTIONTYPE = 
| {type:"ADD_TASK", payload:TaskProps}
| {type:"EDIT_TASK", payload:{index: number}}
| {type:"SAVE_TASK", payload:{index: number, content:string}}
| {type:"REMOVE_TASK", payload:{index:number}}
| {type:"CHECK_TRUE_TASK", payload:{index:number}}
| {type:"CHECK_FALSE_TASK", payload:{index:number}}
| {type:"LOAD_TASK", payload:TaskCompProps[]};

/**
 * 
 * @param state TaskCompProps
 * @param action ACTIONTYPE
 * - `ADD_TASK` - dispatch new task, require whole TaskProps
 * - `EDIT_TASK` - to enable the edit of task, index
 * - `SAVE_TASK` - save and disable edited of task, index
 * - `REMOVE_TASK` - dispatch the task, index
 * - `CHECK_CHANGE_TASK` - change the status of the task, index
 * - `LOAD_TASK` - Load the tasks
 * @returns the Tasks
 */
function tasksReducer(state:TaskCompProps[], action:ACTIONTYPE){
    switch(action.type){
        case "ADD_TASK":
            console.log("added a task:"+(state.length));
            return[...state, {task:action.payload,index:state.length,edit:false}]
        case "CHECK_TRUE_TASK":
            state[action.payload.index].task.check = true;
            console.log('nasave ay '+state[action.payload.index].task.check);
            return [...state]
        case "CHECK_FALSE_TASK":
            state[action.payload.index].task.check = false;
            console.log('nasave ay '+state[action.payload.index].task.check);
            return [...state]
        case "SAVE_TASK":
            console.log("saved")
            state[action.payload.index].task.content = action.payload.content;
            state[action.payload.index].task.editing = false
            return[...state]
        case "EDIT_TASK":
            console.log("pumasok dito")
            state[action.payload.index].task.editing = true;
            return[...state];
        case "REMOVE_TASK":
            state.splice(action.payload.index,1);
            return[...state];
        case "LOAD_TASK":
            return[...action.payload];
        default:
            return[...state]
    }
};
export default tasksReducer;