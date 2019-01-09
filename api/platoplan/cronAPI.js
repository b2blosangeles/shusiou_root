function write404(msg) {
	res.writeHead(404);
	res.write(msg);
	res.end();	
}

var CP = new pkg.crowdProcess();
var folderP = require(env.root_path + '/package/folderP/folderP');
var dirn = env.root_path + '/demo_videos', 
    dirn_formal = env.root_path + '/formal_demo_videos';

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

CP.serial(
	_f,
	function(data) {	
		res.send(data);
	}, 60000);	


