import React from "react"
import './Profile.css'

interface ProfileProps {
    name:string,
    subtitle:string,
    photo:string
};

const ProfileNav:React.FC<ProfileProps> = ({name, subtitle, photo}: ProfileProps)=>{
    return (
        <div className="profile">
            <div className="profile-photo">
                <div>{photo}</div>
            </div>
            <div className="profile-info">
                <div className="profile-name">{name}</div>
                <div className="profile-subtitle">{subtitle}</div>
            </div>
            <div className="option"></div>
        </div>
    )
};

export default ProfileNav;