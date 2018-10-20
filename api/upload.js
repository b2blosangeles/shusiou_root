var pos = req.body.pos, ses = (!req.body.ses) ? (new Date().getTime()) : req.body.ses,
    base64Data = (req.body.data) ? req.body.data.replace(/^data:image\/png;base64,/, "") : null;

var folderP = require(env.site_path + '/api/inc/folderP/folderP');
var fp = new folderP();
fp.build('/tmp/niu_' + ses, () => {
    if (pos !== 'finished') {
        pkg.fs.writeFile("/tmp/niu/sec_" + pos + "_out.png", base64Data, 'base64', function(err) {
            res.send({ses:ses});
        });
    } else {
        pkg.exec('ls -l', function (error, stdout, stderr) {
            res.send({status:'success', message:'finished2'});	
        });
    }
});
