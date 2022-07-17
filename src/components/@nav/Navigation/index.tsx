import React from 'react';
import {MdSpaceDashboard} from 'react-icons/md';
import {AiFillCalendar, AiFillNotification, AiOutlinePlus} from 'react-icons/ai'

import Tab from '../Tab';
import './Navigation.css'
import ProfileNav from '../Profile';

const Navigation:React.FC = ()=>{
    return (
        <div className="navigation">
            <div className="nav-logo">
                <h2 className="title">TO_DO_ME</h2>
                <div className="notification"><AiFillNotification/></div>
            </div>
            <div className="nav-link">
                <Tab icon={<MdSpaceDashboard size={25}/>} to="/dashboard">Dashboard</Tab>
                <Tab icon={<AiFillCalendar size={25}/>} to="/calendar">Calendar</Tab>
                <Tab icon={<AiOutlinePlus size={25}/>} to="/create-new-task">Create Task</Tab>
            </div>

            <div className="nav-profile">
                <ProfileNav name='Johndel Encabo' subtitle='I dont know' photo='sdsd'/>
            </div>
        </div>
    )
}
export default Navigation;