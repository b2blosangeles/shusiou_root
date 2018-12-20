var Smarty = require(env.site_path + '/api/inc/jsmart/smart.min.js'); 
var crypto = require('crypto');

var mysql = require(env.site_path + '/api/inc/mysql/node_modules/mysql');
var config = require(env.config_path + '/config.json');
var db_setting = config.db;
db_setting.database = 'platoplan';

var token = (!req.query.code) ? '' : req.query.code;
var type = (['signin', 'registration', 'errorSignin', 'errorRegistration'].indexOf(req.query.type) === -1) ? null : req.query.type;
if (!type) {
  res.send('Wrong type!!');
  return true;
}


var CP = new pkg.crowdProcess();

var _f = {};
_f['DBS'] = function(cbk) {
	var connection = mysql.createConnection(db_setting);
	connection.connect();

	var str = "SELECT * FROM  `session` WHERE `token` = '" + token + "'";	
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
	 if (!CP.data.DBS.success) {
		var indextpl = env.site_path + '/api/platoplan/tpl/qrError.html';
		 pkg.fs.readFile(indextpl, 'utf-8', function(err, content) {	
			var tpl = new Smarty(content);
			res.send(tpl.fetch({copywriteyear :  new Date().getFullYear()}));
			return true;
		});
	 } else {
		var indextpl = env.site_path + '/api/platoplan/tpl/' + 
		    ((type === 'errorSignin' || type === 'errorRegistration') ? 'error'  : type) + 
		    '.html';

		pkg.fs.readFile(indextpl, 'utf-8', function(err, content) {	
			var tpl = new Smarty(content);
			if (type === 'errorSignin') {
				res.send(tpl.fetch({message : 'This equipment has not been registrated yet! Please go ahead registration with this mobile equipment.'}));
				return true
			}
			if (type === 'errorRegistration') {
				res.send(tpl.fetch({message : 'This equipment have registrated already. you are able to login with this phone.'}));
				return true
			}	
			res.send(tpl.fetch({token : token, copywriteyear :  new Date().getFullYear()}));
			return true;
		});
	 }
  },
  30000
);
// res.send(req.query);
return true;




if (req.body.token) {
	res.send(req.body);
	return true;
}

var indextpl = env.site_path + '/api/platoplan/tpl/' + 
    ((type === 'errorSignin' || type === 'errorRegistration') ? 'error'  : type) + 
    '.html';

pkg.fs.readFile(indextpl, 'utf-8', function(err, content) {	
	var tpl = new Smarty(content);
	if (type === 'errorSignin') {
		res.send(tpl.fetch({message : 'This equipment has not been registrated yet! Please go ahead registration with this mobile equipment.'}));
		return true
	}
	if (type === 'errorRegistration') {
		res.send(tpl.fetch({message : 'This equipment have registrated already. you are able to login with this phone.'}));
		return true
	}	
	res.send(tpl.fetch({token : token, copywriteyear :  new Date().getFullYear()}));
	return true;
});
