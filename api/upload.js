var pos = req.body.pos, ses = (!req.body.ses) ? (new Date().getTime()) : req.body.ses,
    base64Data = (req.body.data) ? req.body.data.replace(/^data:image\/png;base64,/, "") : null;

var folderP = require(env.site_path + '/api/inc/folderP/folderP');
var fp = new folderP();
var d_folder = '/tmp/niu_' + ses, 
    f_target = '/tmp/pp.png';

fp.build(d_folder, () => {
    if (pos !== 'finished') {
        pkg.fs.writeFile(d_folder + '/sec_' + pos + '_out.png', base64Data, 'base64', function(err) {
            res.send({ses:ses});
        });
    } else {
        pkg.exec('cat $(find ' + d_folde + '/ -name \"sec_*_out.png\" | sort -V) > ' + f_target + ' && rm -fr ' + d_folder, 
            function (error, stdout, stderr) {
                res.send({status:'success', message:'finished88'});	
            });
            
    }
});
