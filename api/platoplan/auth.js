var Smarty = require(env.site_path + '/api/inc/jsmart/smart.min.js'); 
var crypto = require('crypto');

var token = (!req.query.code) ? '' : req.query.code;

var type = (['signin', 'registration', 'errorSignin', 'errorRegistration'].indexOf(req.query.type) === -1) ? null : req.query.type;
if (!type) {
  res.send('Wrong type!!');
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
	var s = Math.random().toString(36).substr(2, 16) + new Date().getTime();
	var key = crypto.createHash('md5').update(s).digest('hex');
	res.send(tpl.fetch({token : token, key : key, copywriteyear :  new Date().getYear()}));
	return true;
});
