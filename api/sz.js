console.log('niu bi');
res.send({success: true, code: (!req.query.code) ? '' : req.query.code});
