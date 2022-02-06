import React from "react"
import { useEffect,useState } from "react"
import { NavLink } from "react-router-dom"
import { Table,Button } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCity,faPhone,faUser,faEnvelope as email,faUserEdit,
  faPlusSquare as add,faSearch } from "@fortawesome/free-solid-svg-icons";


const Usuario = () => {
  
  //Poner filtro en blanco para las busquedas
  const FiltroInicial={
    nombre:"",
    email:"",
    apellidos:""
  }
    
    //Lista de usuarios a mostrar aplicando el filtro
    const [users,setUsers]=useState([])
    
    //Lista de usuarios original sin aplicar filtro
    //Sirve para rellenar combos de busqueda
    const [usersCombo,setUsersCombo]=useState([])

    //Valores para aplicar al filtro
    const [userFilter,setUserFilter]=useState(FiltroInicial)

    useEffect(() => {
        obtenerDatos()
    }, []);

    const onChangeFilter=(e)=>{
      const valor=e.target.value;
      
      console.log(valor)
      console.log(valor)
      
      setUserFilter({
        ...userFilter,
        [e.target.name]:valor
      })
     
      //e.preventDefault();
      
      console.log(userFilter);
    }
    
    const onSumitFilter=async (e)=>{
      e.preventDefault();
      actualizarFiltro();
   //   setUserFilter(FiltroInicial)
      
    }
  
    const actualizarFiltro=async ()=>{
      const token=sessionStorage.getItem("token");

      //Aplicar solo si minimo uno de los combos de filtro ha sido rellenado
      if (userFilter.nombre!=="" 
        | userFilter.apellidos!==""
        | userFilter.email!=="") { 
        const datos=await fetch('http://localhost:3001/api/user/filter',
        {
          method: "POST",
          body: JSON.stringify(userFilter),
          headers: {
            'auth-token': token.replace(/['"]+/g, ''),
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        }
        )
        const d=await datos.json()
        
        //Rellenar lista de usuarios
        await setUsers(d)
        }
      else {
        //Si no hay filtro obtener toda la lista de usuarios
        obtenerDatos();
      }
  }
  
  //Obtener toda la lista de usuarios  
  const obtenerDatos=async ()=>{
      //Obtener token de session
      const token=sessionStorage.getItem("token");
      console.log(token)
      const datos=await fetch('http://localhost:3001/api/user',
      {
        headers: {
          'auth-token': token.replace(/['"]+/g, ''),
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      })
      const d=await datos.json()

      //Iniciar tabla de usuarios
      await setUsers(d)
      //Iniciar combos de busqueda
      await setUsersCombo(d)
    
    }

    return (
      <>
        <div className="card">
          <h3 className="text-center ">Usuarios registrados</h3>
                    
          <div clasName="card-body">
            <div className="container">
          <form onSubmit={onSumitFilter} className="container-fluid">
            <div className="d-flex ">
            
            {/* Pintar combo de Emails */}
   
            <div className="form-floating mb-2 px-2 col-sm-4">
              <select className="form-select mr-2" name="email" 
              placeholder="Search"
              onChange={onChangeFilter}
              aria-label="Search">
              <option selected ></option>

                         {usersCombo.map(e=>(
                    <option value={e.email} >{e.email}</option>
                  ))}
               </select>
               <label for="email">
                <FontAwesomeIcon icon={email} className="mr-2 ml-0 text-dark" />
                Buscar por Email
              </label>
            </div>

            {/* Pintar combo de nombres */}
   
            <div className="form-floating mr-2 px-2 col-lg-3">
            <select className="form-select mr-2" 
              onChange={onChangeFilter}
              name="nombre" placeholder="Search" aria-label="Search">
              <option selected></option>
              {usersCombo.map(e=>(
                                   
                    <option value={e.nombrel}>{e.nombre}</option>
                  ))}
               </select>
               <label for="nombre">
                <FontAwesomeIcon icon={faUser} className="mr-2 ml-0 text-dark" />
                Buscar por Nombre
              </label>
            </div>
            
            {/* Pintar combo de apellidos */}

            <div className="form-floating mb-2 px-2 col-lg-4">
            <select className="form-select mr-2"
              onChange={onChangeFilter} 
              name="apellidos" placeholder="Search" aria-label="Search">
              <option selected></option>
              {usersCombo.map(e=>(
                    <option value={e.apellidos}>{e.apellidos}</option>
                  ))}
               </select>
               <label for="nombre">
                <FontAwesomeIcon icon={faUser} className="mr-2 ml-0 text-dark" />
                Buscar por Apellidos
              </label>
            </div>

            {/* Aplicar el filtro  */}
            <div className="form-floating mb-2 px-2">
            <button type="submit" className="btn btn-primary py-1 col-lg-12">
              <FontAwesomeIcon icon={faSearch} className="mr-2 ml-0 text-white" />Buscar
            </button>
            </div>
            </div>
          </form>

          {/* Pintar tabla con lista de usuarios */}
            
            <Table hover responsive="true" className="mx-2" size="sm">
              <thead>
                <tr>
                <th scope="col">
                    <FontAwesomeIcon icon={email} s className="mr-2 ml-0 text-dark" />
                    Email
                  </th>
                  <th scope="col">
                    <FontAwesomeIcon icon={faUser} s className="mr-2 ml-0 text-dark" />
                    Nombre
                  </th>
                  <th scope="col">
                    <FontAwesomeIcon icon={faUser} className="mr-2 ml-0 text-dark" />
                    Apellidos
                  </th>
                  <th scope="col">
                    <FontAwesomeIcon icon={faPhone} className="mr-2 ml-0 text-dark" />
                    Teléfono</th>
                 
                  <th scope="col">
                    <FontAwesomeIcon icon={faCity} className="mr-2 ml-0 text-dark" />
                    Población
                  </th>
                  <th scope="col">
                    <FontAwesomeIcon icon={faCity} className="mr-2 ml-0 text-dark" />
                    Provincia
                  </th>
                  
                  <th scope="col">Acción</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {users.map(e=>(
                  <tr>
                    <td>{e.email}</td>
                    <td>{e.nombre}</td>
                    <td>{e.apellidos}</td>
                    <td>{e.telefono}</td>
                    <td>{e.poblacion}</td>
                    <td>{e.provincia}</td>
                    <td>
                      
                      {/* Botón borrar usuario de la lista */}

                      <NavLink to={`/editUser/${e._id}`}>
                        <Button color="danger mx-1">
                          <FontAwesomeIcon icon={faUserEdit} className="ml-0 text-white mx-auto" />
                        </Button>
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>

            {/* Botón añadir usuarios */}

            <NavLink to={`/AddUser`}>
              <Button color="primary mx-2 mb-2">
                <FontAwesomeIcon icon={add} className="text-white mx-1" />
                  Añadir
              </Button>
          </NavLink>
          </div>
        </div>
        </div>
      </>
    )
}

export default Usuario
