let code = req.query['code'];
if (code === 'SR') {
    res.send(env.site_path + '/tpl/SR.html');
    return true;
    pkg.fs.readFile(env.site_path + '/tpl/SR.html', 'utf-8', function(err, content) {
          res.send(content.replace(/\{\$room\}/ig, room).replace(/\{\$socket\}/ig, socket));
    });	
} else {
  res.send('wrong code');
}
