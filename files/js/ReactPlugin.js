$(document).ready(function(){
      $.ReactPlugin =  function(cfg) {
                cfg.viewPoint.innerHTML = ((cfg.extend) && (cfg.extend.loadingInfo)) ? cfg.extend.loadingInfo : '';
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
                              
                              if (typeof Root === 'undefined' || (!Root.lib && !Root.commUI && !Root.global)) {
                                    var Root = {
                                          lib	: (!_commLib) ? {} : new _commLib(),
                                          commUI	:  (!_commUI) ? {} : _commUI,
                                          global	:  (!_global) ? {} :  _global
                                    };
                              }
                               
                              new Function('cfg', 'Root', code)(cfg, Root);  
                               
                             if  ((resultData.err) && (resultData.err.length)) {
                                   console.log('Error log:');
                                    console.log(resultData.err);
                             }      
    
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
