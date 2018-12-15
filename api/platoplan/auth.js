var Smarty = require(env.site_path + '/api/inc/jsmart/smart.min.js'); 
// res.send({success: true, code: (!req.query.code) ? '' : req.query.code});

var indextpl = env.site_path + '/api/platoplan/tpl/index.tpl';

pkg.fs.readFile(indextpl, 'utf-8', function(err, content) {	
			var tpl = new Smarty(content);
			res.send(tpl.fetch({}));
			return true;
	});
