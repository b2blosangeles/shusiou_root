console.log('bu niuyy');
req.on('data', function(data) {
console.log('AAA');
});
req.on('end', function() {
  console.log('BBB');
});
res.send({success: true, code: (!req.query.code) ? '' : req.query.code});
