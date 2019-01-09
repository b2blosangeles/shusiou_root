function write404(msg) {
	res.writeHead(404);
	res.write(msg);
	res.end();	
}

var CP = new pkg.crowdProcess();
var folderP = require(env.root_path + '/package/folderP/folderP');
var dirn = env.root_path + '/demo_videos/', 
    dirn_formal = env.root_path + '/formal_demo_videos/';

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
_f['REORG'] = function(cbk) {
	var listORG = CP.data.ORG,
	    listTAG = CP.data.TAG;
	
	for (var i=0; i < listORG.length; i++) {
		if (!listTAG[listORG[i]]) {
			cbk(listORG[i]);
			return true;
		}
	}
	cbk(false);
}
_f['TRANSFER'] = function(cbk) {
	var fn = CP.data.REORG;
	if (!fn) {
		cbk(false);
		return true;
	}
	
	var str = 'ffmpeg -i ' + dirn + fn + 
	    	' -c:v libx264 -r 60 -c:a aac -ar 44100 -b:a 160k -af "pan=stereo|c0=c0|c1=c0" -strict experimental -f mpegts ' +
		' ' + dirn_formal + fn + ' -y';
	
	var childProcess = require('child_process');
	var ls = childProcess.exec(str, 		   
		function (error, stdout, stderr) {
			cbk(true);
		});
}
CP.serial(
	_f,
	function(data) {	
		res.send(data);
	}, 60000);	


