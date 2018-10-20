var pos = req.body.pos, ses = (!req.body.ses) ? (new Date().getTime()) : req.body.ses,
    base64Data = (req.body.data) ? req.body.data.replace(/^data:image\/png;base64,/, "") : null;

var folderP = require(env.site_path + '/api/inc/folderP/folderP');
var fp = new folderP();
var d_folder = '/tmp/niu_' + ses;
fp.build(d_folder, () => {
    if (pos !== 'finished') {
        pkg.fs.writeFile(d_folder + '/sec_' + pos + '_out.png', base64Data, 'base64', function(err) {
            res.send({ses:ses});
        });
    } else {
        pkg.exec('cd ' + d_folder + '&& cat $(find ./ -name \"sec_*_out.png\" | sort -V) > ../pp1.png && cd /tmp && rm -fr ' + d_folder, 
            function (error, stdout, stderr) {
                res.send({status:'success', message:'finished66'});	
            });
            
    }
});
