console.log('bu niu');
console.log(req.body);
res.send({success: true, code: (!req.query.code) ? '' : req.query.code});
