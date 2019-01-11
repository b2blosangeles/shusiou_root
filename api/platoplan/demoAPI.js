function write404(msg) {
	res.writeHead(404);
	res.write(msg);
	res.end();	
}

var list = [],
    dirn = env.root_path + '/demo_videos',
    fn = (req.query.fn) ? req.query.fn : 'HEATING_JACKET.mp4',
    file_video = dirn  + '/' +  fn,
    breakP = (req.query.breakP) ? req.query.breakP : 10,
    breakL = (req.query.breakL) ? req.query.breakL : 10;

var folderP = require(env.root_path + '/package/folderP/folderP');
    
var CP = new pkg.crowdProcess();
switch(req.query.code) {
	case 'videoByScript':
		var tmpfn = '/var/tmpp/script_' + fn;
		var tmp_plugOrg1 = '/var/tmpp/script_plugin1_' + breakP + 'L' + breakL + '_' + fn,
		    tmp_plugOrg2 = '/var/tmpp/script_plugin2_' + breakP + 'L' + breakL + '_' + fn,
		    tmp_combine = '/var/tmpp/script_combine_' + breakP + 'L' + breakL + '_' + fn + '.txt',
		    tmp_output = '/var/tmpp/script_combine_' + breakP + 'L' + breakL + '_' + fn;
	
		
		var CP = new pkg.crowdProcess();
		var _f = {};
		_f['fp'] = function(cbk) { 
			var fp = new folderP();
			fp.build('/var/tmpp/', function() { cbk(true);});
		};		
		_f['S0'] = function(cbk) {
			pkg.fs.stat(tmp_output, function(err, stat) {
				if(!err) { 
					CP.exit = 1;
					cbk(tmp_output);
				} else {
					cbk(true);
				}
			});
		};		
		_f['videoLength'] = function(cbk) {
			str = 'ffprobe -v error -show_entries format=duration \ ' + 
				'-of default=noprint_wrappers=1:nokey=1 ' + file_video + '';
			var childProcess = require('child_process');
			var ls = childProcess.exec(str, 		   
				function (error, stdout, stderr) {
					var videoLength = 0;
					try { videoLength = parseInt(stdout); } catch (e) {}
					cbk(parseInt(videoLength));
				});
		};
		_f['oraginA'] = function(cbk) {
			pkg.fs.stat(tmp_plugOrg1, function(err, stat) {
				if(!err) { cbk(tmp_plugOrg1);
				} else {
					var childProcess = require('child_process');
					var ls = childProcess.exec('ffmpeg  -i ' + file_video + ' -ss '+ 0 + ' -t ' + breakP + ' -c copy ' + tmp_plugOrg1 +' -y ', 		   
						function (error, stdout, stderr) {
							cbk(true);
						});
				}
			});
		};		
		_f['oraginB'] = function(cbk) {
			pkg.fs.stat(tmp_plugOrg2, function(err, stat) {
				if(!err) { cbk(tmp_plugOrg2);
				} else {
					var childProcess = require('child_process');
					var ss = parseInt(breakP) + parseInt(breakL)
					var t = parseInt(CP.data.videoLength) - ss;
					var ls = childProcess.exec('ffmpeg  -i ' + file_video + 
						' -ss ' + ss + ' -t ' + t + ' -c copy ' + tmp_plugOrg2 +' -y ', 		   
						function (error, stdout, stderr) {
							cbk(true);
						});
				}
			});
		};
		_f['batchFile'] = function(cbk) {
			var str = '';
			str +=  "file '" + tmp_plugOrg1.replace('/var/tmpp/', '') + "'\n";
			str +=  "file '" + tmp_plugOrg2.replace('/var/tmpp/', '') + "'\n";
			
			pkg.fs.writeFile(tmp_combine, str, function(err) {
				cbk(tmp_combine);
			}); 
		};	
		_f['output'] = function(cbk) {
			var childProcess = require('child_process');
			// var ls = childProcess.exec('ffmpeg -f concat -safe 0 -i ' + tmp_combine + ' -c copy ' + tmp_output + ' -y', 
			var ls = childProcess.exec('ffmpeg -f concat -safe 0 -i ' + tmp_combine + ' -c copy ' + tmp_output + ' -y',
				function (error, stdout, stderr) {
					cbk(true);
				});
		};		
		
		CP.serial(
			_f,
			function(data) {	
				pkg.fs.stat(tmp_output, function(err, data1) {
					if (err) {  write404(tmp_output + ' does not exist'); }
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
						    var file = pkg.fs.createReadStream(tmp_output, {start:start, end:end});
						    res.writeHead(206, {'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 
							'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
						       file.pipe(res);
						} else {
						    res.send('Need streaming player');
						}
					}
				});
			}, 6000);			
		
		break;
	case 'cutImage':		
		var s = (req.query.s) ? req.query.s : 10, 
		    w='FULL',
		    str = '';
		var tmpfn = '/var/tmpp/cut_' + s + '_' + fn + '.png';

		var CP = new pkg.crowdProcess();
		var _f = {};
		_f['fp'] = function(cbk) { 
			var fp = new folderP();
			fp.build('/var/tmpp/', function() { cbk(true);});
		};		
		_f['S2'] = function(cbk) {
			pkg.fs.stat(tmpfn, function(err, stat) {
				if(!err) { cbk(tmpfn);
				} else {
					if (w != 'FULL') str = 'ffmpeg -ss ' + s + ' -i ' + file_video +' -vf scale=-1:' +  w + '  -preset ultrafast ' + tmpfn + ' -y ';
					else str = 'ffmpeg -ss ' + s + ' -i ' + file_video +' -vframes 1 ' +  tmpfn + ' -y ';
					str = 'ffmpeg -ss ' + s + ' -i ' + file_video +' -vf scale="-1:100, pad=in_h*4/3:ih:(ow-iw)/2:color=#ccc"  -preset ultrafast ' + tmpfn + ' -y ';
					//ffmpeg -ss 10 -i d.mp4 -vf scale="-1:100,pad=in_h*4/3:ih:(ow-iw)/2"   -preset ultrafast d.png -y
					var childProcess = require('child_process');
					var ls = childProcess.exec(str, 		   
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
		    tmpfn = '/var/tmpp/sec_' + s + '_' + l + '_' + fn;

		var CP = new pkg.crowdProcess();
		var _f = {};
		_f['fp'] = function(cbk) { 
			var fp = new folderP();
			fp.build('/var/tmpp/', function() { cbk(true);});
		};		
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
