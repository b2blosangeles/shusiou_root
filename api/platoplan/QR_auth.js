
var CP  = require(env.root_path + "/package/crowdProcess/crowdProcess.js");
var qr = require(env.root_path + "/vendor/qr-image/node_modules/qr-image/");
var crypto = require('crypto');

var type = (['signin', 'registration'].indexOf(req.query.type) === -1) ? null : req.query.type;
if (!type) {
  res.send('Wrong type!!');
  return true;
}

var s = Math.random().toString(36).substr(2, 16) + new Date().getTime();
var hash = crypto.createHash('md5').update(s).digest('hex');

var code = qr.image('http://dev.platoplan.com/api/platoplan/auth.api?type=' + type + '&code=' + hash, 
                    { type: 'png', ec_level: 'H', size: 6, margin: 1 });
res.type('png');
code.pipe(res);
