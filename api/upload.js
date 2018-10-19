var pos = req.body.pos,
    base64Data = req.body.data.replace(/^data:image\/png;base64,/, "");

require("fs").writeFile("/tmp/' + pos + '_out.png", base64Data, 'base64', function(err) {
    res.send({buf:'buff'});
});
