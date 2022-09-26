import React, { useState, useEffect} from "react"
import { useList } from "../../hooks/data/useList";
import { useTask } from "../../hooks/data/useTask";
import './Task.css';

/**
 * TaskProps provides `id`, `content`, status of `check`, boolean `editing` if the current task is editing 
 */
export interface TaskProps{
    id?:string,
    index: number,
    content: string,
    check:true|false,
    editing:true|false,
}
/**
 * TaskCompProps
 * @param task - TaskProps
 * @param index - this props determine which index the current task is on use
 * @notice this will be change in the future when we figure out.
 */


/**
 * 
 * @param task index
 * @task id, content, check, editing
 * @returns 
 */
export const Task:React.FC<TaskProps> = (task, listIndex:number) =>{
    const [text, setText ] = useState("");
    const [check, setCheck] = useState(false);
    const {checkTrueTask, checkFalseTask, saveTask, editTask, removeTask} = useTask(task.index,listIndex);

    // When editing the task
    const changeEditable = (e?:React.KeyboardEvent<HTMLInputElement>)=>{
        // check after done editing if the text is not empty
        if(task.content !== "" && text === ""){
            console.log("Ayaw pumasok")
            return;
        }
        
        // use to able to edit the task 
        if (!task.editing){
            editTask();}
        else if(e?.key === "Enter"){
            // for after creating task, it will create another empty set
            saveTask(text);
        }
    }
    // Handles the remove of a task
    const handleRemove = ()=>{
        removeTask();
    }
    // Handles the check status
    const handleCheck =()=>{
        if(task.editing){
            console.log("dapta hidni dito")
            return;
        }
        
        setCheck(check=>!check)
        if (task.check){
            checkFalseTask();}
            else
            checkTrueTask()
    }

    // For typing 
    const handleTyping = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setText(e.target.value);
    }
    // const handleGenEdit = ()=>{
    //     if (task.task.editing)
    //     return;
    //     saveTask(task.index,text);
    // }


    // useEffects HERE>>>>>>>>>>>>>>
    // Handles the general edit of whole list
    // useEffect(()=>{
    //     changeEditable(task.index)
    //     // handleGenEdit();
    // },[task.task.editing])
    
    // First render and when changes happend in content 
    useEffect(() => {
        setCheck(task.check);
        setText(task.content); 
    }, [task.content])
    // Rerender the Component task when change the check status
    useEffect(()=>{ 
    },[check])

    
    return(
        <div tabIndex={task.index}  onClick={handleCheck} className={`task-cont${check? " check":""}${task.editing? " focus":""}`}>
            <div className={`checkbox-cont`}>
                <input tabIndex={task.index+1} readOnly  type="checkbox" checked={check} name="check" id="checkbox" />
            </div>
            <div   className={`content-cont`}>
                <span></span>
                <input autoFocus={task.editing} tabIndex={task.index+2} onKeyDown={(e)=>changeEditable(e)} onChange={(e)=>handleTyping(e)} value={text} type="text" disabled={!task.editing} />
            </div>
            <div className="options-cont">
                <div className={`option-del ${task.editing? "appear":""}`} onClick={()=>handleRemove()}>
                    delete
                </div>
            </div>
        </div>
    )
}
