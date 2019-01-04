var list = [],
    dirn = env.root_path + '/demo_videos';

var CP = new pkg.crowdProcess();

var fn = 'HEATING_JACKET.mp4';
var file_video = dirn  + fn;
/*
pkg.fs.readdir(dirn, (err, files) => {
    files.forEach(file => {
        if (/\.mp4$/.test(file)) {
            list.push(file);
        }
    });
    res.send(list);
});*/
res.send(file_video);
return true;
/*
		pkg.fs.stat(file_video, function(err, data1) {
			if (err) {  write404(file_video + ' does not exist'); }
			else {
				var total = data1.size;
				var range = req.headers.range;
				if (range) {
				    var parts = range.replace(/bytes=/, "").split("-");
				    var partialstart = parts[0]; var partialend;
				      partialend =  parts[1];
				    var start = parseInt(partialstart, 10);
				    var end = partialend ? parseInt(partialend, 10) : total-1;
				    var chunksize = (end-start)+1;
				    var file = pkg.fs.createReadStream(file_video, {start:start, end:end});
				    res.writeHead(206, {'Content-Range': 'bytes ' + start + '-' + end + '/' + total, 
					'Accept-Ranges': 'bytes', 'Content-Length': chunksize, 'Content-Type': 'video/mp4' });
				       file.pipe(res);
				} else {
				    res.send('Need streaming player');
				}
			}
		});
*/
