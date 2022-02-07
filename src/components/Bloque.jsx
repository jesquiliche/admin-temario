import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Table } from 'reactstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope as email,faUserEdit,faTrashAlt as remove,
    faPlusSquare as add,faSearch } from "@fortawesome/free-solid-svg-icons";
  

const Bloque = () => {

    const estadoInicial=useState({
        _id:"",
        numero:0,
        descripcion:""
    })
    
    const [bloques,setBloques]=useState([{}]);
    const [bloque,setBloque]=useState(estadoInicial);


    useEffect(() => {
        obtenerBloques()
    }, []);

    useEffect(() => {
        obtenerBloques()
    }, [bloque]);
  
  
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

    
    const insertarBloque=async()=>{
    
        const token=sessionStorage.getItem("token");
        try{

            const datos=await fetch('http://localhost:3001/api/bloque/',
            {
            method: "POST",
            body: JSON.stringify(bloque), // data can be `string` or {object}!
            headers:{
                "auth-token": token.replace(/['"]+/g, ''),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                }
            })
            .then(response => response.json())
        }catch(error){
            alert(error);
        }
    }

    const updateBloque=async(id)=>{
        
        const token=sessionStorage.getItem("token");
        try{
            
            const dato = {
                numero: bloque.numero,
                descripcion:bloque.descripcion
            }
            const datos=await fetch('http://localhost:3001/api/bloque/'+id,
        
            {
            method: "PUT",
            body: JSON.stringify(dato), // data can be `string` or {object}!
            headers:{
                "auth-token": token.replace(/['"]+/g, ''),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                }
            })
            .then(response => response.json())
        }catch(error){
            alert(error);
        }
    }
    
    const handleOnSubmit=async (e)=>{
        e.preventDefault();
        const {_id}=bloque;
        if(!_id) insertarBloque();
        else updateBloque(_id);
        setBloque(estadoInicial);
        obtenerBloques();
    }

    const actualizarBloque= async (id)=>{
        const token=sessionStorage.getItem("token");
    
        try{
            const datos=await fetch('http://localhost:3001/api/bloque/'+id,
            {
            method:"GET",
            headers: {
                "auth-token": token.replace(/['"]+/g, ''),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            }
            }
            ).then(response => response.json())
            setBloque(datos);
        }
        catch (error){
            alert(error)
        }
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
                                required
                                placeholder="numero"
                                name="numero"  
                                className="form-control my-1"
                                onChange={handleOnChange}
                                autoFocus="autofocus"
                                value={bloque.numero || ''}
                                />
                            <textarea rows="5"
                                required
                                placeholder="Descripción"
                                name="descripcion"  
                                className="form-control my-1"
                                onChange={handleOnChange}
                                value={bloque.descripcion || ''}
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
                                        <a className="btn btn-danger"
                                        onClick={()=>actualizarBloque(e._id)}>
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
