function write404(msg) {
	res.writeHead(404);
	res.write(msg);
	res.end();	
}

var folderP = require(env.root_path + '/package/folderP/folderP');
var Busboy = require(env.site_path + '/api/inc/busboy/node_modules/busboy')

var cloudPath = '/var/mobileCloud/';
var videoPath = '/tmp/videos/';

switch(req.query.code) {
	case 'playVideo':
		var vid = (req.query.vid) ? req.query.vid : 'video_1553128281';
		
		var CP = new pkg.crowdProcess();
		var _f = {}; 

		_f['cloudPath'] = function(cbk) { 
		    pkg.fs.readdir(cloudPath, function(err, items) {
		       cbk(items)
		    });
		};
		_f['videos'] = function(cbk) { 
		    var items = CP.data.cloudPath;
		    var videoList = [];
		    var CP1 = new pkg.crowdProcess();
		    var _f1 = {};
		    for (var i = 0; i < items.length; i++) {
			_f1['videos_'  + i] = (function(i) {
			    return function(cbk1) {
				var ddr = cloudPath + items[i] + '/tmp/';
				pkg.fs.readdir(ddr, function(err, items1) {
				    for (var j = 0; j < items1.length; j++) {
					 videoList[videoList.length] = {phone: items[i], video: items1[j]}
				    }
				   cbk1(true)
				});
			    }
			})(i)
		    }
		    CP1.serial(
		     _f1,
		     function(data) {
			cbk(videoList);
			},10000)

		};
		_f['videoPath'] = function(cbk) { 
		    var videos = CP.data.videos;

		    var CP1 = new pkg.crowdProcess();
		    var _f1 = {};
		    for (var i = 0; i < videos.length; i++) {
			_f1['sec_'  + i] = (function(i) {
			    return function(cbk1) {
				var fp = new folderP();
				var ddr = cloudPath + videos[i].phone + '/tmp/' + videos[i].video + '/';

				fp.build(videoPath + videos[i].video, function() { 
				    cbk1(true);                                             
				});

			    }
			})(i)
		    }
		    CP1.serial(
		     _f1,
		     function(data) {
			cbk(true);
			},10000)
		};
		_f['sec'] = function(cbk) { 
		    var videos = CP.data.videos;

		    var CP1 = new pkg.crowdProcess();
		    var _f1 = {};
		    for (var i = 0; i < videos.length; i++) {
			_f1['sec_'  + i] = (function(i) {
			    return function(cbk1) {
				var ddr = cloudPath + videos[i].phone + '/tmp/' + videos[i].video + '/';
				pkg.fs.readdir(ddr, function(err, items) {
				    var str = '';
				    items.sort(function(a, b){
					var x = parseInt(a.replace('.mp4', '')),
					    y = parseInt(b.replace('.mp4', ''))
					return x - y
				    })

				    for (var j = 1; j < items.length; j++) {
					str += "file '" +  items[j] + "'\n";
				    }
				    pkg.fs.writeFile(videoPath + videos[i].video + '/video.txt', str, function(err) {
					if(err) {
					    return console.log(err);
					}
					cbk1(true)
				    });
				});
			    }
			})(i)
		    }
		    CP1.serial(
		     _f1,
		     function(data) {
			cbk(true);
			},10000)
		};

		_f['mp4'] = function(cbk) { 
			var videos = CP.data.videos;
			for (var i = 0; i < videos.length; i++) {
			    if (videos[i].video == vid) {
				var str = 'cd ' + videoPath + vid + 
				    ' &&  cp ' + cloudPath + videos[i].phone + '/tmp/' + vid + '/*.mp4 . ' + 
				    ' && ffmpeg -f concat -i video.txt -c copy video.mp4 -y';

				var childProcess = require('child_process');
				var ls = childProcess.exec(str, 		   
				function (error, stdout, stderr) {
				    cbk(str);
				}); 
				return true
			    }
			}
			cbk(false)
		};
		CP.serial(
		     _f,
		     function(data) {
			var file_video = videoPath + vid + '/video.mp4';
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
		     },60000)
		break;
	case 'getVideos':
		var CP = new pkg.crowdProcess();
		var _f = {}; 

		_f['cloudPath'] = function(cbk) { 
		    pkg.fs.readdir(cloudPath, function(err, items) {
		       cbk(items)
		    });
		};
		_f['videos'] = function(cbk) { 
		    var items = CP.data.cloudPath;
		    var videoList = [];
		    var CP1 = new pkg.crowdProcess();
		    var _f1 = {};
		    for (var i = 0; i < items.length; i++) {
			_f1['videos_'  + i] = (function(i) {
			    return function(cbk1) {
				var ddr = cloudPath + items[i] + '/tmp/';
				pkg.fs.readdir(ddr, function(err, items1) {
				    for (var j = 0; j < items1.length; j++) {
					 videoList[videoList.length] = {phone: items[i], video: items1[j]}
				    }
				   cbk1(true)
				});
			    }
			})(i)
		    }
		    CP1.serial(
		     _f1,
		     function(data) {
			cbk(videoList);
			},10000)

		};
		CP.serial(
		     _f,
		     function(data) {
			res.send(CP.data.videos);
		     },60000)
		break;
	case 'getImage':
		var s = (req.query.s) ? req.query.s : 1, 
		    w='FULL',
		    str = '';
		var tmpfn = '/var/tmpp/cut_' + s + '_' + vid + '.png';

		var CP = new pkg.crowdProcess();
		var _f = {};
		_f['fp'] = function(cbk) { 
			var fp = new folderP();
			fp.build('/var/tmpp/', function() { cbk(true);});
		};		
		_f['S2'] = function(cbk) {
			var vid = (req.query.vid) ? req.query.vid : 'video_1553128281';
			var phoneId = (req.query.phoneId) ? req.query.phoneId : '250885B4-CE64-46EA-BAE3-8BCE39971E03';
			
			var file_video =  cloudPath + phoneId + '/tmp/' + vid + '/3.mp4';
			pkg.fs.stat(tmpfn, function(err, stat) {
				//if(!err) { cbk(tmpfn);
				//} else {
					if (w != 'FULL') str = 'ffmpeg -ss ' + s + ' -i ' + file_video +' -vf scale=-1:' +  w + '  -preset ultrafast ' + tmpfn + ' -y ';
					else str = 'ffmpeg -ss ' + s + ' -i ' + file_video +' -vframes 1 ' +  tmpfn + ' -y ';
					str = 'ffmpeg -ss ' + s + ' -i ' + file_video +' -vf scale="-1:180, pad=in_h*4/3:ih:(ow-iw)/2:color=#333333"  -preset ultrafast ' + tmpfn + ' -y ';
					//ffmpeg -ss 10 -i d.mp4 -vf scale="-1:100,pad=in_h*4/3:ih:(ow-iw)/2"   -preset ultrafast d.png -y
					var childProcess = require('child_process');
					var ls = childProcess.exec(str, 		   
					function (error, stdout, stderr) {
						cbk(true);
					});
				//}
			});
		};
		CP.serial(
			_f,
			function(data) {
				res.sendFile(tmpfn);
			}, 3000);			
		
		break;		
	default:
		 write404('type error'); 	
}		
		
