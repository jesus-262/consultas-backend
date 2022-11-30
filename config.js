const config = {}
config.db_host=process.env.DB_HOST || 'localhost';
config.db_user=process.env.DB_USER || 'root';
config.db_password=process.env.DB_PASSWORD || '';
config.db_database=process.env.DB_DATABASE || 'datos';
config.db_port=process.env.DB_PORT || 3306;


module.exports = config;



