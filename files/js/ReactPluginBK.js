$(document).ready(function(){
      $.ReactPlugin =  function(cfg) {
            var _plugin = React.createClass({
                  getInitialState: function() {
                     var me = this;
                     return {}
                  },
                  componentDidMount:function(prevState, prevProps) {
                    var me = this;
                    me.loadPlugin();
                  },
                   loadPlugin : function() {
                      var me = this;
                      me._asyncModule = null;
                      $.ajax({
                         type: 'POST',
                         url: cfg.master,
                         data: cfg.package,
                         dataType: 'JSON',
                         timeout: (cfg.timeout) ? cfg.timeout : (6 * 1000),
                         success: function(resultData){
                            me._asyncModule = resultData;
                           // console.log(resultData);
                           me.setState({success: true, update : new Date().getTime()});
                         },
                         error : function(xhr, textStatus, error) { 
                         // console.log(error);
                           me._asyncModuleErr = error;
                           me.setState({success: false, update : new Date().getTime()})
                         }
                      });		
                    },
                  render() {
                      var me = this;
                      var _asyncOBJ = React.createClass({render: function() { return (<span>Loading .... </span>)}});
                      if (me._asyncModule) {
                          console.log(decodeURIComponent(me._asyncModule.code));
                          eval(decodeURIComponent(me._asyncModule.code));   
                      }
                      return (
                        <div><_asyncOBJ parent={me} /></div>
                      );
                    }
                  }); 

                  ReactDOM.render(<_plugin code={'publicNews'} />, cfg.viewPoint);
      };
});
