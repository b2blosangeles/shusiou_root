console.log('bu niuyy');
console.log('---req.files.filename--->');
console.log(req.files);
var writeStream = pkg.fs.createWriteStream('/var/qalet/formal_demo_videos/outputp.mov');
req.pipe(writeStream);

var Busboy = require(env.site_path + '/api/inc/busboy/node_modules/busboy');
var busboy = new Busboy({ headers: req.headers });
req.pipe(busboy);

busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
     file.on('data', function(data) {
        console.log('coming.....');
      });
    file.on('end', function() {
      console.log('BBBkDD');
      res.send({success: true, code: (!req.query.code) ? '' : req.query.code});
    });
});

/*
req.on('end', function() {
  console.log('BBB');
});
*/
/*
req.on('data', function(data) {
console.log('AAA');
});*/
// req.on('end', function() {

//});

