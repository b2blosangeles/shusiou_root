(function () { 
	var obj =  function (env, _dns, ns_ip) {
		
		this.ttl = 6;
		this.config = require(env.config_path + '/config.json');
		this.cfg0 = this.config.db;
		
		this.validateIPaddress = function (ip)  {
			let patt = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
			return (patt.test(ip)) ?  true : false;
  		}
		this.sendTypeNamedIP = function(type, name, key, db_env, req, res) {
			let me = this, k, tp = (type === 'master') ? 'm' : (type === 'node') ? 'n' : (type === 'comm') ? 'c' : '';
	
			if (['dev', 'qa', 'prod'].indexOf(db_env) === -1 || !tp) {
				res.end(); 
				return true;
			}
			 if (isNaN(key) || key === '0') { 
			 	res.end(); 
				return true;
			} else {
				k = parseInt(key) - 1;
			}
		
			if (!_dns[tp].list.length || (new Date().getTime() - _dns[tp].tm) > 60000 ) {
				var mysql = require(env.sites_path + '/root/api/inc/mysql/node_modules/mysql'),
				config = require(env.config_path + '/config.json'),
				cfg0 = config.db;
				cfg0.database = (db_env === 'prod') ? 'shusiou' : ('shusiou_' +  db_env);
				let ips = [];
				var str = 'SELECT `ip` from `cloud_' + type + '` WHERE `score` < 900 ORDER BY `ip` ASC ';
				var connection = mysql.createConnection(cfg0);
				connection.connect();
				connection.query(str, function (error, results, fields) {
					connection.end();
					if (error) {
						return true;
					} else {
						if (results) {
							for (var i = 0; i < results.length; i++) {
								ips[ips.length] =  results[i].ip;
							}
						} else {
						}

					}
					_dns[tp].list = ips;
					_dns[tp].tm = new Date().getTime();
					me.send([{ 
						name: name,
						type: 'A',
						class: 'IN',
						ttl: me.ttl,
						data: ips[k]
					}], req, res);
				});
			} else {
				me.send([{ 
					name: name,
					type: 'A',
					class: 'IN',
					ttl: me.ttl,
					data: _dns[tp].list[k]
				}], req, res);			
			}
		};
		this.send = function(v, req, res) {
			let me = this;
			v.data =  (me.validateIPaddress(v.data)) ? v.data : null;
			res.answer = v;	
			res.end();
		};
		
		this.sendRecord = function(req, res) {
			let me = this;
			if (!_dns.dns.DNS || (new Date().getTime() - _dns.dns.tm) > 60000 ) {
				_dns.dns.DNS = {};
				var mysql = require(env.sites_path + '/root/api/inc/mysql/node_modules/mysql'),
				config = require(env.config_path + '/config.json'),
				cfg0 = config.db;
				cfg0.database = 'shusiou';
				var str = 'SELECT `ip`, `name` from `DNS` WHERE 1';
				var connection = mysql.createConnection(cfg0);
				connection.connect();
				connection.query(str, function (error, results, fields) {
					connection.end();
					if (error) {
						return true;
					} else {
						if (results) {
							for (var i = 0; i < results.length; i++) {
								if (me.validateIPaddress(results[i].ip)) {
									_dns.dns.DNS[results[i].name] =  results[i].ip;
								}	
							}
						}
						me.mapping(req, res);
						_dns.dns.tm = new Date().getTime();
					}
				});			
			} else {
				me.mapping(req, res);
				_dns.dns.tm = new Date().getTime();
			}
		};
		this.mapping = function(req, res) {
			let me = this, question = req.question[0], 
			    patt = {
				    ip: /^IP\_([0-9\_]+)\.([a-z0-9]+)\.([a-z0-9]+)$/ig,
				    type:/^(node|master|comm)([0-9]+)\_(qa|dev|prod)\.([a-z0-9]+)\.([a-z0-9]+)$/ig,
				    db:/^db\.([a-z0-9]+)\.([a-z0-9]+)$/ig,
				    dns:/^(dev[0-9]+\.|dev\.|qa[0-9]+\.|qa\.|www\.|)([a-z0-9]+)\.([a-z0-9]+)$/ig
			    },	    
			    mh = '', m;			
			
			for (var key in patt) {
				if (patt[key].test(question.name)) {
					mh = key;
					break;
				}
			}
			switch (mh) {
				case 'ip': 
					m = new RegExp(patt[mh]).exec(question.name);
					let ip = m[1].replace(/\_/ig, '.');
					me.send([{ 
						name: question.name,
						type: 'A',
						class: 'IN',
						ttl: me.ttl,
						data: ip
					}], req, res);
					break;
				case 'type':
					m = new RegExp(patt[mh]).exec(question.name);
					me.sendTypeNamedIP(m[1], question.name, m[2], m[3], req, res);
					break;
				case 'dns': 
					me.send([{ 
						name: question.name,
						type: 'A',
						class: 'IN',
						ttl: me.ttl,
						data: (_dns.dns.DNS[question.name]) ? _dns.dns.DNS[question.name] : null
					}], req, res);				
					break;	
				case 'db': 
					me.send([{ 
						name: question.name,
						type: 'A',
						class: 'IN',
						ttl: me.ttl,
						data: me.cfg0.host
					}], req, res);				
					break;					
				default:
					me.send([{ 
						name: question.name,
						type: 'A',
						class: 'IN',
						ttl: me.ttl,
						data:  null
					}], req, res);	
			}
		};	
	};
	module.exports = obj;
})();
// '192.241.135.143'
