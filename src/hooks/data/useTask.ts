import { TaskProps } from "../../components/@task/Task";
import { axiosAPI } from "../../util/axios";
import { useList } from "./useList";

/**
 * 
 * @returns all the operations can do in the Task
 * 
 * @NOTICE need to update the task to get parent ID so it can be updated properly 
 */
 export const useTask = (index:number, listId:number)=>{
    const {lists, dispatch} = useList();
    
    
    const addTask = async (task: TaskProps)=>{
        const response =  await axiosAPI.post('/api/task/create/',{
            content: task.content,
            status: false,
            index: task.id
        })
        console.log(response.statusText)
        dispatch({type:"ADD_TASK", payload:task})
    }

    const removeTask = async () =>{
        const response = await axiosAPI.delete(`/api/task/${index}/`)
        console.log(response.statusText)
        dispatch({type:"REMOVE_TASK", payload:{index, listId}})
    }

    const checkTrueTask = async () =>{
        const response = await axiosAPI.put(`/api/task/${index}/`,{status:true})
        console.log(response.statusText)
        dispatch({type:"CHECK_TRUE_TASK", payload:{index, listId}})
    }
    
    const checkFalseTask = async () =>{
        const  response = await axiosAPI.put(`/api/task/${index}/`,{status:false})
        console.log(response.statusText)
        dispatch({type:"CHECK_FALSE_TASK", payload:{index, listId}})
    }

    const editTask = ()=>{
        dispatch({type:"EDIT_TASK", payload:{index, listId}})
    }

    const saveTask = async (content:string) =>{
        const response = await axiosAPI.put(`/api/task/${index}/`,{id:index, content:content})
        console.log(response.status)
        dispatch({type:"SAVE_TASK", payload:{index, content, listId}})
    }
    return {
        lists, 
        addTask, 
        removeTask, 
        checkFalseTask,
        checkTrueTask,
        editTask,
        saveTask
    };
}