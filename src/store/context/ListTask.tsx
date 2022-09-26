import React, { createContext, useReducer, useContext } from "react"
import { IListProvider } from "../../components/@list/List";
import listReducer, {ACTIONTYPE} from "../reducer/ListReducer";
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
    dispatch: React.Dispatch<ACTIONTYPE>
}
export interface Default{
    children:React.ReactNode
}

export const ListTaskContext = createContext<Provider>({} as Provider);

/**
 * 
 * Context of the list
 * @param React.ReactNode
 * @return Values: Provides the state, function to create, update, load, remove list
 */
export const ListTaskProvider:React.FC<Default> = ({children}:Default)=>{
    const [state, dispatch] = useReducer(listReducer, [{task:{},index:0}]);
    

    return <ListTaskContext.Provider value={{
        lists:state, dispatch
    }}>{ children }</ListTaskContext.Provider>
    
}