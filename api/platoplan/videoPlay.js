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
_f['tmp'] = function(cbk) { 
    var items = CP.data.cloudPath;
    var videoList = [];
    var CP1 = new pkg.crowdProcess();
    var _f1 = {};
    for (var i = 0; i < items.length; i++) {
        _f1['TMP_'  + i] = (function(i) {
            return function(cbk1) {
                var ddr = cloudPath + items[i] + '/tmp/';
                pkg.fs.readdir(ddr, function(err, items1) {
                    for (var i = 0; i < items1.length; i++) {
                         videoList[videoList.length] = {path: cloudPath + items[i] + '/tmp/', video: items1[i]}
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
    cbk(true)
    return true
    var items = CP.data.tmp;
    var str = '';
    var CP1 = new pkg.crowdProcess();
    var _f1 = {};
    for (var i = 0; i < items.length; i++) {
        _f1['SEC_'  + i] = (function(i) {
            return function(cbk1) {
                var ddr = cloudPath + items0[i] + '/tmp/' + items[i] + '/';
                pkg.fs.readdir(ddr, function(err, items1) {
                    for (var i = 0; i < items1.length; i++) {
                        str += "file '" +  ddr + items1[i] + "'\n"
                        // secList[secList.length] = ddr + items1[i]
                    }
                    
                    fs.writeFile("/tmp/", "Hey there!", function(err) {
                        if(err) {
                            return console.log(err);
                        }

                        console.log("The file was saved!");
                    }); 

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
