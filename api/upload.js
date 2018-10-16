var buf = new Buffer(req.body.data, 'base64');
res.send({buf:buf});
