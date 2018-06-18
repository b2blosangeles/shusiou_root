var mysql = require(env.site_path + '/api/inc/mysql/node_modules/mysql');
delete require.cache[env.config_path + '/config.json'];
var config = require(env.config_path + '/config.json');
var cfg0 = config.db;

let ip = req.body.ip, space = req.body.space, server_type = req.body.server_type,  server_type_str;

if (server_type === 'master') {
	server_type_str = '`cloud_master`';
} else if (server_type === 'comm') {
	server_type_str = '`cloud_comm`';
} else if  (server_type === 'node') {
	server_type_str = '`cloud_node`';
} else {
	res.send({error:'Missing server_type'});
	return true;
}

if (!ip) {
	res.send({error:'Missing ip'});
	return true;
} 

function isIp(ip) {
    var arrIp = ip.split(".");
    if (arrIp.length !== 4) return "Invalid IP";
    for (let oct of arrIp) {
        if ( isNaN(oct) || Number(oct) < 0 || Number(oct) > 255)
            return false;
    }
    return true;
}

var CP = new pkg.crowdProcess();
var _f = {};

if (isIp(ip)) {
	pkg.request({
		url: 'http://'+ip+'/checkip/',
		headers: {
		    "content-type": "application/json"
		},
		timeout: 2000
	    }, function (error, resp, body) { 
		if (error ||  ip !== body) {
			cbk(false);
		} else {
			var connection = mysql.createConnection(cfg0);
			connection.connect();
			var str = 'INSERT INTO ' + server_type_str +
			    ' (`ip`,`total_space`,`free_space`, `free`, `created`, `updated`, `score`) VALUES (' +
			    "'" + ip + "','" + space.total + "','" + space.free + "','" + space.free_rate + "',NOW(), NOW(), 1000)  " +
			    " ON DUPLICATE KEY UPDATE `updated` = NOW(), `total_space` = '" 
				+ space.total + "', `free_space` = '" + space.free + "', " +
				"`free` = '" + space.free_rate + "'; ";

			connection.query(str, function (error, results, fields) {
				connection.end();
				if (error) {
					res.send({status:'error', value:error.message});
				} else {
					res.send({status:'success', value:ip});
				}
			}); 
		}
	   });
} else {
	cbk(false);
}
