var pos = req.body.pos, ses = (!req.body.ses) ? (new Date().getTime()) |  req.body.ses,
    base64Data = req.body.data.replace(/^data:image\/png;base64,/, "");


var folderP = require(env.site_path + '/api/inc/folderP/folderP');
var fp = new folderP();
fp.build("/tmp/niu", () => {
    require("fs").writeFile("/tmp/niu/sec_" + pos + "_out.png", base64Data, 'base64', function(err) {
        res.send({ses:ses});
    });
});
