$(document).ready(function(){
      $.ReactPlugin =  function(cfg) {
            var me = this;
            me.cfg = cfg;
            this.load = function() {
                $.ajax({
                   type: 'POST',
                   url: me.cfg.master,
                   data: me.cfg.extend,
                   dataType: 'JSON',
                   timeout: (me.cfg.timeout) ? me.cfg.timeout : (6 * 1000),
                   success: function(resultData){
                         try {
                           //   var _asyncOBJ;
                              eval('(function() { ' + decodeURIComponent(resultData.inc)+ 'ReactDOM.render(React.createElement(' + 
                                   decodeURIComponent(resultData.master).replace(/\;$/ig, '') + 
                                   ', null), me.cfg.viewPoint); console.log(cfg.vv); })()');                         

                              // eval('_asyncOBJ = ' + decodeURIComponent(resultData.master));
                              // ReactDOM.render(React.createElement(_asyncOBJ, null), cfg.viewPoint);
                                //   console.log('DDD');
                      //   console.log(resultData);
                         } catch {
                               console.log('EEE');
                              console.log('something wrong ===!!!');
                         }

                   },
                   error : function(xhr, textStatus, error) { 
                      console.log(error);
                    // me._asyncModuleErr = error;
                    // me.setState({success: false, update : new Date().getTime()})
                   }

                });
          }
      };
});
