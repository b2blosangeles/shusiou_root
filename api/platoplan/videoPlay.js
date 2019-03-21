var folderP = require(env.root_path + '/package/folderP/folderP');
var Busboy = require(env.site_path + '/api/inc/busboy/node_modules/busboy')

var cloudPath = '/var/mobileCloud/';
var videoPath = '/tmp/videos/';
var vid = (req.query.vid) ? req.query.vid : 'video_1553128281';
    // 'video_1553034579';
    // 'video_1553034704';

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
                    
                    for (var j = 0; j < items.length; j++) {
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
