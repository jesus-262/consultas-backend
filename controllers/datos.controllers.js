const datoscontrol = {}
const path =require('path');
const pool = require('../database');

//mostrar uno
datoscontrol.getDatos = async(req, res)=>{

  const query='SELECT * FROM persona ORDER BY persona.id DESC LIMIT 5';
         
  
  const persona= await pool.query(query)
  console.log(persona)
  res.json(persona);
 
  
}
//crear uno
datoscontrol.createDatos = async(req, res)=>{
  console.log("crear")
  const {nombrecompleto,cedula,departamento,municipio,puesto, direccion,mesa}=req.body;

  const nuevapersona= {
    nombrecompleto,
    cedula,
    departamento,
    municipio,
    puesto,
    direccion,
    mesa
   
   }
//  console.log("Guardo en el excel");
  await pool.query('INSERT INTO persona set ?',[nuevapersona]);
  console.log("persona creada")
   
    res.send("termino");
}

datoscontrol.deleteDatos = async(req, res)=>{
  console.log("entro a borrar")  
  console.log(req.body);
  console.log(req.params);
  const id = req.params.id;
console.log(id)
  await pool.query('DELETE FROM persona WHERE id='+id);
  res.json("Borrado");
}


module.exports = datoscontrol;