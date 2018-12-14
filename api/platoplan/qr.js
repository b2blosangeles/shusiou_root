
var CP  = require(env.root_path + "/package/crowdProcess/crowdProcess.js");
var qr = require(env.root_path + "/vendor/qr-image");
res.send({success: true, codef: (!req.query.code) ? '' : req.query.code});
