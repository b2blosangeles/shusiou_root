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
    var CP = new pkg.crowdProcess();
    var _f1 = {};
    for (var i = 0; i < items.length; i++) {
        _f1['TMP_'  + i] = function(cbk1) {
            cbk1(items[i])
        }
    }
    CP1.serial(
     _f,
     function(data) {
        if (data.status != "success") {
               cbk({success: false, message : data})
        } else {
               cbk(data);
        }
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
