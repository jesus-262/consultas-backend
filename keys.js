const url = require('url')
require('events').EventEmitter.defaultMaxListeners = 30;
const {db_host,db_database,db_password,db_user,db_port} = require('./config');
const getDatabase = function() {
 

  return  {
    waitForConnections : true , 
    connectionLimit : 30 , 
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