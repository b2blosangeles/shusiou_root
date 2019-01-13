console.log('bu niuyy');
console.log('---req.files.filename--->');
console.log(req.files.filename);
var writeStream = pkg.fs.createWriteStream('/var/qalet/formal_demo_videos/outputp.mov');
req.pipe(writeStream);
/*
req.on('end', function() {
  console.log('BBB');
});
*/
/*
req.on('data', function(data) {
console.log('AAA');
});*/
req.on('end', function() {
  console.log('BBBk');
  res.send({success: true, code: (!req.query.code) ? '' : req.query.code});
});

