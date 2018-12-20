 var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
res.send(fullUrl);
return true;
