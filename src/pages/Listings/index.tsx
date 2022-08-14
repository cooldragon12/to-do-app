// React imports
import React, { useState } from 'react';
// 
import List from '../../components/@list/List';
import { useList } from '../../store/context/ListTask';
import {
    useSpring,
    config,
    animated,
    useTransition
} from 'react-spring';

// style import: Listings
import './Listings.css'
import { TasksProvider } from '../../store/context/Tasking';


/**
 * 
 * @returns Listing component with the lists or board of task
 */
const Listing = ()=>{
    const {lists, createList} = useList();
    const [open, setOpen] =useState(false);
    const [text, setText] = useState("");

    const handleCreateList = ()=>{
        if (text === "")
        return;

        createList({title_list:text, id:lists.length | 0, tasks:[]});
        setText("")
        setOpen(open=>!open)
    }
    const handleTyping = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setText(e.target.value);
    }

    const popTrans = useTransition(open,{
        config: config.stiff,
        from: { 
            size: '0%', 
            opacity:"0"
        },
        enter: {
          size: open ? '90%' : '0%',
          opacity: open? "1":"0"
        },
        leave:{
            size: '0%', 
            opacity:"0"
        },
    })
    return(
        
        <div className="listings">
            <div className="lg-button animate-up" onClick={()=>setOpen(open=>!open)}>
                <div className="lift-up">
                    ADD NEW LIST
                </div>
            </div>
            {
            popTrans(({size, opacity},item)=>(
                item?
                <animated.div 
                    className="new-list"
                    style={{opacity, width:size, height:size}}
                >
                    <div>
                        <h1>CREATE NEW LIST</h1>
                    </div>
                    <input autoFocus onChange={(e)=>handleTyping(e)} value={text} name="title-input"  type="text" className={`title-input ${open? "open":""}`}/>
                    <div className="button-set">
                    <div  className="md-button animate-up" onClick={handleCreateList}>
                        <div className="lift-up">
                            CREATE
                        </div>
                    </div>
                    <div  className="md-button animate-up" onClick={()=>setOpen(open=>!open)}>
                        <div className="lift-up">
                            CANCEL
                        </div>
                    </div>

                    </div>
                </animated.div>:<></>
            ))
            }
            {
                lists.map((list, index)=>
                <TasksProvider key={index}>
                    <List {...list} key={index}/>
                </TasksProvider>
                )
            }       
        </div>
        
    )
};
export default Listing;