
var CP  = require(env.root_path + "/package/crowdProcess/crowdProcess.js");
var qr = require(env.root_path + "/vendor/qr-image/node_modules/qr-image/");

var code = qr.image("text to show in qr", { type: 'png', ec_level: 'H', size: 10, margin: 0 });
res.type('png');
code.pipe(res);

// res.send({success: true, codef: (!req.query.code) ? '' : req.query.code});
