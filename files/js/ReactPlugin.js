$(document).ready(function(){
      $.ReactPlugin =  function(cfg) {
          $.ajax({
             type: 'POST',
             url: cfg.master,
             data: cfg.package,
             dataType: 'JSON',
             timeout: (cfg.timeout) ? cfg.timeout : (6 * 1000),
             success: function(resultData){
                //me._asyncModule = resultData;
                // console.log(resultData.niu);
                   eval(decodeURIComponent(resultData.code));
                   ReactDOM.render(React.createElement(_asyncOBJ, null), cfg.viewPoint);
            //   me.setState({success: true, update : new Date().getTime()});
             },
             error : function(xhr, textStatus, error) { 
                console.log(error);
              // me._asyncModuleErr = error;
              // me.setState({success: false, update : new Date().getTime()})
             }
          }); 
      };
});
