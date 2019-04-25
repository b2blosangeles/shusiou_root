function write404(msg) {
	res.writeHead(404);
	res.write(msg);
	res.end();	
}

function verifiedSection(ddr, list, cbk) {
	var seclist = [];
	var CP = new pkg.crowdProcess();
	var _f = {};
	list.sort(function(a, b){
			var x = parseInt(a.replace('.mp4', '')),
			    y = parseInt(b.replace('.mp4', ''))
			return x - y
		})
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
		cbk(seclist);
		},2000);
}

var folderP = require(env.root_path + '/package/folderP/folderP');
var Busboy = require(env.site_path + '/api/inc/busboy/node_modules/busboy')

var cloudPath = '/var/mobileCloud/';
var videoPath = '/tmp/videos/';
var imagePath = '/tmp/videoImgs/';

switch(req.query.code) {
	case 'getSections':
		var vid = req.query.vid;
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
				var ddr = cloudPath + items[i] + '/tmp/' + vid;
				pkg.fs.readdir(ddr, function(err, items1) {
				   verifiedSection(ddr, items1, function(list) {
					    for (var j = 0; j < list.length; j++) {
						videoList[videoList.length] = {phone: items[i], section: list[j]}
					    }
					   cbk1(true)
				   }) 
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
	case 'playSection':
		var vid = req.query.vid;
		var phoneId = req.query.phoneId;	
		var secid = req.query.secid;
		
		var video_file = cloudPath + phoneId + '/tmp/' + vid + '/' + secid;
		res.sendFile(video_file);			     	
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
	case 'playVideo':
		var vid = req.query.vid;
		var phoneId = req.query.phoneId;	
		
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
				// cbk( sectionList)
				// verifiedSection(video_src_dir, sectionList, function(list) {
				//	   cbk(list)
				//   }) 
			});			
		};
		/*
		_f['sections'] = function(cbk) { 
			var sectionList = CP.data.read_sections
			sectionList.sort(function(a, b){
				var x = parseInt(a.replace('.mp4', '')),
				    y = parseInt(b.replace('.mp4', ''))
				return x - y
			})
			cbk(sectionList)			
		};
		*/
		/*
		_f['sections'] = function(cbk) { 
			var sectionList = CP.data.read_sections;
			if (!err && sectionList.length > 1) {
				sectionList.sort(function(a, b){
					var x = parseInt(a.replace('.mp4', '')),
					    y = parseInt(b.replace('.mp4', ''))
					return x - y
				})
				cbk(sectionList)
			} else {
			       cbk(false);
				CP.exit = 1
			}			
		};*/
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
			     
		     },60000)
		break;
	case 'getImage':
		var vid = req.query.vid;
		var phoneId = req.query.phoneId;		
		
		var s = (req.query.s) ? req.query.s : 5, 
		    w='FULL',
		    str = '';
		
		var video_src_dir = cloudPath + phoneId + '/tmp/' + vid + '/';
		var img_dir = imagePath + phoneId + '/' + vid + '/';	
		
		var tmpfn = img_dir + 'cut_' + s + '_' + vid + '.png';	
		
		var CP = new pkg.crowdProcess();
		var _f = {};
		_f['verification'] = function(cbk) { 
			if (!phoneId || !vid) {
				CP.exit = 1
			}
			cbk(true);
		};
		_f['img_exist'] = function(cbk) { 
			pkg.fs.stat(tmpfn, function(err, stat) {
				if(!err) {  CP.exist = 1; }
				cbk(true);
			});
		}
		_f['sections'] = function(cbk) { 
			pkg.fs.readdir(video_src_dir, function(err, sectionList) {
				if (!err && sectionList.length > 1) {
					sectionList.sort(function(a, b){
						var x = parseInt(a.replace('.mp4', '')),
						    y = parseInt(b.replace('.mp4', ''))
						return x - y
				    	})
					cbk(sectionList)
				} else {
				       cbk(false);
					CP.exit = 1
				}
			});			
		};		
		_f['buildPath'] = function(cbk) { 
			var fp = new folderP();
			fp.build(img_dir , function() { cbk(true);});
		};		
		_f['S2'] = function(cbk) {
			var section = s - (s % 3);
			var file_video =  video_src_dir + section + '.mp4';
			pkg.fs.stat(file_video, function(err, stat) {
				//if(!err) { cbk(true);
				//} else {
					if (w != 'FULL') str = 'ffmpeg -ss ' + 1 + ' -i ' + file_video +' -vf scale=-1:' +  w + '  -preset ultrafast ' + tmpfn + ' -y ';
					else str = 'ffmpeg -ss ' + 1 + ' -i ' + file_video +' -vframes 1 ' +  tmpfn + ' -y ';
					str = 'ffmpeg -ss ' + 1 + ' -i ' + file_video +' -vf scale="-1:180, pad=in_h*4/3:ih:(ow-iw)/2:color=#333333"  -preset ultrafast ' + tmpfn + ' -y ';
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
				if (CP.data.buildPath !== true || !CP.data.S2) {
					write404('Video ' + phoneId + ':' + vid + ' does not exist!');
				} else {
					res.sendFile(tmpfn);
				}
			}, 3000);			
		
		break;
	default:
		 write404('type error'); 	
}		
		
