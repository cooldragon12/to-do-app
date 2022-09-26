import { useState } from "react"
import {
    useTransition,
    config,
  } from '@react-spring/web'
const usePop = ()=>{
    const [open, setOpen] = useState(false);
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
    return {open, setOpen, popTrans}
}

export default usePop;