const datoscontrol = {}
const path =require('path');
const pool = require('../database');

//mostrar uno
datoscontrol.getDatos = async(req, res)=>{

  const query='SELECT * FROM persona ORDER BY persona.id DESC LIMIT 8';
         
  
  const persona= await pool.query(query)
 // console.log(persona)
  res.json(persona);
 
  
}
//crear uno
datoscontrol.createDatos = async(req, res)=>{
  console.log("crear")
  const {nombrecompleto,folio,observacion,cedula,departamento,municipio,puesto, direccion,mesa}=req.body;
  console.log(observacion);
  var caso=' ';
  
  //casos
  const query='SELECT * FROM persona WHERE cedula='+cedula;
  console.log(query);
  const verificar= await pool.query(query);
  
  console.log(verificar[0]);
//Quitar los dos comentarios y quitar verificada
caso ='VERIFICADA';
  //caso +=' CEDULA REPETIDA EN FOLIOS : ';
  if(verificar!=""){

    //return res.status(401).json({messaje:"cedula existe"})
    console.log("entro a verificar")
   
    console.log("cedula existe");
    console.log(caso)
    for(var i=0;i<verificar.length;i++){
      console.log(verificar[i].folio)
    //caso += verificar[i].folio + ' - '
    console.log(caso)
  }

 }else{
  caso ='VERIFICADA';
  console.log(caso)
 
 }
 console.log(caso)
  const nuevapersona= {
    caso,
    observacion,
    folio,
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

  const queryy='UPDATE persona  SET caso = "'+caso+'"  WHERE cedula = '+cedula+ ' AND caso != "VERIFICADA"';
  console.log(queryy);
  await pool.query(queryy);
  console.log("actualizar");


  console.log("persona creada")
   
    res.send("termino");
}

datoscontrol.deleteDatos = async(req, res)=>{
  console.log("entro a borrar")  
 // console.log(req.body);
 // console.log(req.params);
  const id = req.params.id;
//console.log(id)
  await pool.query('DELETE FROM persona WHERE id='+id);
  res.json("Borrado");
}


module.exports = datoscontrol;