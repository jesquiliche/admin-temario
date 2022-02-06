import {useState } from "react";
import React from "react";
import Cookies from 'universal-cookie';
import { useParams } from "react-router-dom";




const Register = (props) => {
    
    let {id}=useParams()
    

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [datos, setDatos] = useState({
        email:"",
        password:""
    });
    const [dataErr, setDataErr]=useState()
    
    

    
    const handleOnChange=(e)=> {
        setDatos({
            ...datos,
            [e.target.name]: e.target.value
        })
        console.log(datos)
    }

    const handleOnsubmit=(e)=>{
        e.preventDefault();
        InsertarDatos(datos);
    }

            
    

    //Insertar en base de datos
    const InsertarDatos=()=>{
        console.log(datos)
        const cookies = new Cookies();

        fetch('http://localhost:3001/api/user/register', {
        method: 'POST', 
        body: JSON.stringify(datos), // data can be `string` or {object}!
       
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',

        }
        })
        .then(response => response.json())
        .then(data => {cookies.set('token', data.data.token, { path:'/'});
        localStorage.setItem("token",JSON.stringify(data.data.token))
            setDataErr(null)
            })
        .catch(error => setDataErr("Credenciales no validas"))
        
        console.log(cookies.get("token"))
        
    }

    
    
    return (
        <>
            <div className="container">
                <div className="bg card card-shadow col-lg-8 mx-auto my-6 mt-4">
                    <div className="text-center">
                        <h1>Registro</h1>
                        <h2>{id}</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleOnsubmit}>
                            <div className="row">
                            <div className="col-lg-6">
                        
                                
                                
                                <input type="email"
                                    placeholder="Introduzca el email"
                                    name="email"  
                                    className="form-control my-2"
                                    pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"
                                    onChange={handleOnChange}
                                    autoFocus="autofocus"
                                    required/>
                                
                                <input type="password"
                                    placeholder="Introduzca el password"
                                    name="password"  
                                    className="form-control my-2"
                                    onChange={handleOnChange}
                                    required/>
                                <input type="text"
                                    placeholder="Introduzca el nombre"
                                    name="nombre"  
                                    className="form-control my-2"
                                    onChange={handleOnChange}
                                    required/>
                                <input type="text"
                                    placeholder="Introduzca los apellidos"
                                    name="apellidos"  
                                    className="form-control my-2"
                                    onChange={handleOnChange}
                                    required/>
                                <input type="text"
                                    placeholder="Introduzca el telèfono"
                                    name="telefono"  
                                    className="form-control my-2"
                                    onChange={handleOnChange}
                                    required/>
                            
                            </div>                            
                                <div className="container col-lg-6">
                                    <input type="text"
                                        placeholder="Introduzca los dirección"
                                        name="direccion"  
                                        className="form-control my-2"
                                        onChange={handleOnChange}
                                        required/>
                                    <input type="text"
                                        placeholder="Introduzca la población"
                                        name="poblacion"  
                                        className="form-control my-2"
                                        onChange={handleOnChange}
                                        required/>
                                    <input type="text"
                                        placeholder="Introduzca la región"
                                        name="region"  
                                        className="form-control my-2"
                                        onChange={handleOnChange}
                                        required/>
                                    <input type="text"
                                        placeholder="Introduzca el pais"
                                        name="pais"  
                                        className="form-control my-2"
                                        onChange={handleOnChange}
                                        required/>
                                
            
                                </div>
                                </div>
                                </form>
                                <button type="submit" className="btn btn-primary w-100">
                               Registrarse
                            </button>
                            </div>
                            
                            
                           
                        
                        {dataErr?<div className="alert alert-secondary mt-2 py-2" role="alert">{dataErr}</div>:""}
                    
                    
                </div>
            
            </div>

            
        </>
    )
}

export default Register;
