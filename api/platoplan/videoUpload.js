var folderP = require(env.root_path + '/package/folderP/folderP');
var Busboy = require(env.site_path + '/api/inc/busboy/node_modules/busboy');


switch(req.query.opt) {
   case 'postDataEnd':
 
         var videoPath = '/tmp/' + req.query.uuid + '/videos/';
         var tmpPath = '/tmp/' + req.query.uuid + '/tmp/' + req.query.vid + '/' + req.query.sec + '/' ;
      
          var CP = new pkg.crowdProcess();
         var _f = {};    
            pkg.fs.readdir(tmpPath, function(err, items) {
               items.sort(function(a, b) {
                  return parseInt(a) - parseInt(b);
                 });
               res.send('cd ' + tmpPath + ' && cat ' + items.join(' ') + ' > /tmp/tt.mp4');
             //  cat 1.txt 2.txt 3.txt > 0.txt
               
            });   
         break;
   case 'postData':

         var videoPath = '/tmp/' + req.query.uuid + '/videos/';
         var tmpPath = '/tmp/' + req.query.uuid + '/tmp/' + req.query.vid + '/' + req.query.sec + '/' ;
      
          var CP = new pkg.crowdProcess();
         var _f = {};     
         _f['videoPath'] = function(cbk) { 
              var fp = new folderP();
              fp.build( videoPath, function() { cbk(true);});
    
         };
         _f['tmpPath'] = function(cbk) { 
              var fp = new folderP();
              fp.build( tmpPath, function() { cbk(true);});
    
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
                   var writeStream = pkg.fs.createWriteStream(tmpPath + req.query.idx);
                   file.pipe(writeStream);
                   file.on('data', function(data) {});
                   file.on('end', function() {
                       cbk(filename + '---' + req.query.idx);
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

      break;     
   default:
      res.send('Wrong parameter')
}
