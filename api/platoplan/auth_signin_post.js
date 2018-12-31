var token = (!req.body.token) ? '' : req.body.token;
var auth = (!req.body.auth) ? '' : req.body.auth;
var CP = new pkg.crowdProcess();

var Smarty = require(env.site_path + '/api/inc/jsmart/smart.min.js'); 
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
_f['LoginUser'] = function(cbk) {
	if (!CP.data.DBS) {
		cbk({success: false});
		return true;
	}
	var connection = mysql.createConnection(db_setting);
	connection.connect();
	
	var str = "SELECT * FROM  `user` WHERE `password` = '" + auth + "'";	
	
	connection.query(str, function (error, results, fields) {
	      connection.end();	
	      if (!error) {
		  cbk({success: true, data : results});
	      } else {
		  cbk({success: false});
	      }
	}); 
}
/*
_f['CLEANQR'] = function(cbk) {
	if (!CP.data.LoginUser) {
		cbk({success: false});
		return true;
	}	
	var connection = mysql.createConnection(db_setting);
	connection.connect();

	var str = "DELETE FROM  `QR` WHERE `token` = '" + token + "'";	
	connection.query(str, function (error, results, fields) {
	      connection.end();	
	      if (!error && (results.length)) {
		  cbk({success: true});
	      } else {
		  cbk({success: false});
	      }
	}); 
}
*/
CP.serial(
  _f,
  function(data) {
	  if ((CP.data.LoginUser.success) && (CP.data.LoginUser.data) && (CP.data.LoginUser.data[0])) {
		var indextpl = env.site_path + '/api/platoplan/tpl/afterLogin.html';
		  res.send(indextpl);
		  return true;
		pkg.fs.readFile(indextpl, 'utf-8', function(err, content) {	
			var tpl = new Smarty(content);
			res.send(tpl.fetch(CP.data.LoginUser.data[0]));
			return true;
		});
	  } else {
	  	res.send('Sign in error!!');
	  }
	  return true;     
  });  
