/* if cron stopped root server will be reboot */
pkg.fs.readFile('/var/.qalet_cron_watch.data', 'utf8', function(err,data) {
  if (err){
      res.send(err.message);
  } else {
        var watch = {};
        try { watch = JSON.parse(data);} catch (e) {}
        var result_a = [];
  
        for (var o in watch) {
            let t = (watch[o].mark) ? new Date(watch[o].mark).getTime() : null;
            let scheduled = watch[o].scheduled;
            if ((t) && (scheduled) && (new Date().getTime() - t) > (scheduled * 30 * 1000)) {
                result_a.push(o);
            }
        }
        if (result_a.length) {
              
              pkg.fs.unlink('/var/.qalet_cron_watch.data',function(err){
                     pkg.fs.appendFile('/var/log/cron_watch.js.reboot.log', "\n\n"+new Date() + ">>\n" + JSON.stringify(result_a), function (err) {
                        
                       //pkg.exec('shutdown -r +0', function(error, stdout, stderr) {
                          res.send('Server will be reboot in 1 minute!');
                       // });
                        
                     });                
               }); 
               
        } else {
            res.send({status:'success', result_a:result_a, data:watch});
        }
  }
});	
