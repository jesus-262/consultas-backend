const url = require('url')
const {db_host,db_database,db_password,db_user,db_port} = require('./config');
const getDatabase = function() {
  if (process.env.DATABASE_URL){
    return process.env.DATABASE_URL
  }
  if(process.env.CLEARDB_DATABASE_URL) {
    const dbUrl = url.parse(process.env.CLEARDB_DATABASE_URL);
    return {
      waitForConnections : true , 
  connectionLimit : 10 , 
  queueLimit : 0, 
      host     : dbUrl.hostname,
      user     : dbUrl.auth.split(':')[0],
      password : dbUrl.auth.split(':')[1],
      database : dbUrl.pathname.substring(1)
    }
  }

  return  {
    waitForConnections : true , 
    connectionLimit : 10 , 
    queueLimit : 0 ,
    host     :db_host ,
    user     : db_user,
    password : db_password,
    port     : db_port,
    database : db_database
  }
}
module.exports = {
  database: getDatabase(),
}