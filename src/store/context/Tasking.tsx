import React, { createContext, useContext, useReducer } from "react"
import { TaskCompProps, TaskProps } from "../../components/@task/Task"
import tasksReducer, {ACTIONTYPE} from "../reducer/TasksReducer";
import { Default } from "./ListTask";
interface Provider{
    state: TaskCompProps[] | [],
    dispatch: React.Dispatch<ACTIONTYPE>
}
export const TaskContexts = createContext<Provider>({} as Provider);


export const TasksProvider: React.FC<Default> = ({children}:Default)=>{
    const [state, dispatch] = useReducer(tasksReducer, []);


    return <TaskContexts.Provider value={{state, dispatch}}>{children}</TaskContexts.Provider>
}
export const useTask = ()=>{
        const {state, dispatch} = useContext(TaskContexts);
        
        const loadTasks = (payload:TaskCompProps[])=>{
            if (payload.length < 1)
            return;
            dispatch({type:"LOAD_TASK", payload:payload})
        }
    
        const addTask = (task: TaskProps)=>{
            dispatch({type:"ADD_TASK", payload:task})
        }
    
        const removeTask = (index:number) =>{
            dispatch({type:"REMOVE_TASK", payload:{index}})
        }
    
        const checkTrueTask = (index:number) =>{
            dispatch({type:"CHECK_TRUE_TASK", payload:{index}})
        }
        
        const checkFalseTask = (index:number) =>{
            dispatch({type:"CHECK_FALSE_TASK", payload:{index}})
        }

        const editTask = (index:number)=>{
            dispatch({type:"EDIT_TASK", payload:{index}})
        }
    
        const saveTask = (index:number, content:string) =>{
            dispatch({type:"SAVE_TASK", payload:{index, content}})
        }
        return {
            state, 
            loadTasks, 
            addTask, 
            removeTask, 
            checkFalseTask,
            checkTrueTask,
            editTask,
            saveTask
        };
    }