import React from 'react';
import { NavLink } from 'react-router-dom';
import './Tab.css';

interface TabProps{
    children?:string,
    icon?: JSX.Element,
    to: string
}
const Tab:React.FC<TabProps>= ({children, icon, to}:TabProps)=>{
    return(
        <NavLink to={to} className="tab-link">
            <div className="tab">
                <div className="icon-cont">{icon}</div>
                <span className="tab-name">{children}</span>
            </div>
        </NavLink>
      
    )
}
export default Tab;