$(document).ready(function(){
      $.ReactPlugin =  function(cfg) {
            var me = this;
            me.cfg = JSON.parse(JSON.stringify(cfg));
            this.load = function() {
                  console.log('me.cfg.extend.main==>' + me.cfg.extend.main);
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
                                   ', null), me.cfg.viewPoint); console.log(cfg.vv); ' + 
                                   'console.log(resultData.masterUrl); ' + 
                                   'console.log(cfg.extend.main); ' + 
                                   ' console.log(unescape(resultData.master)); })()');                         

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
