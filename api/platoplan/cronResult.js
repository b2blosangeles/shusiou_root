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
		var str = 'cd ' + dirn_formal + ' && rm *.*';
		var childProcess = require('child_process');
		var ls = childProcess.exec(str, 		   
			function (error, stdout, stderr) {
				res.send(dirn_formal + ' Cleaned');
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
