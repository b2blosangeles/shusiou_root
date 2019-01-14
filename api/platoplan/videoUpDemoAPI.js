function write404(msg) {
	res.writeHead(404);
	res.write(msg);
	res.end();	
}

var list = [],
    dirn = '/var/qalet/formal_demo_videos/downloaded/',
    fn = (req.query.fn) ? req.query.fn : '1.mp4',
    file_video = dirn  + '/' +  fn,
    breakP = (req.query.breakP) ? req.query.breakP : 10,
    breakL = (req.query.breakL) ? req.query.breakL : 10;


var folderP = require(env.root_path + '/package/folderP/folderP');
    
var CP = new pkg.crowdProcess();
switch(req.query.code) {
	case 'cutImage':		
		var s = (req.query.s) ? req.query.s : 10, 
		    w='FULL',
		    str = '';
		var tmpfn = '/var/tmpp/cut_' + s + '_' + fn + '.png';

		var CP = new pkg.crowdProcess();
		var _f = {};
		_f['fp'] = function(cbk) { 
			var fp = new folderP();
			fp.build('/var/tmpp/', function() { cbk(true);});
		};		
		_f['S2'] = function(cbk) {
			pkg.fs.stat(tmpfn, function(err, stat) {
				if(!err) { cbk(tmpfn);
				} else {
					if (w != 'FULL') str = 'ffmpeg -ss ' + s + ' -i ' + file_video +' -vf scale=-1:' +  w + '  -preset ultrafast ' + tmpfn + ' -y ';
					else str = 'ffmpeg -ss ' + s + ' -i ' + file_video +' -vframes 1 ' +  tmpfn + ' -y ';
					str = 'ffmpeg -ss ' + s + ' -i ' + file_video +' -vf scale="-1:180, pad=in_h*4/3:ih:(ow-iw)/2:color=#FAD7A0"  -preset ultrafast ' + tmpfn + ' -y ';
					//ffmpeg -ss 10 -i d.mp4 -vf scale="-1:100,pad=in_h*4/3:ih:(ow-iw)/2"   -preset ultrafast d.png -y
					var childProcess = require('child_process');
					var ls = childProcess.exec(str, 		   
					function (error, stdout, stderr) {
						cbk(true);
					});
				}
			});
		};
		CP.serial(
			_f,
			function(data) {
				res.sendFile(tmpfn);
			}, 3000);			
		
		break;		
	case 'videoList' :
		pkg.fs.readdir(dirn, (err, files) => {
		    files.forEach(file => {
			if (/\.mp4$/.test(file)) {
			    list.push(file);
			}
		    });
		    res.send(list);
		});		
		break;
	case 'playVideo' :		
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
		break;
	default:
		 write404('type error'); 		
}
