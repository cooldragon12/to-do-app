import React, { useEffect, useState } from 'react';

import { Task } from '../../components/@task/Task';
import './Listings.css'
const Listing: React.FC = ()=>{
    const [tasks, setTasks] = useState([
    {
        content:"",
        check:false,
        editing:true
    }
    ]);
    // useEffect(()=>{
    //     setTasks((prev)=>{
    //         var tasks = [...prev];
    //         tasks.sort((a, b)=>{
    //             return(a.check === b.check)? 0 :a.check?1:-1
    //         })
    //         return([...tasks]);
    //     })
    // },[tasks])
    useEffect(()=>{
        
    },[tasks])
    return(
        <div className="listings">
            <div className="title-cont">
                <h1>Checklist</h1>
                <h1>Checklist</h1>
            </div>
            <div className="tasks-cont">
                <div>
                    {
                        tasks.map((task, index)=>(
                            <Task  key={index} index={index} check={task.check} content={task.content} editing={task.editing} setTask={setTasks}/>
                        ))
                    }
                </div>
            </div>
        </div>
    )
};
export default Listing;