
const APIProvincias = async() => {
    const datos= await fetch("http://localhost:3001/api/provincias", {
        method: 'GET', 
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        }
        })
        .then(response => response.json())
        console.log(datos)
    return datos
        
};

module.exports=APIProvincias;