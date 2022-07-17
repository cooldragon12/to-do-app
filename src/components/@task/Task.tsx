import React, { useState, useEffect} from "react"
import './Task.css';

export interface TaskProps{
    index: number,
    content: string,
    check:true|false,
    editing:true|false,
    setTask:React.Dispatch<React.SetStateAction<{
        content:string,
        check:boolean,
        editing:boolean
    }[]>>
    
}


export const Task:React.FC<TaskProps>= ({index, check, content, editing, setTask}:TaskProps)=>{
    const [text, setText ] = useState("");
    const changeEditable = (index:number, e?:React.KeyboardEvent<HTMLInputElement>)=>{
        if (!editing){
            setTask((prev) => {
                var tasks = [...prev];
                //Where to change the value
                tasks[index].editing = true;
                return([...tasks])
            })
        }else if(e?.key === "Enter" && content === "" && text !== ""){
            // for after creating task, it will create another empty set
            setTask((prev) => {
                var tasks = [...prev];
                 //Where to change the value
                tasks[index].content = text;
                tasks[index].editing = false;
                return([...tasks, {content:"",editing:true,check:false}])
            })
        }else if(e?.key === "Enter" && text !== ""){
            setTask((prev) => {
                var tasks = [...prev];
                 //Where to change the value
                tasks[index].content = text;
                tasks[index].editing = false;
                
                return([...tasks])
            })
        }
    }
    const handleCheck =(index:number)=>{
        if(!editing){

            if (!check ){
                setTask((prev) => {
                    var tasks = [...prev];
                     //Where to change the value
                    tasks[index].check = true;
                    
                    return([...tasks])
                })
            }else{
                setTask((prev) => {
                    var tasks = [...prev];
                     //Where to change the value
                    tasks[index].check = false;
                    
                    return([...tasks])
                })
            }
        }
    }
    const handleTyping = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setText(e.target.value);
    }
    
    // 
    // For Typying the content
    useEffect(() => {
        setText(content);

    }, [content])
    
    return(
        <div tabIndex={index}  onClick={()=>handleCheck(index)} className={`task-cont ${check? "check":""} ${editing? "focus":""}`}>
            <div className={`checkbox-cont`}>
                <input tabIndex={index+1} type="checkbox" checked={check} name="check" id="checkbox" />
            </div>
            <div  onDoubleClickCapture={()=>changeEditable(index)} className={`content-cont`}>
                <span></span>
                <input autoFocus={editing} tabIndex={index+2} onKeyDown={(e)=>changeEditable(index, e)} onChange={(e)=>handleTyping(e)} type="text" disabled={editing? false:true} value={text}/>
            </div>
        </div>
    )
}
