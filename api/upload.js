var pos = req.body.pos,
    base64Data = req.body.data.replace(/^data:image\/png;base64,/, "");
res.send(env.site_path);
return true;
var folderP = require(env.site_path + '/api/inc/folderP/folderP');
var fp = new folderP();
fp.build("/tmp/niu", () => {
    require("fs").writeFile("sec_" + pos + "_out.png", base64Data, 'base64', function(err) {
        res.send({buf:'buff'});
    });
});
