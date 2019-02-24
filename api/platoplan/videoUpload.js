var folderP = require(env.root_path + '/package/folderP/folderP');
var Busboy = require(env.site_path + '/api/inc/busboy/node_modules/busboy');
var dirv = '/var/qalet/bmw_demo_videos/';

var videoName = new Date().getTime();
var CP = new pkg.crowdProcess();
var _f = {};

_f['fp'] = function(cbk) { 
   //  var fp = new folderP();
   //  fp.build(dirv + 'uploaded/', function() { cbk(true);});
     cbk(req);
};

_f['S1'] = function(cbk) {
      if (req.method !== 'POST') {
         cbk(false);
         return true
      }
     var busboy = new Busboy({ headers: req.headers });
     req.pipe(busboy); 
     var existFile = false;
     busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
          existFile = true;
          var writeStream = pkg.fs.createWriteStream('/tmp/video.mp4');
          file.pipe(writeStream);
          file.on('data', function(data) {});
          file.on('end', function() {
              cbk(filename);
          });      
          file.on('error', function(e) {
               cbk('A-false');
          });   
    });
   /*
    busboy.on('finish', function() {
       setTimeout(function() {
               if (!existFile) cbk('B-false');
          }, 1000);
    });
    */
    req.on("error", function (err) {
         cbk('C-false');
     }); 
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
       // res.set("Connection", "close");
        if (data.status != "success") {
               res.send({success: false, message : data})
        } else {
               res.send({success: true, results: data, code: (!req.query.code) ? '' : req.query.code});
        }
        
     //   res.end();
     },60000);
