console.log('bu niuyy');

var writeStream = pkg.fs.createWriteStream('/tmp/outputp.mp4');
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

