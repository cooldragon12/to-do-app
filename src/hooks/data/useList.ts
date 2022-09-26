import { useContext } from "react"
import { IListProvider } from "../../components/@list/List";
import { ListTaskContext } from "../../store/context/ListTask";
import { axiosAPI } from "../../util/axios";
/**
 * 
 * @returns `createList`, `updateList`, `removelist`, 'loadList'
 */
export const useList = ()=> {
    const {lists, dispatch} = useContext(ListTaskContext);

    const createList = async({title, tasks}: IListProvider) => {
        if (title === "")
        return;
        await axiosAPI.post('/api/list/create/',{
            title:title,
            description:""
        })
        dispatch({type:"CREATE_NEW_LIST",payload:{id: lists.length,title:title, tasks:tasks||[]}})
    }
    const updateList = async ({id,tasks,title, description}:IListProvider) => {
        if (title === "")
        return;
        await axiosAPI.put(`/api/list/${id}/`,
        {
            title:title,
            description:description
        });
        dispatch({type:"UPDATE_THE_LIST", payload:{id: id, tasks:tasks, title:title, description:description || ""}})
    }
    const removeList = async (index:number)=>{
        await axiosAPI.delete(`/api/list/${index}/`)
        dispatch({type:"REMOVE_THE_LIST", payload:{index:index}})
    }
    const loadList = async ()=>{
        const response = await axiosAPI.get('/api/list/')
        
        dispatch({type:"LOAD_THE_LIST", payload:response.data})
    
    }
    return {createList, updateList, removeList, loadList, lists, dispatch}
}