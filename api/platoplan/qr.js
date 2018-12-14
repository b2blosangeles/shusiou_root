
var CP  = require(env.root_path + "/package/crowdProcess/crowdProcess.js");
var qr = require(env.root_path + "/vendor/qr-image/node_modules/qr-image/");
var crypto = require('crypto');
var hash = crypto.createHash('md5').update('string').digest('hex');
res.send(hash);
return true;
var code = qr.image("http://dev.platoplan.com/api/platoplan/auth.api?code=66547656", { type: 'png', ec_level: 'H', size: 10, margin: 1 });
res.type('png');
code.pipe(res);

// res.send({success: true, codef: (!req.query.code) ? '' : req.query.code});
