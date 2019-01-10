function write404(msg) {
	res.writeHead(404);
	res.write(msg);
	res.end();	
}
var CP = new pkg.crowdProcess();
var folderP = require(env.root_path + '/package/folderP/folderP');
var dirn = env.root_path + '/demo_videos/', 
    dirn_formal = env.root_path + '/formal_demo_videos/';

switch(req.query.code) {
	case 'clean':	
		var str = 'cd ' + dirn_formal + ' && rm -fr *.*';
		var childProcess = require('child_process');
		var ls = childProcess.exec(str, 		   
			function (error, stdout, stderr) {
				res.send(dirn_formal + ' Cleaned');
			});
		break;
	case 'playVideo' :
		var file_video = dirn_formal + ((req.query.fn) ? req.query.fn : 'HEATING_JACKET.mp4');
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
	default :
		var _f = {};

		_f['fp'] = function(cbk) { 
			var fp = new folderP();
			fp.build(dirn_formal, function() { 
				cbk(true);
			});
		};	
		_f['ORG'] = function(cbk) {
			var list = [];
			pkg.fs.readdir(dirn, (err, files) => {
				files.forEach(file => {
					if (/\.mp4$/.test(file)) {
						list.push(file);
					}

				});
				cbk(list);
			});	
		}
		_f['TAG'] = function(cbk) {
			var list = {};
			pkg.fs.readdir(dirn_formal, (err, files) => {
				files.forEach(file => {
					if (/\.mp4$/.test(file)) {
						list[file] = 1;
					}
				});
				cbk(list);
			});	
		}
		CP.serial(
			_f,
			function(data) {	
				res.send(data);
			}, 60000);		
		
}
