import {useState,useEffect} from "react";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCity,
  faLocationArrow as direccion,
  faPhone,
  faUser,
  faEnvelope as email,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate} from "react-router-dom";





const EditUser = (props) => {
    

    const navigate=useNavigate();
    

    const [provincias,setProvincias]=useState([]);
    const [muncipios,setMunicipios]=useState([]);
    const [user,setUser]=useState({});
    const [provincia,setProvincia]=useState();

    const [dataErr, setDataErr]=useState();
    
    

    
    const handleOnChange=(e)=> {
    
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
        if([e.target.name]==="provincia"){
            setProvincia(e.target.value.substring(0,2))
        }
        

    }

    const handleOnsubmit=(e)=>{
        e.preventDefault();
        ActualizarDatos();
    }

    useEffect(() => {
        ConsultarProvincias();
    },[])

    useEffect(() => {
        ConsultarMunicipios(provincia);
    },[provincia])
            
    const ConsultarProvincias=()=>{
        fetch("http://localhost:3001/api/provincias", {
        method: 'GET', 
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            }
        })
        .then(response => response.json())
        .then(data => {
            setProvincias(data);
        })
        .catch(error => console.log(error))
    }

    const ConsultarMunicipios=async(prov)=>{
            
        await fetch("http://localhost:3001/api/municipios/"+prov, {
        method: 'GET', 
           
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            }
        })
        .then(response => response.json())
        .then(data => {
            setMunicipios(data);
        })
        .catch(error => console.log(error))
    }


    const ActualizarDatos=async ()=>{
            await fetch(`http://localhost:3001/api/user/register`, {
            method: 'POST', 
            body: JSON.stringify(user), // data can be `string` or {object}!
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                }
            })
            .then(response => response.json())
            .catch(error => setDataErr("Credenciales no validas"))
            navigate("/Usuario")
    }

    return (
        <>
            <div className="container">
                <div className="bg card card-shadow col-lg-8 mx-auto">
                    <div className="text-center">
                        <h3>Añadir usuario</h3>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleOnsubmit} className="needs-validation" novalidate>
                            <div className="row">
                            <div className="col-lg-6">
                                
                                <div className="form-floating mb-2">
                                                                 
                                    <input type="email"
                                        placeholder="Introduzca el email"
                                        name="email"  
                                        className="form-control my-2"
                                        pattern="[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{1,5}"
                                        onChange={handleOnChange}
                                        autoFocus="autofocus"
                                        value={user.email}
                                        required/>
                                    <label for="email">
                                        <FontAwesomeIcon icon={email} s className="mr-2 ml-0 text-dark" />
                                        Email
                                    </label>
                                </div>
                                <div className="form-floating mb-2">
                                    <input type="password"
                                        placeholder="Introduzca el password"
                                        name="password"  
                                        className="form-control my-2"
                                        onChange={handleOnChange}
                                        value={user.ṕassword}
                                        required/>
                                    <label for="password">
                                        <FontAwesomeIcon icon={faKey} className="mr-2 ml-0 text-dark" />
                                        Password
                                    </label>
                                </div>
                                <div className="form-floating mb-2">
                                    
                                    <input type="text"
                                        placeholder="Introduzca el nombre"
                                        name="nombre"  
                                        className="form-control my-2"
                                        onChange={handleOnChange}
                                        value={user.nombre}
                                        required/>
                                    <label for="nombre">
                                        <FontAwesomeIcon icon={faUser} className="mr-2 ml-0 text-dark" />
                                        Nombre
                                    </label>
                                </div>
                                <div className="form-floating mb-2">
                                    <input type="text"
                                        placeholder="Introduzca los apellidos"
                                        name="apellidos"  
                                        className="form-control my-2"
                                        onChange={handleOnChange}
                                        value={user.apellidos}
                                        required/>
                                    <label for="apellidos">
                                        <FontAwesomeIcon icon={faUser} s className="mr-2 ml-0 text-dark" />
                                        Apellidos
                                    </label>
                                </div>
                                
                            </div>                            
                            <div className="container col-lg-6">
                                <div className="form-floating mb-2">
                                    <input type="text"
                                        placeholder="Introduzca el telèfono"
                                        name="telefono"  
                                        className="form-control my-2"
                                        onChange={handleOnChange}
                                        value={user.telefono}
                                        required/>
                                    <label for="telefono">
                                        <FontAwesomeIcon icon={faPhone} className="mr-2 ml-0 text-dark" />
                                        Teléfono
                                    </label>
                                </div>
                                <div className="form-floating mb-2">
                                    <select className="form-select"
                                        placeholder="Introduzca la población"
                                        name="provincia"  
                                        onChange={handleOnChange}
                                        value={user.provincia}
                                        required>
                                            <option selected>Seleccione provincia</option>
                                            {provincias.map(p=>
                                                    <option >{p.id}-{p.nm}</option>
                                                )}
                                    </select>
                                    <label for="provincia">
                                        <FontAwesomeIcon icon={faCity} s className="mr-2 ml-0 text-dark" />
                                        Provincia
                                    </label>
                                </div>
                                <div className="form-floating mb-2">
                                    <select className="form-select"
                                        placeholder="Introduzca la población"
                                        name="poblacion"  
                                        onChange={handleOnChange}
                                        value={user.poblacion}
                                        required>
                                            <option selected>Seleccione la población</option>
                                            {muncipios.map(p=>
                                                    <option>{p.id}-{p.nm}</option>
                                                )}
                                    </select>
                                    <label for="poblacion">
                                        <FontAwesomeIcon icon={faCity} s className="mr-2 ml-0 text-dark" />
                                        Población
                                    </label>
                                </div>
                                <div className="form-floating mb-2">
                                    <input type="text"
                                        placeholder="Introduzca los dirección"
                                        name="direccion"  
                                        className="form-control my-2"
                                        onChange={handleOnChange}
                                        value={user.direccion}
                                        required/>
                                    <label for="direccion">
                                        <FontAwesomeIcon icon={direccion} s className="mr-2 ml-0 text-dark" />
                                        Dirección
                                   
                                    </label>
                                    </div>
                                   </div>
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary w-100" 
                                    >Guardar</button>
                                </form>
                            </div>
                        {dataErr?<div className="alert alert-secondary mt-2 py-2" role="alert">{dataErr}</div>:""}
                </div>
            </div>
        </>
    )
}

export default EditUser;
