
import React from "react";



const Tema = () => {
    


            
    


    
    
    return (
        <>
            <div className="container ">
                <div className="card card-shadow col-lg-3 mx-auto login">
                    <div className="text-center text-dark">
                        <h2>Tema</h2>
                    </div>
                    <div className="card-body">
                        <form>
                            <input type="tema"
                                placeholder="Título"
                                name="titulo"  
                                className="form-control my-1"
                            
                                autoFocus="autofocus"
                                />
                            <input type="Descripción"
                                placeholder="Descripción"
                                name="descripcion"  
                                className="form-control my-1"
                                />
                           <button type="submit" className="btn btn-primary w-100">
                               Guardar
                            </button>
                        </form>
                    
                    </div>
                    
                </div>
            
            </div>

           

            
        </>
    )
}

export default Tema
