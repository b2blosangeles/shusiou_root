
var mysql = require(env.site_path + '/api/inc/mysql/node_modules/mysql');
var config = require(env.config_path + '/config.json');
var CP = new pkg.crowdProcess();
var db_setting = config.db;
db_setting.database = 'platoplan';
var connection = mysql.createConnection(db_setting);
var str = 'SHOW DATABASES; ';

connection.connect();
connection.query(str, function (error, results, fields) {
connection.end();	
  if (!error) {
    res.send(results);
    return true;
  } else {
    res.send(error.message);
  }
}); 

