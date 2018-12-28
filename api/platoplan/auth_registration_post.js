var token = (!req.body.token) ? '' : req.body.token;
var CP = new pkg.crowdProcess();
var mysql = require(env.site_path + '/api/inc/mysql/node_modules/mysql');
var config = require(env.config_path + '/config.json');
var db_setting = config.db;
db_setting.database = 'platoplan';

var crypto = require('crypto');

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
	if (!CP.data.DBS) {
		cbk({success: false});
		return true;
	}
	var connection = mysql.createConnection(db_setting);
	connection.connect();
	var s = Math.random().toString(36).substr(2, 16) + new Date().getTime();
	
	var Email = req.body.Email,  
	    UserName = req.body.UserName,
	    Password = crypto.createHash('md5').update(s).digest('hex');
	
	var str = "INSERT INTO  `user` (`username`, `email`, `password`) " + 
	    " VALUES ('" + UserName + "','" + Email + "','" + Password + "')";	
	
	connection.query(str, function (error, results, fields) {
	      connection.end();	
	      if (!error) {
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
