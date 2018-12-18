var Smarty = require(env.site_path + '/api/inc/jsmart/smart.min.js'); 
var crypto = require('crypto');

var token = (!req.query.code) ? '' : req.query.code;
var indextpl = env.site_path + '/api/platoplan/tpl/login.html';

var s = Math.random().toString(36).substr(2, 16) + new Date().getTime();
var key = crypto.createHash('md5').update(s).digest('hex');

pkg.fs.readFile(indextpl, 'utf-8', function(err, content) {	
			var tpl = new Smarty(content);
			res.send(tpl.fetch({token : token, key : key}));
			return true;
	});
