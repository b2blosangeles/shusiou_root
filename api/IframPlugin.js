let code = req.query['code'],
    room = req.query['room'],
    commsvr = req.query['commsvr'];
if (code === 'SR') {
    pkg.fs.readFile(env.site_path + '/tpl/SR.html', 'utf-8', function(err, content) {
          res.send(content.replace(/\{\$room\}/ig, room).replace(/\{\$commsvr\}/ig, commsvr));
    });	
} else {
  res.send('wrong code');
}
