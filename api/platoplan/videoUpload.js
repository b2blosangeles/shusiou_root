// res.send({status : 'success1', tt: req.query.filename})
// var fn = (req.query.fn) ? '/tmp/' + req.query.fn : '';
var fn='/tmp/66.mp4';
if (!fn) res.send('Missing fn');
else {
  pkg.fs.stat(fn, function(err, data) {
    if (err) {  res.send(fn + ' does not exist'); }
    else {
        res.writeHead(200); 
        var file = pkg.fs.createReadStream(fn);
        file.pipe(res);
        setTimeout(
          function() {
            file.destroy();
            write404('timeout')
          }, 30000
        );
      }
  });
}
