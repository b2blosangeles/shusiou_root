let code = req.query['code'],
    room = req.query['room'],
    commlink = req.query['commlink'];
if (code === 'SR') {
    pkg.fs.readFile(env.site_path + '/tpl/SR.html', 'utf-8', function(err, content) {
          res.send(content.replace(/\{\$room\}/ig, room).replace(/\{\$commlink\}/ig, commlink));
    });	
} else {
  res.send('wrong code');
}
