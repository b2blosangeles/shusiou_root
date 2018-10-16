var buf = new Buffer(b64string, req.body.data);
res.send({buf:buf});
