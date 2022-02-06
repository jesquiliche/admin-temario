import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const AdminCard = (props) => {
    const {color,title,icon}=props;
    return (
        <>
            
            <div className="container col-lg-3">
                <div className={`card card-shadow ${color}`} >
                    <div className="text-center text-white py-2">
                        <FontAwesomeIcon icon={icon}  />
                        
                        <span> {title}</span>
                
                        
                        
                        
                    </div>
                    <FontAwesomeIcon icon={props.FontAwesomeIcon} className="mr-2 text-dark" />
                    <div className="card-body text-white">
                       prueba
                    </div>
                    
                </div>
                </div>
            
            
        </>
    )
}

export default AdminCard
