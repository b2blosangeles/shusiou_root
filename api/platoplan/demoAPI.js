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
		var tmpfn = '/tmp/script_' + fn;

		var CP = new pkg.crowdProcess();
		var _f = {};		
		_f['S2'] = function(cbk) {
			pkg.fs.stat(tmpfn, function(err, stat) {
				if(!err) { cbk(tmpfn);
				} else {
					str = 'ffprobe -v error -show_entries format=duration \ ' + 
  						'-of default=noprint_wrappers=1:nokey=1 ' + file_video + '';
					var childProcess = require('child_process');
					var ls = childProcess.exec(str, 		   
					function (error, stdout, stderr) {
						cbk(parseInt(stdout));
					});
				}
			});
		};
		CP.serial(
			_f,
			function(data) {
				res.send(data);
			}, 3000);			
		
		break;
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
	case 'playSection':
		var l = (req.query.l) ? req.query.l : 10, 
		    s = (req.query.s) ? req.query.s : 10,
		    tmpfn = '/tmp/sec_' + s + '_' + l + '_' + fn;

		var CP = new pkg.crowdProcess();
		var _f = {};
		_f['S2'] = function(cbk) {

			pkg.fs.stat(tmpfn, function(err, stat) {
				if(!err) { cbk(fn);
				} else {
					var childProcess = require('child_process');
					var ls = childProcess.exec('ffmpeg  -i ' + file_video + ' -ss '+ s + ' -t ' + l + ' -c copy ' + tmpfn +' -y ', 		   
						function (error, stdout, stderr) {
							cbk(true);
						});
				}
			});
		};
		CP.serial(
			_f,
			function(data) {
				pkg.fs.stat(tmpfn, function(err, data1) {
					if (err) {  write404(tmpfn + ' does not exist'); }
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
						    var file = pkg.fs.createReadStream(tmpfn, {start:start, end:end});
						    res.writeHead(206, {'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 
							'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
						       file.pipe(res);
						} else {
						    res.send('Need streaming player');
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
