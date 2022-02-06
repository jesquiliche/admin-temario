
import React,{ useState,useContext } from "react";
import { useNavigate} from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Login = () => {
    
    const navigate=useNavigate()

    const { user, signIn } = useContext(UserContext);
    
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
    
        ObtenerToken(datos);
    }        
    

    //Insertar en base de datos
    const ObtenerToken=async (datos)=>{
          
        try {
            //Llamamos al EndPoint que nos devuelve el token
            fetch('http://localhost:3001/api/user/login', {
            method: 'POST', 
            body: JSON.stringify(datos), // data can be `string` or {object}!
           
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
    
            }
            })
            .then(response => response.json())
            .then(data => {
                  //Guardamos el token en el sesionStorage en forma de cadena
                  //sesionStorage solo guarda cadenas, no objetos JSON
                  sessionStorage.setItem("token",JSON.stringify(data.data.token))
                  setDataErr(null) 
                  signIn()
                  navigate("/Tablero")
                    
            })
            //Si se produce un error los datos inicio de sesión son incorrectos
            // o el servidor no esta disponible
            .catch(error => setDataErr("Credenciales no validas"))
            //Si todo fue correcto enviar a página de inicio
            
            
            
            console.log(user)
                                   
        } catch(error){
            console.log(error)
        }       
    }

    return (
        <>
            <div className="container ">
        
                <div className="card card-shadow col-lg-4 mx-auto login">
                    <div className="text-center text-dark">
                        <h2>Login</h2>
                    </div>
                    <div className="card-body">
                        <form onSubmit={handleOnsubmit}>
                            <input type="email"
                                placeholder="Introduzca el email"
                                name="email"  
                                className="form-control my-2"
                                onChange={handleOnChange}
                                autoFocus="autofocus"
                                required
                                />
                            <input type="password"
                                placeholder="Introduzca el password"
                                name="password"  
                                className="form-control my-2"
                                onChange={handleOnChange}
                                required
                                />
                            
                           <button type="submit" className="btn btn-primary w-100">
                               Iniciar Sessión
                            </button>
                        </form>
                        {dataErr?<div className="alert alert-secondary py-1" role="alert">{dataErr}</div>:""}
                        <p className="text-dark">¿No estas registrado?<a className="text-primary"> Registrate</a></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
