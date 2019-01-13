var writeStream = pkg.fs.createWriteStream('/var/qalet/formal_demo_videos/outputp.mov');
var Busboy = require(env.site_path + '/api/inc/busboy/node_modules/busboy');
var busboy = new Busboy({ headers: req.headers });
req.pipe(busboy);

var CP = new pkg.crowdProcess();
var _f = {};
_f['S1'] = function(cbk) {
     busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
          file.pipe(writeStream);
          file.on('data', function(data) {});
         file.on('end', function() {
               cbk(true);
         });
     });
};

_f['S2'] = function(cbk) {
     var childProcess = require('child_process');
     var ls = childProcess.exec('ffmpeg -i /var/qalet/formal_demo_videos/outputp.mov -vcodec copy -acodec copy /var/qalet/formal_demo_videos/ooutputp.mp4 -y',
          function (error, stdout, stderr) {
               cbk(true);
          });
};

CP.serial(
     _f,
     function(data) {	
         res.send({success: true, code: (!req.query.code) ? '' : req.query.code});
     }, 300000);

