var mysql = require(env.site_path + '/api/inc/mysql/node_modules/mysql');
var config = require(env.config_path + '/config.json');
var db_setting = config.db;
db_setting.database = 'platoplan';

var CP  = require(env.root_path + "/package/crowdProcess/crowdProcess.js");
var qr = require(env.root_path + "/vendor/qr-image/node_modules/qr-image/");
var crypto = require('crypto');

var type = (['signin', 'registration'].indexOf(req.query.type) === -1) ? null : req.query.type;
if (!type) {
  res.send('Wrong type!!');
  return true;
}
var io = require(env.root_path + '/package/socket.io-client/node_modules/socket.io-client');
var socket = io.connect('http://dev.platoplan.com/');
socket.on('connect', function(){
	console.log('data-->');
	res.send('data-->A');
	return true;
	/*
				me.socket.emit('createRoom', room);
				me.socket.emit('clientData', {_room: room, 
						_link: cfg.link, _proxy: ((cfg.proxy) ? cfg.proxy : null),
						_requestID:me.requestID, data: data});
	*/
});
/* -------------
delete require.cache[env.root_path + '/package/socketNodeClient/socketNodeClient.js'];
var socketNodeClient = require(env.root_path + '/package/socketNodeClient/socketNodeClient.js');
var socketClient = new socketNodeClient(
	{link:'http://dev.platoplan.com/'}, 
	env);
socketClient.sendToRoom(
    'CNND',
    {x:new Date(), Y:90},
    function(data) {
	res.send('data-->');
    }
);
 -------------*/
//res.send({x:new Date(), Y:90});
return true;
var s = Math.random().toString(36).substr(2, 16) + new Date().getTime();
var uuid = req.query.uuid;
var hash = crypto.createHash('md5').update(s).digest('hex');

var connection = mysql.createConnection(db_setting);
connection.connect();

var str = "INSERT INTO `QR` (`uuid`, `token`, `created`) VALUES ('" + uuid + "', '" + hash + "', NOW()) " +
    " ON DUPLICATE KEY UPDATE `token` = '" + hash + "', `created` = NOW();";

connection.query(str, function (error, results, fields) {
      connection.end();	
      if (!error) {
          var code = qr.image('http://dev.platoplan.com/api/platoplan/auth.api?type=' + type + '&code=' + hash, 
                              { type: 'png', ec_level: 'H', size: 6, margin: 1 });
          res.type('png');
          code.pipe(res);

          return true;
      } else {
          res.send({succes: false, error: error.message});
      }
}); 

