interface buttonProps {
    children: React.ReactNode,
    onClick: ()=>void,
    
}

const Button:React.FC<buttonProps> = ({children, onClick}: buttonProps)=>{
    return(
        <div className="lg-button animate-up" onClick={onClick}>
            <div className="lift-up">
                {children}
            </div>
        </div>
    )
}
export default Button;