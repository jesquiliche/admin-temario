import React from 'react'
import AdminCard from './AdminCard'
import {
    faBriefcase,
    faQuestion,
    faUser,
  } from "@fortawesome/free-solid-svg-icons";
  

const Tablero = () => {
    return (
        <div className='row'>
        
            <AdminCard color="bg-primary" title="Usuarios" icon={faUser} ></AdminCard>
            <AdminCard color="bg-danger" title="Temas" icon={faBriefcase}></AdminCard>
            <AdminCard color="bg-warning" title="Bloques" icon={faQuestion}></AdminCard>
            <AdminCard color="bg-secondary" title="test" icon={faQuestion}/>
                
    
        
        </div>
    )
}

export default Tablero
