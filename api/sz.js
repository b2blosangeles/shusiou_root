console.log('bu niu');
console.log(req.files);
res.send({success: true, code: (!req.query.code) ? '' : req.query.code});
