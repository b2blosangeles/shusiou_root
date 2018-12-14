
var CP  = require(env.root_path + "/package/crowdProcess/crowdProcess.js");
res.send({success: true, codee: (!req.query.code) ? '' : req.query.code});
