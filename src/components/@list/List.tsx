import React,{useEffect, useState} from "react"
import {
    useTransition,
    useSpring,
    useChain,
    config,
    animated,
    useSpringRef,
  } from '@react-spring/web'


import { Task, TaskCompProps} from '../../components/@task/Task';
import { useTask } from "../../store/context/Tasking";
import { useList } from "../../store/context/ListTask";




/**
 * IListProvider gives the id of a list, title, and the tasks included to it.
 * @param id - number
 * @param title_list - string
 * @param tasks TaskCompProps[] includes `task`, its `index`, and boolean `edit`
 * - `Optional` So we can update the title without updating the tasks
 */
export interface IListProvider{
    id:number,
    title_list: string,
    tasks: TaskCompProps[] | [],
    onEdit?:boolean
} 
/**
 * 
 * @param list IListProvider contains `id`,'title_list', and `tasks`
 * @returns the component list
 */
const List:React.FC<IListProvider>= (list: IListProvider)=>{
    const {loadTasks, state, addTask} = useTask(); 
    const [open, setOpen] = useState(false);
    useEffect(()=>{
        loadTasks(list.tasks);
    }, [list])
    
    



    const handleAddTask = ()=>{
        addTask({content:"", check:false, editing:true })
    }

    // Handles the animation
    const springApi =useSpringRef();
    const { size, ...rest } = useSpring({
        ref: springApi,
        config: config.stiff,
        from: { 
            size: '20%', 
            background: '#edfa40',
        },
        to: {
          size: open ? '90%' : '20%',
          background: open ? '#000' : '#edfa40',
          
        },
      })
    
    const transApi = useSpringRef()
    const transition = useTransition(open ? state : [], {
        ref: transApi,
        trail: 400,
        from: { opacity: 0, scale: 0 },
        enter: { opacity: 1, scale: 1 },
        leave: { opacity: 0, scale: 0 },
      })
    useChain(open ? [springApi, transApi] : [transApi, springApi], [
        0,
        open ? 0.1 : 0.6,
      ])

    const handleOpen = ()=>{
        setOpen(true)
    }
    const handleClose =()=>{
        setOpen(open=>!open)
    }
    

    //
    return(
            <animated.div 
                style={{...rest, width:size, height:size}}
                className={`list ${open? "open":""}`}
                onClick={handleOpen}
                onDoubleClick={handleClose}
            >
                <div className="title-cont"  >
                    <h1>{list?.title_list}</h1>
                </div>
                
                <div className="tasks-cont">
                    <div className="options">
                        {/* <div className={`option ${edit?"hide":""}`} onClick={()=>setAdd(true)}>add</div>
                        
                        <div className={`option ${add?"hide":""}`} onClick={()=>!edit? setEdit(true):setEdit(false)}>edit</div> */}
                    </div>
                    <div id='tasking' className='tasking'>
                        
                        {
                            transition((style, item) => (
                                <animated.div
                                  className=""
                                  style={{ ...style}}
                                >
                                    <Task {...item}/> 
                                </animated.div>
                            
                            ))
                        }
                        <div  className="md-button" onClick={handleAddTask}>
                            <div className="lift-up">
                                ADD
                            </div>
                        </div>
                    </div>
                </div>
            </animated.div>
    )
}
export default List;