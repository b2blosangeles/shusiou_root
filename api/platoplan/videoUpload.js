var folderP = require(env.root_path + '/package/folderP/folderP');

var Busboy = require(env.site_path + '/api/inc/busboy/node_modules/busboy');

var busboy = new Busboy({ headers: req.headers });

req.pipe(busboy);
var dirv = '/var/qalet/bmw_demo_videos/';

var videoName = new Date().getTime();

var CP = new pkg.crowdProcess();
var _f = {};
/*
_f['fp'] = function(cbk) { 
     var fp = new folderP();
     fp.build(dirv + 'uploaded/', function() { cbk(true);});
};
*/
_f['S1'] = function(cbk) {
     busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
         var writeStream = pkg.fs.createWriteStream('/tmp/' + filename);
         file.pipe(writeStream);
         file.on('data', function(data) {});
         file.on('end', function() {
               cbk(filename);
         });
         file.on('error', function(e) {
               cbk(e);
         });
     });
     busboy.on('error', function (err) {
         cbk(err);
     })     
};
/*
_f['S2'] = function(cbk) {
     var childProcess = require('child_process');
     var ls = childProcess.exec('ffmpeg -i ' + dirv + 'outputp.mov -vcodec copy -acodec copy ' + dirv + 'uploaded/' + videoName + '.mp4 -y',
          function (error, stdout, stderr) {
               cbk(true);
          });
};
*/

CP.serial(
     _f,
     function(data) {	
        if (data.status != "success") {
               res.send({success: false, message : data})
        } else {
               res.send({success: true, results: data, code: (!req.query.code) ? '' : req.query.code});
        }
     }, 30000);
