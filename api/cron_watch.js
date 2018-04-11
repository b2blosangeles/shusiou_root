/* if cron stopped root server will be reboot */
pkg.fs.readFile('/var/.qalet_cron_watch.data', 'utf8', function(err,data) {
  if (err){
      res.send(err.message);
  } else {
        var watch = {};
        try { watch = JSON.parse(data);} catch (e) {}
        var result_a = [];
  
        for (var o in watch) {
            let t1 = (watch[o].start) ? 'new Data(watch[o].start).getTime()' : null;
             /*
            let t2 = (watch[o].mark) ? 'new Data(watch[o].mark).getTime()' : null;
            let scheduled = watch[o].scheduled;
         
            if ((t1) && (scheduled) && (t2 - t1 > scheduled * 3)) {
                result_a.push(o);
            }
            */
        }
        
        res.send({status:'success', result_a:result_a, data:watch});
  }
});	
/*
pkg.fs.readFile('/var/.qalet_cron_watch.data', 'utf8', function(err,data) {
  if (err){
      res.send(err.message);
  } else {
        var watch = {};
        try { watch = JSON.parse(data);} catch (e) {}
        if (watch.start) {
            res.send('skip!');
        } else if ((watch.mark)) {
            var d = new Date().getTime() - new Date(watch.mark).getTime();
            if (d > 180000) {
                var watch0 = {start:new Date(), mark:new Date()};
                pkg.fs.writeFile('/var/.qalet_cron_watch.data', JSON.stringify(watch0), function (err) {
                    pkg.exec('shutdown -r +1', function(error, stdout, stderr) {
                      res.send('Server will be reboot in 1 minute!');
                    });             
                });
            } else {
                res.send('normal');
            }
        } else {
            res.send({status:'error', data:data});
        }
  }
});	 
*/
