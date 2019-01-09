var CP = new pkg.crowdProcess();
var folderP = require(env.root_path + '/package/folderP/folderP');
var dirn = env.root_path + '/demo_videos', dirn_formal = env.root_path + '/formal_demo_videos',

var _f = {};

_f['fp'] = function(cbk) { 
  var fp = new folderP();
  fp.build(dirn_formal, function() { cbk(true);});
};	
f['ORG'] = function(cbk) {
  pkg.fs.readdir(dirn, (err, files) => {
      files.forEach(file => {
    if (/\.mp4$/.test(file)) {
        list.push(file);
    }
      });
      cbk(list);
  });	
}
f['TAG'] = function(cbk) {
  pkg.fs.readdir(dirn_formal, (err, files) => {
      files.forEach(file => {
    if (/\.mp4$/.test(file)) {
        list.push(file);
    }
      });
      cbk(list);
  });	
}
CP.serial(
  _f,
  function(data) {	
    pkg.fs.stat(tmp_output, function(err, data) {
            res.send(data);
    });
  }, 60000);	

function write404(msg) {
	res.writeHead(404);
	res.write(msg);
	res.end();	
}
