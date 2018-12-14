
var CP  = require(env.root_path + "/package/crowdProcess/crowdProcess.js");
var qr = require(env.root_path + "/vendor/qr-image/node_modules/qr-image/");

var code = qr.image("http://dev.platoplan.com/api/sz.api?code=1234", { type: 'png', ec_level: 'H', size: 15, margin: 1 });
res.type('png');
code.pipe(res);

// res.send({success: true, codef: (!req.query.code) ? '' : req.query.code});
