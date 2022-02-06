import {useState,useEffect} from "react";
import React from "react";
import {useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCity,
  faLocationArrow as direccion,
  faPhone,
  faUser,
  faEnvelope as email,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate} from "react-router-dom";





const EditUser = (props) => {
    
    let {id}=useParams()
    const navigate=useNavigate();
    


    const [provincias,setProvincias]=useState([]);
    const [muncipios,setMunicipios]=useState([]);
    const [user,setUser]=useState({});
    const [provincia,setProvincia]=useState();

    const [dataErr, setDataErr]=useState();
    
    

    
    const handleOnChange=async (e)=> {
    
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    
        if([e.target.name]=="provincia"){
        
            let prov=e.target.value;
            await setProvincia(prov)
                ConsultarMunicipios(prov.substring(0,2))
        }

    }

    const handleOnsubmit=(e)=>{
        e.preventDefault();
        ActualizarDatos();
        console.log(user);
    
    
    }

    useEffect(() => {
        ConsultarDatos();
        ConsultarProvincias();
      //  ConsultarMunicipios(user.provincia);
    },[])

    useEffect(() => {
        console.log("Entro en provincia 1")
      //  console.log(provincia.substring(0,2))
        if(typeof(provincia)!="undefined")
            ConsultarMunicipios(provincia.substring(0,2));
      
    },[provincia])
    

    //Consultamos los datos del usuario
    const ConsultarDatos=()=>{
        const token=sessionStorage.getItem("token");

        fetch(`http://localhost:3001/api/user/${id}`, {
        method: 'GET', 
           
        headers:{
            'auth-token': token.replace(/['"]+/g, ''),
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',


        }
        })
        .then(response => response.json())
        .then(data => {
            setUser(data);
            console.log(data)
        })
        .catch(error => setDataErr("Credenciales no validas"))
    }

     //Consultamos los datos del usuario
     const BorrarDatos=()=>{
        const token=sessionStorage.getItem("token");
    

        fetch(`http://localhost:3001/api/user/${id}`, {
        method: 'DELETE', 
           
        headers:{
            'auth-token': token.replace(/['"]+/g, ''),
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',

        }
        })
        .then(response => response.json())
        .then(data => {
            setUser(data);
            console.log(data)
        })
        .catch(error => setDataErr("Credenciales no validas"))
    }

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
            console.log(data);
        })
        .catch(error => console.log(error))
    }

    const ConsultarMunicipios=async(prov)=>{
        const token=sessionStorage.getItem("token");
    
        console.log("prov "+prov)
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
            const token=sessionStorage.getItem("token");

            await fetch(`http://localhost:3001/api/user/${id}`, {
            method: 'PUT', 
            body: JSON.stringify(user), // data can be `string` or {object}!
            headers:{
                'auth-token': token.replace(/['"]+/g, ''),
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
                        <h3>Editar usuario</h3>
                
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleOnsubmit}>
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
                                        <label for="email"><FontAwesomeIcon icon={email} s className="mr-2 ml-0 text-dark" />Email address</label>
                                    
                                </div>
                                <div className="form-floating mb-2">
                                    
                                    <input type="text"
                                        placeholder="Introduzca el nombre"
                                        name="nombre"  
                                        className="form-control my-2"
                                        onChange={handleOnChange}
                                        value={user.nombre}
                                        required/>
                                    <label for="nombre"><FontAwesomeIcon icon={faUser} s className="mr-2 ml-0 text-dark" />
                                    Nombre</label>
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
                                <div className="form-floating mb-2">
                        
                        <select className="form-select my-2"
                            placeholder="Introduzca la provincia"
                            name="provincia"  
                        
                            onChange={handleOnChange}
                            value={user.provincia}
                            required>
                                <option selected>Selccione Provincia</option>
                                {provincias.map(p=>
                                        <option >{p.id}-{p.nm}</option>
                                    )}
                                
                                
                        </select>
                        <label for="provincia">
                            <FontAwesomeIcon icon={faCity} className="mr-2 ml-0 text-dark" />
                            Provincia
                        </label>
                    </div>
                            
                            </div> 
                               
                            <div className="container col-lg-6">
                              
                                <div className="form-floating mb-2">
                                    
                                    <select className="form-select my-2"
                                        placeholder="Introduzca la población"
                                        name="poblacion"  
                                    
                                        onChange={handleOnChange}
                                        value={user.poblacion}
                                        
                                                                         
                                        required>
                                            <option selected>{user.poblacion}</option>
                                            {muncipios.map(p=>
                                                    <option>{p.id}-{p.nm}</option>
                                                )}
                                            
                                            
                                    </select>
                                    <label for="poblacion">
                                        <FontAwesomeIcon icon={faCity} className="mr-2 ml-0 text-dark" />
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
                                        <FontAwesomeIcon icon={direccion} className="mr-2 ml-0 text-dark" />
                                        Dirección
                                    </label>
                                </div>
                                <div className="form-floating mb-2">
                                    
                                    <input type="text"
                                        placeholder="Introduzca el telèfono"
                                        name="telefono"  
                                        className="form-control my-2"
                                        onChange={handleOnChange}
                                        value={user.telefono}
                                        required/>
                                    <label for="telefono">
                                        <FontAwesomeIcon icon={faPhone}className="mr-2 ml-0 text-dark" />
                                        Teléfono
                                    </label>
                                </div>
                                    
                                  {/* <FontAwesomeIcon icon={faMap} s className="mr-2 ml-0 text-dark" />
                                    <label>Región</label>
                                    
                                    <input type="text"
                                        placeholder="Introduzca la región"
                                        name="region"  
                                        className="form-control my-2"
                                        onChange={handleOnChange}
                                        value={user.region}
                                        required/>
                                    <FontAwesomeIcon icon={faFlag} s className="mr-2 ml-0 text-dark" />
                                    <label>País</label>
                                    <input type="text"
                                        placeholder="Introduzca el pais"
                                        name="pais"  
                                        className="form-control my-2"
                                        onChange={handleOnChange}
                                        value={user.pais}
                                        required/>
                                
                                            */}
                                    </div>
                                </div>
                                <button 
                                    type="submit" 
                                    className="btn btn-primary mx-1" 
                                    >Guardar</button>
                                    <button 
                                     
                                    className="btn btn-danger mx-1" 
                                    onClick={BorrarDatos}>borrar</button>
                                
                                </form>
                                

                                
                        
                            
                            </div>
                            
                            
                           
                        
                        {dataErr?<div className="alert alert-secondary mt-2 py-2" role="alert">{dataErr}</div>:""}
                    
                    
                </div>
            
            </div>

            
        </>
    )
}

export default EditUser;
