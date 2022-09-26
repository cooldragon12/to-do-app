// React imports
import React, { useState } from 'react';
// 
import List from '../../components/@list/List';

import {
    animated,
} from 'react-spring';

// style import: Listings
import './Listings.css';
import usePop from '../../hooks/animation/usePop'
import { useList } from '../../hooks/data/useList';

/**
 * 
 * @returns Listing component with the lists or board of task
 */
const Listing = ()=>{
    const {lists, createList} = useList();
    const [text, setText] = useState("");
    const {open ,setOpen, popTrans} = usePop();
    const handleCreateList = ()=>{
        if (text === "")
        return;

        createList({title:text, id:lists.length | 0, tasks:[]});
        setText("")
        setOpen(open=>!open)
    }
    const handleTyping = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setText(e.target.value);
    }

    
    return(
        
        <div className="listings">
            <div className="lg-button animate-up" onClick={()=>setOpen(open=>!open)}>
                <div className="lift-up">
                    ADD NEW LIST
                </div>
            </div>
            {
            popTrans(({size, opacity},item)=>(
                open?
                <animated.div
                    className="new-list-background"
                    style={{opacity}}
                    onClick={()=>setOpen(false)}
                >
                    <animated.div 
                        className="new-list"
                        style={{opacity, width:size, height:size}}
                        onClick={e=>e.stopPropagation()}
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
                    </animated.div>
                </animated.div>:<></>
            ))
            }
            {
                lists.map((list, index)=>
                    <List {...list} key={index}/>
                )
            }       
        </div>
        
    )
};
export default Listing;