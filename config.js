const config = {}
config.db_host=process.env.HOST || 'localhost';
config.db_user=process.env.USER || 'root';
config.db_password=process.env.PASSWORD || '';
config.db_database=process.env.DATABASE || 'datos';
config.db_port=process.env.PORT || 3306;


module.exports = config;



