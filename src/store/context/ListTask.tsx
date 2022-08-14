import React, { createContext, useReducer, useContext } from "react"
import { IListProvider } from "../../components/@list/List";
import listReducer from "../reducer/ListReducer";
/**
 * Provider : ListTask
 * @param state: IListProvider[],
 * @param createList: function to dispatch to create list,
 * @param updateList: function to dispatch an update to a list,
 * @param removeList: function to dispatch to remove a list using an index,
 * @param loadList: function to load the list in the reducer.
 */
interface Provider{
    lists: IListProvider[],
    // dispatch: React.Dispatch<ACTIONTYPE>
    createList: ({title_list, tasks}:IListProvider) =>void,
    updateList: ({id, tasks, title_list}:IListProvider)=>void,
    removeList: (index:number)=>void,
    loadList: (payload:IListProvider[])=>void;

}
export interface Default{
    children:React.ReactNode
}


export const ListTaskContext = createContext<Provider>({} as Provider);


export const useList = ()=> useContext(ListTaskContext);

/**
 * 
 * Context of the list
 * @param React.ReactNode
 * @return Values: Provides the state, function to create, update, load, remove list
 */
export const ListTaskProvider:React.FC<Default> = ({children}:Default)=>{
    const [state, dispatch] = useReducer(listReducer,[]);
    
    const createList = ({title_list, tasks}: IListProvider) => {
        if (title_list === "")
        return;
        if (tasks != null){
            dispatch({type:"CREATE_NEW_LIST",payload:{id: state.length,title_list:title_list, tasks}})
            return;
        }
        dispatch({type:"CREATE_NEW_LIST",payload:{id: state.length,title_list:title_list, tasks:[]}})
        
    }
    const updateList = ({id,tasks,title_list }:IListProvider) => {
        if (title_list === "")
        return;
        dispatch({type:"UPDATE_THE_LIST", payload:{id: id, tasks:tasks, title_list:title_list}})
    }
    const removeList = (index:number)=>{
        dispatch({type:"REMOVE_THE_LIST", payload:{index:index}})
    }
    const loadList = (payload:IListProvider[])=>{
        dispatch({type:"LOAD_THE_LIST", payload:payload})
    }

    return <ListTaskContext.Provider value={{
        lists:state, 
        createList, 
        updateList, 
        removeList, 
        loadList
    }}>{ children }</ListTaskContext.Provider>
    
}