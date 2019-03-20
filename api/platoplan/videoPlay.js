var folderP = require(env.root_path + '/package/folderP/folderP');
var Busboy = require(env.site_path + '/api/inc/busboy/node_modules/busboy')

var cloudPath = '/var/mobileCloud/';
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

_f['sec'] = function(cbk) { 
    var videos = CP.data.videos;
    var str = '';
    var CP1 = new pkg.crowdProcess();
    var _f1 = {};
    for (var i = 0; i < videos.length; i++) {
        _f1['sec_'  + i] = (function(i) {
            return function(cbk1) {
                var ddr = cloudPath + videos[i].phone + '/tmp/' + videos[i].video + '/';
                pkg.fs.readdir(ddr, function(err, items) {
                    for (var j = 0; j < items.length; j++) {
                        str += "file '" +  ddr + items[j] + "'\n";
                    }
                   /* 
                    fs.writeFile("/tmp/", "Hey there!", function(err) {
                        if(err) {
                            return console.log(err);
                        }

                        console.log("The file was saved!");
                    }); 
                    */
                   cbk1(true)
                });
            }
        })(i)
    }
    CP1.serial(
     _f1,
     function(data) {
        cbk(str);
        },10000)
};

CP.serial(
     _f,
     function(data) {
        if (data.status != "success") {
               res.send({success: false, message : data})
        } else {
               res.send({success: true, results: data});
        }
},60000)
