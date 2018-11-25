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
                              var code =  decodeURIComponent(resultData.inc) + 
                                   'ReactDOM.render(React.createElement(' + 
                                   decodeURIComponent(resultData.master).replace(/(\s|\;)+$/g, '') + 
                                   ', null), cfg.viewPoint);';
                              new Function('cfg', code)(cfg);                         
    
                         } catch {
                              console.log('something wrong ===!!!');
                              console.log(resultData.err);
                         }

                   },
                   error : function(xhr, textStatus, error) { 
                      console.log(error);
                   }
                });
      };
});
