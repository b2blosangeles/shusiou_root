console.log({success: true, code: (!req.query.code) ? '' : req.query.code)});
res.send({success: true, code: (!req.query.code) ? '' : req.query.code});
