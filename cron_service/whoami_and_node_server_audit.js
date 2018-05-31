/* --- code for cron watch ---*/
delete require.cache[__dirname + '/watch_cron.inc.js'];
let watch_cron_inc = require(__dirname + '/watch_cron.inc.js'),
    watchCron = new watch_cron_inc(__filename);
watchCron.load('root', 60);

/* --- code for audit ---*/

let path = require('path'), 
    env = {root_path:path.join(__dirname, '../../..'), config_path:  '/var/qalet_config'};   
env.site_path = env.root_path + '/sites/root';
let config = require(env.config_path + '/config.json');
let mysql = require(env.site_path + '/api/inc/mysql/node_modules/mysql'),
    cfg0 = config.db;

/* -------------*/

delete require.cache[env.root_path + '/sites/master/api/inc/socketNodeClient/socketNodeClient.js'];
var socketNodeClient = require(env.root_path + '/sites/master/api/inc/socketNodeClient/socketNodeClient.js');
var socketClient = new socketNodeClient('https://' + config.root + '/');

socketClient.sendToRoom(
    'VID_NIU',
    {x:new Date(), Y:70},
    function(data) {
	// res.send(data);
    }
);

/* -------------*/


var crowdProcess =  require(env.root_path + '/package/crowdProcess/crowdProcess');
var request = require(env.root_path + '/package/request/node_modules/request');	

// console.log('--config.auto_git_pull-->');
// console.log(config.auto_git_pull);

function randomInt(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}
function pullRule() {
	return true;
	let rule = { dev:1, qa:9, prod:13 },
	    m = new Date().getMinutes(),
	    t =  rule[config.environment];
	return  (m % t === 0)? true : false;
}

var CP = new crowdProcess();
var _f = {};

_f['root_server'] = function(cbk) {
	if (!pullRule()) { cbk(false); return true; }	
	var exec = require('child_process').exec;
	var LOG = require(env.root_path + '/package/log/log.js');
	var log = new LOG();

	var cmd = 'cd ' + env.site_path + ' && git pull && cd ' + env.root_path + ' && git pull && cd ' +  env.config_path + ' && git pull';
	exec(cmd, function(error, stdout, stderr) {
		cbk(stdout);
	});	
}

/// get remote server list 

_f['servers'] = function(cbk) {
	let connection = mysql.createConnection(cfg0)
	connection.connect();
	let str = "SELECT `ip` IP, `audit`, 'node' TP FROM `cloud_node` UNION SELECT `ip` IP,  `audit`, 'master' TP FROM `cloud_master`";
	connection.query(str, function (error, results, fields) {
		connection.end();
		var list = [];
		if (!error) {
			for (o in results) {
				list.push({ip:results[o].IP, tp:results[o].TP, audit:((results[o].audit) ? results[o].audit : '')});
			}	
		}
		// console.log(list);
		if (!list.length) {
			CP.exit = 1;
		}
		cbk(list);
	});	
}	
// scan remote servers 
_f['scan_server_status'] = function(cbk) {
	let list = CP.data.servers,
	    CP1 = new crowdProcess(), 
	    _f1 = {}	
	for (var i in list) {
		_f1['P_'+i] = (function(i) {
			return function(cbk1) {
				var ip = list[i].ip;
				request({
					url: 'http://'+ list[i].ip +'/api/node_audit.api?_route=' + list[i].tp + 
					((config.auto_git_pull)? '&auto_git_pull=1' : '') + '&opt=status',
					headers: {
					    "content-type": "application/json"
					},
					timeout: 10000
				    }, function (error, resp, body) { 
					var changeStatus = function(mark, space, cbk) {
						var a = [], audit = [], score = 0;
						try { if (list[i].audit) a = JSON.parse(list[i].audit); } catch(e) {}
		
						if (mark) audit[audit.length] = 1;
						else audit[audit.length] = 0;

						for (var j=0; j< a.length; j++) {
							if (j < 5) audit[audit.length] = a[j];
							else break;
						}
						for (var j=0; j < audit.length; j++) {
							if (audit[j]) score += Math.floor(Math.pow(10 - (j * 1), 8) * 0.00001);
						} 
						var connection = mysql.createConnection(cfg0);
						connection.connect();
						
						let server_type_str;
						if (list[i].tp === 'master') {
							server_type_str = '`cloud_master`';
						} else if  (list[i].tp === 'node') {
							server_type_str = '`cloud_node`';
						} else {
							cbk(false);
							return true;
						}
						if (space === false) {
							var str = "UPDATE `cloud_node` SET `audit` = '" + JSON.stringify(audit) + 
						   	 "', `score` = '" + score + "', `updated` = NOW() WHERE `node_ip` = '" + ip + "'";
						} else {
							var str = "UPDATE " + server_type_str + " SET `audit` = '" + JSON.stringify(audit) + 
							 "', `score` = '" + score + "'," +
							 "`total_space` = '" + space.total + "'," +
							 "`free_space` = '" + space.free + "'," +
							 "`free` = '" + space.free_rate + "'," +
							 "`updated` = NOW() " +    
							 " WHERE `ip` = '" + list[i].ip + "'";
						}
						connection.query(str, function (err, results, fields) {
							connection.end();
							if (err) {
								cbk(err.message);
							} else {
								cbk(list[i].ip + ' updated.');
							}
						});
					}
					
					if (error) {
						changeStatus(true, false, cbk1);
					} else {
						var v = {};
						try { v = JSON.parse(body); } catch(e) {}
						if (v.ip === list[i].ip) changeStatus(false, v.space, cbk1);
						else changeStatus(true, false, cbk1);
					}
				   });	
			}
		})(i)	
	}	
	CP1.parallel(
		_f1,
		function(data) {
			cbk(JSON.stringify(data));
		}, 25000
	);		
}

CP.serial(
	_f,
	function(data) {
		//console.log(data);
		process.stdout.write(JSON.stringify(data.results));		
	}, 30000
);

