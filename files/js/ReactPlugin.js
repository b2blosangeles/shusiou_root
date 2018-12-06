var __asyncOId = 0, __asyncCache = {};
localStorage.clear();
sessionStorage.clear();

var { Router,
  Route,
  browserHistory,
  createMemoryHistory,
  hashHistory,
  IndexRoute,
  IndexLink,
  Link } = ReactRouter;  

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
                              
                              new Function('cfg', code)(cfg);  
                               
                             if  ((resultData.err) && (resultData.err.length)) {
                                   console.log('Error log:');
                                    console.log(resultData.err);
                             }      
    
                         } catch (err) {
                              console.log('something wrong ===!!!');
                              console.log(err);
                              console.log(resultData.err);
                         }

                   },
                   error : function(xhr, textStatus, error) { 
                      console.log(error);
                   }
                });
      };
});
