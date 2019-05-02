function write404(msg) {
	res.writeHead(404);
	res.write(msg);
	res.end();	
}

function verifiedSection(ddr, list, cbk) {
	var seclist = [];
	var CP = new pkg.crowdProcess();
	var _f = {};
	for (var i = 0; i < list.length; i++) {
		_f['s_' + i] = (function(i) {
			if  (i < 2) {
				return function(cbk2) {
					var str = 'cd ' + ddr + ' && ffmpeg -v error -i ' + list[i] + ' -f null - '
					var childProcess = require('child_process');
					var ls = childProcess.exec(str, 		   
					function (error, stdout, stderr) {
						if (!error) {
							seclist[seclist.length] = list[i];
						}
						cbk2(true);
					});
				}
			} else {
				return function(cbk2) {
					seclist[seclist.length] = list[i];
					cbk2(true);
				}
			}
			})(i)
	}
	CP.parallel(_f,
	     function(data) {
		seclist.sort(function(a, b){
			var x = parseInt(a.replace('.mp4', '')),
			    y = parseInt(b.replace('.mp4', ''))
			return x - y
		})
		cbk(seclist);
		},6000);
}

var folderP = require(env.root_path + '/package/folderP/folderP');
var Busboy = require(env.site_path + '/api/inc/busboy/node_modules/busboy')

var cloudPath = '/var/mobileCloud/';
var videoPath = '/tmp/videos/';
var imagePath = '/tmp/videoImgs/';

var vid = (!req.query.vid) ? 'video_1556375425' : req.query.vid;
var phoneId = (!req.query.phoneId) ? 'D3E6D259-0B48-4A20-8DF0-03668DC66873' : req.query.phoneId;	

var video_src_dir = cloudPath + phoneId + '/tmp/' + vid + '/';
var video_dir = videoPath + phoneId + '/' + vid + '/';

var CP = new pkg.crowdProcess();
var _f = {};

_f['verification'] = function(cbk) { 
	if (!phoneId || !vid) {
		CP.exit = 1
	}
	cbk(true);
};
_f['buildPath'] = function(cbk) { 
	var fp = new folderP();
	fp.build(video_dir, function() { 
	    cbk(true);                                             
	});			
};	


_f['sections'] = function(cbk) { 
	pkg.fs.readdir(video_src_dir, function(err, sectionList) {
		if (!err && sectionList.length > 1) {
			verifiedSection(video_src_dir, sectionList, function(list) {
			   cbk(list)
			}) 
		} else {
		       cbk(false);
			CP.exit = 1
		}
	});
};
_f['buildVideoTxt'] = function(cbk) { 
    var sectionList = CP.data.sections;
    var str = '';
    for (var j = 0; j < sectionList.length; j++) {
	str += "file '" +  sectionList[j] + "'\n";
    }
    pkg.fs.writeFile(video_dir + '/video.txt', str, function(err) {
	if(err) {
	    return console.log(err);
	}
	cbk(true)
    });
};
_f['mp4'] = function(cbk) { 
	var str = 'cd ' + video_dir + ' &&  cp ' + video_src_dir + '/*.mp4 . ' + 
	    ' && ffmpeg -f concat -i video.txt -c copy video.mp4 -y';

	var childProcess = require('child_process');
	var ls = childProcess.exec(str, 		   
	function (error, stdout, stderr) {
	    cbk(str);
	}); 
};		
CP.serial(
     _f,
     function(data) {
	     if (CP.data.buildPath !== true) {
		     write404('Video ' + phoneId + ':' + vid + ' does not exist!');
	     } else {
		var file_video = video_dir + '/video.mp4';
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
	     } 

     },60000);
		
		
