var base64Data = req.data.replace(/^data:image\/png;base64,/, "");

require("fs").writeFile("/tmp/out.png", base64Data, 'base64', function(err) {
    res.send({buf:'buff'});
});
