//var db =require('mysql2/promise');
const { database } = require ('./keys');
//const {promisify} =require('util')
const mysql = require('mysql2');

var pool = mysql.createPool(database);
pool.getConnection(function(err, connection) {
    // Do something with the connection
    if(err){
        console.log("error");
     }
     if(connection){
        // connection.release();
         pool.releaseConnection(connection);
         console.log("base de datos funcionando");
         return;
     }
 //   conn.query(/* ... */);
    // Don't forget to release the connection when finished!
   // pool.releaseConnection(conn);
 })

/*
const pool = createPool(database).then(() => {
    console.log("base de datos funcionando");
}); 


pool.getConnection((err,connection)=>{

if(err){
   console.log("error");
}
if(connection){
    connection.release();
    console.log("base de datos funcionando");
    return;
}
});*/
//para poder utilizar promesas
//pool.query = promisify(pool.query);


module.exports = pool;