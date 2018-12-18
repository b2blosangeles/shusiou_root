
var mysql = require(env.site_path + '/api/inc/mysql/node_modules/mysql');
var config = require(env.config_path + '/config.json');
var CP = new pkg.crowdProcess();
var db_setting = config.db;
db_setting.database = 'platoplan';

var str = 'SHOW TABLES; ';
var _f = {};

_f['DBS'] = function(cbk) {
      var connection = mysql.createConnection(db_setting);
      connection.connect();
      connection.query(str, function (error, results, fields) {
            connection.end();	
            if (!error) {
                cbk({succes: true, data: results});
                return true;
            } else {
                cbk({succes: false, error: error.message});
            }
      }); 
}
CP.serial(
  _f,
  function(data) {
      res.send({_spent_time:data._spent_time, status:data.status, data:data});
  },
  30000
);


