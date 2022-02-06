import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope as email,faUserEdit,faTrashAlt as remove,
    faPlusSquare as add,faSearch } from "@fortawesome/free-solid-svg-icons";
  

const Bloque = () => {

    const estadoInicial=useState({
    
        numero:0,
        descripcion:""
    })
    
    const [bloques,setBloques]=useState([{}]);
    const [bloque,setBloque]=useState(estadoInicial);


    useEffect(() => {
        obtenerBloques()
    }, []);
  
    //Obtener toda la lista de bloques  
    const obtenerBloques=async ()=>{
        //Obtener token de session
        const token=sessionStorage.getItem("token");
        try{
            const datos=await fetch('http://localhost:3001/api/bloque',
            {
            headers: {
                "auth-token": token.replace(/['"]+/g, ''),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
            }
            )
            console.log(datos.json)
            const d=await datos.json()

            //Iniciar tabla de usuarios
            await setBloques(d)
        }
        catch(error){
            alert(error)

        }
       
    }

    const borrarBloque=async (id)=>{
        const token=sessionStorage.getItem("token");
        try{
            const datos=await fetch('http://localhost:3001/api/bloque/'+id,
            {
            method:"DELETE",
            headers: {
                "auth-token": token.replace(/['"]+/g, ''),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
            }
            )
            obtenerBloques();
        }
        catch (error){
            alert(error)
        }
    }

    const handleOnChange=(e)=>{
        setBloque(
            {...bloque,
                [e.target.name]:e.target.value
            }
        )
    }

    const handleOnSubmit=async (e)=>{
        const token=sessionStorage.getItem("token");
        try{
            const datos=await fetch('http://localhost:3001/api/bloque/',
            {
            method:"POST",
            body: JSON.stringify(bloque), // data can be `string` or {object}!
            headers:{
                "auth-token": token.replace(/['"]+/g, ''),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                }
            })
            .then(response => response.json())
        
    
        }
        catch (error){
            console.log(error);
        }
       // obtenerBloques();
    }

    return (
        
        <>
            
            <div className='row'>
            <div className="container col-lg-4">
                <div className="card card-shadow login">
                    <div className="text-center text-dark">
                        <h2>Bloque</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleOnSubmit}>
                            <input type="number"
                                placeholder="numero"
                                name="numero"  
                                className="form-control my-1"
                                onChange={handleOnChange}
                                autoFocus="autofocus"
                                />
                            <textarea rows="5"
                                placeholder="Descripción"
                                name="descripcion"  
                                className="form-control my-1"
                                onChange={handleOnChange}
                                >
                            </textarea>
                           <button type="submit" className="btn btn-primary w-100">
                               Guardar
                            </button>
                        </form>
                    
                    </div>
                    
                </div>
            
            </div>

            <div className="container col-sm-8 ">
                <div className="card card-shadow">
                    <Table>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Descripción</th>
                                <th>Acción</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {bloques.map(e=>(
                                <tr>
                                    <td>{e.numero}</td>
                                    <td>{e.descripcion}</td>
                                    <td>
                                        <a className="btn btn-danger">
                                        <FontAwesomeIcon icon={faUserEdit} className="ml-0 text-white mx-auto" />
                                        </a>
                                        |
                                        <a className="btn btn-warning"
                                        onClick={()=>borrarBloque(e._id)}>
                                        <FontAwesomeIcon icon={remove} 
                                            className="mx-2 text-white mx-auto"  />
                                        </a>
                                    </td>
                      
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>


            
        </>
    )
}

export default Bloque
