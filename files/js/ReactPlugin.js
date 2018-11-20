$(document).ready(function(){
      $.ReactPlugin =  function(cfg) {
            (function(cfg) {
          $.ajax({
             type: 'POST',
             url: cfg.master,
             data: cfg.extend,
             dataType: 'JSON',
             timeout: (cfg.timeout) ? cfg.timeout : (6 * 1000),
             success: function(resultData){
                   try {
                        var _asyncOBJ;
                        eval(decodeURIComponent(resultData.inc));
                        eval('_asyncOBJ = ' + decodeURIComponent(resultData.master));
                        ReactDOM.render(React.createElement(_asyncOBJ, null), cfg.viewPoint);
                   console.log('=>==>' + cfg.vv);
                   console.log(resultData);
                   } catch {
                        console.log('something wrong ===!!!');
                   }

             },
             error : function(xhr, textStatus, error) { 
                console.log(error);
              // me._asyncModuleErr = error;
              // me.setState({success: false, update : new Date().getTime()})
             }
          });
            })(cfg)
      };
});
