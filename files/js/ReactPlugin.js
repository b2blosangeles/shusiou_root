$(document).ready(function(){
      $.ReactPlugin =  function(cfg) {
                $.ajax({
                   type: 'POST',
                   url: cfg.master,
                   data: cfg.extend,
                   dataType: 'JSON',
                   timeout: (cfg.timeout) ? cfg.timeout : (6 * 1000),
                   success: function(resultData){
                         try {
                              new Function('cfg', '(function() { ' + decodeURIComponent(resultData.inc) + 
                                   'ReactDOM.render(React.createElement(' + 
                                   decodeURIComponent(resultData.master).replace(/\;$/ig, '') + 
                                   ', null), cfg.viewPoint); })()')(cfg);                         
    
                         } catch {
                              console.log('something wrong ===!!!');
                              console.log(resultData.err);
                         }

                   },
                   error : function(xhr, textStatus, error) { 
                      console.log(error);
                    // me._asyncModuleErr = error;
                    // me.setState({success: false, update : new Date().getTime()})
                   }
                });
      };
});
