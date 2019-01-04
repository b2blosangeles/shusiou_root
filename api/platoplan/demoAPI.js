function write404(msg) {
	res.writeHead(404);
	res.write(msg);
	res.end();	
}

var list = [],
    dirn = env.root_path + '/demo_videos',
    fn = (req.query.fn) ? req.query.fn : 'HEATING_JACKET.mp4',
    file_video = dirn  + '/' +  fn;

var CP = new pkg.crowdProcess();



switch(req.query.code) {
	case 'videoByScript':
		res.send('videoByScript');
		return true;
	case 'cutImage':		
		var s = (req.query.s) ? req.query.s : 10, 
		    w='FULL';
		var tmpfn = '/tmp/cut_' + s + '_' + fn + '.png';

		var CP = new pkg.crowdProcess();
		var _f = {};		
		_f['S2'] = function(cbk) {
			pkg.fs.stat(tmpfn, function(err, stat) {
				if(!err) { cbk(tmpfn);
				} else {
					if (w != 'FULL') s = 'ffmpeg -ss ' + s + ' -i ' + file_video +' -vf scale=-1:' +  w + '  -preset ultrafast ' + tmpfn + ' -y ';
					else s = 'ffmpeg -ss ' + s + ' -i ' + file_video +' -vframes 1 ' +  tmpfn + ' -y ';
					var childProcess = require('child_process');
					var ls = childProcess.exec(s, 		   
					function (error, stdout, stderr) {
						cbk(true);
					});
				}
			});
		};
		CP.serial(
			_f,
			function(data) {
				res.sendFile(tmpfn);
			}, 3000);			
		
		break;
	case 'videoSection':
		var CP = new pkg.crowdProcess();
		var _f = {};		
		_f['S2'] = function(cbk) {
			cbk(true);
			return true;
			pkg.fs.stat(fn, function(err, stat) {
				if(!err) { cbk(fn);
				} else {
					if (w != 'FULL') s = 'ffmpeg -ss ' + s + ' -i ' + file_video +' -vf scale=-1:' +  w + '  -preset ultrafast ' + fn + ' -y ';
					else s = 'ffmpeg -ss ' + s + ' -i ' + file_video +' -vframes 1 ' +  fn + ' -y ';
					var childProcess = require('child_process');
					var ls = childProcess.exec(s, 		   
					function (error, stdout, stderr) {
						cbk(true);
					});
				}
			});
		};
		CP.serial(
			_f,
			function(data) {
				res.send('videoSection');
			}, 3000);			
		
		break;	
	case 'playSection':
		ers.send('==playSection==');
		return true;
		var l = req.query['l'], s = req.query['s'];
		if (!s || !l) { write404('wrong s or l'); return true; }
		var fn = folder_section + s + '_' + l + '.mp4';

		var CP = new pkg.crowdProcess();
		var _f = {};
		
		_f['S0'] = function(cbk) { 
			pkg.fs.stat(mnt_folder, function (err, stats){
				if (err) { cbk({status:'failure', message:err.message});  CP.exit = 1; }
				else if (!stats.isDirectory()){ cbk({status:'failure', message:err.message});  CP.exit = 1; }
				else {
				      pkg.fs.stat(file_video, function(err, stat) {
					 if(err) { cbk({status:'failure', message:err.message});  CP.exit = 1; }
					 else cbk(true);
				      });
				}
			});
		};		
		
		_f['S1'] = function(cbk) { 
			var fp = new folderP();
			fp.build(folder_section, function() { cbk(true);});
		};

		_f['S2'] = function(cbk) {

			pkg.fs.stat(fn, function(err, stat) {
				if(!err) { cbk(fn);
				} else {
					var childProcess = require('child_process');
					var ls = childProcess.exec('ffmpeg  -i ' + file_video + ' -ss '+ s + ' -t ' + l + ' -c copy ' + fn +' -y ', 		   
						function (error, stdout, stderr) {
							cbk(true);
						});
				}
			});
		};
		CP.serial(
			_f,
			function(data) {
				if (CP.data.S0 !== true) {
					res.send(CP.data.S0);
					return true;
				}				
				pkg.fs.stat(fn, function(err, data1) {
					if (err) {  write404(fn + ' does not exist'); }
					else {
						if (cache_only)	{
							var file = pkg.fs.createReadStream(fn);
							file.pipe(res);
							var t = new Date().getTime();
							var mysql = require(env.site_path + '/api/inc/mysql/node_modules/mysql'),
							cfg0 =  config.db;
							var had_error = '';
							file.on('error', function(err){
								had_error = '1';
							});

							file.on('close', function(){
								var connection = mysql.createConnection(cfg0);
								connection.connect();
								var running_time = new Date().getTime() - t;
								var str = "INSERT INTO `master_node_log` (`type`, `url`, `is_error`, `running_time`, `finished`) VALUES "+    
								 " ('" + 'section' + "', '" + req.url + "', '" + had_error + "', '" + running_time + "', NOW()) ";
								connection.query(str, function (error, results, fields) {
									connection.end();	
								}); 									
							});							
						} else {
							var total = data1.size;
							var range = req.headers.range;
							if (range) {
								var parts = range.replace(/bytes=/, "").split("-");
								var partialstart = parts[0]; var partialend;
								  partialend =  parts[1];
								var start = parseInt(partialstart, 10);
								var end = partialend ? parseInt(partialend, 10) : total-1;
								var chunksize = (end-start)+1;
								var file = pkg.fs.createReadStream(fn, {start:start, end:end});
								res.writeHead(206, {'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 
									'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
							       file.pipe(res);
							} else {
								res.send('Need streaming player');
							}
						}	
					}
				});
			},
			30000
		);    
		break;		
	case 'videoList' :
		pkg.fs.readdir(dirn, (err, files) => {
		    files.forEach(file => {
			if (/\.mp4$/.test(file)) {
			    list.push(file);
			}
		    });
		    res.send(list);
		});		
		break;
	case 'playVideo' :		
		pkg.fs.stat(file_video, function(err, data1) {
			if (err) {  write404(file_video + ' does not exist'); }
			else {
				var total = data1.size;
				var range = req.headers.range;
				if (range) {
				    var parts = range.replace(/bytes=/, "").split("-");
				    var partialstart = parts[0]; var partialend;
				      partialend =  parts[1];
				    var start = parseInt(partialstart, 10);
				    var end = partialend ? parseInt(partialend, 10) : total-1;
				    var chunksize = (end-start)+1;
				    var file = pkg.fs.createReadStream(file_video, {start:start, end:end});
				    res.writeHead(206, {'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 
					'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
				       file.pipe(res);
				} else {
				    res.send('Need streaming player');
				}
			}
		});
		break;
	default:
		 write404('type error'); 		
}
