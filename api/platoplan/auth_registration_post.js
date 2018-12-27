var token = (!req.body.token) ? '' : req.body.token;
var CP = new pkg.crowdProcess();
var mysql = require(env.site_path + '/api/inc/mysql/node_modules/mysql');
var config = require(env.config_path + '/config.json');
var db_setting = config.db;
db_setting.database = 'platoplan';

var _f = {};
_f['DBS'] = function(cbk) {
	var connection = mysql.createConnection(db_setting);
	connection.connect();

	var str = "SELECT * FROM  `QR` WHERE `token` = '" + token + "'";	
	connection.query(str, function (error, results, fields) {
	      connection.end();	
	      if (!error && (results.length)) {
		  cbk({success: true});
	      } else {
		  cbk({success: false});
	      }
	}); 
}
_f['AddUser'] = function(cbk) {
	var connection = mysql.createConnection(db_setting);
	connection.connect();

	var str = "SELECT * FROM  `QR` WHERE `token` = '" + token + "'";	
	connection.query(str, function (error, results, fields) {
	      connection.end();	
	      if (!error && (results.length)) {
		  cbk({success: true});
	      } else {
		  cbk({success: false});
	      }
	}); 
}
CP.serial(
  _f,
  function(data) {
      res.send({body:req.body, data: data});
  });  
