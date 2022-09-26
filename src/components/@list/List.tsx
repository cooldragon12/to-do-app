import React,{useEffect, useState} from "react"
import {
    useTransition,
    useSpring,
    useChain,
    config,
    animated,
    useSpringRef,
  } from '@react-spring/web'


import { Task, TaskProps} from '../../components/@task/Task';
import usePop from "../../hooks/animation/usePop";
import { useTask } from "../../hooks/data/useTask";
import { useList } from "../../hooks/data/useList";




/**
 * IListProvider gives the id of a list, title, and the tasks included to it.
 * @param id - number
 * @param title_list - string
 * @param tasks TaskCompProps[] includes `task`, its `index`, and boolean `edit`
 * - `Optional` So we can update the title without updating the tasks
 */
export interface IListProvider{
    id:string,
    title: string,
    description?: string,
    tasks: TaskProps[] | [],
    date_created?:string,
    onEdit?:boolean, 
    index:number
} 
/**
 * 
 * @param lists IListProvider contains `id`,'title_list', and `tasks`
 * @returns the component list
 */
const List:React.FC<IListProvider>= (lists)=>{
    
    const {open, setOpen, popTrans} = usePop();
    
    // useEffect(()=>{
    //     load(list.tasks);
    // }, [list])
    
    

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
    
    // const transApi = useSpringRef()
    // const transition = useTransition(open ? state : [], {
    //     ref: transApi,
    //     trail: 400,
    //     from: { opacity: 0, scale: 0 },
    //     enter: { opacity: 1, scale: 1 },
    //     leave: { opacity: 0, scale: 0 },
    //   })
    // useChain(open ? [springApi, transApi] : [transApi, springApi], [
    //     0,
    //     open ? 0.1 : 0.6,
    //   ])

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
                    <h1>{lists?.title}</h1>
                </div>
                
                <div className="tasks-cont">
                    <div className="options">
                        {/* <div className={`option ${edit?"hide":""}`} onClick={()=>setAdd(true)}>add</div>
                        
                        <div className={`option ${add?"hide":""}`} onClick={()=>!edit? setEdit(true):setEdit(false)}>edit</div> */}
                    </div>
                    <div id='tasking' className='tasking'>
                        
                        {/* {
                            transition((style, item) => (
                                <animated.div
                                  style={{ ...style}}
                                >
                                    <Task {...item}/> 
                                </animated.div>
                            
                            ))
                                
                        } */}
                        {/* {
                            popTrans(({size, opacity},item)=>(
                                item?
                                <animated.div 
                                    style={{opacity, width:size, height:size}}
                                >
                                    <Task task={} listIndex={lists.index}/> 
                                </animated.div>:<></>
                            ))
                        } */}
                        <div  className="md-button" >
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