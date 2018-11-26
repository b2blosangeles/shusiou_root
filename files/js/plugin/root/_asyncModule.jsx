try {
	var _asyncModule = React.createClass({
		getInitialState: function() {
			var me = this;
			return {};
		},
		componentDidMount:function(prevState, prevProps) {
			var me = this;
			me.loadPlugin();
		},		
		componentDidUpdate:function(prevProps, prevState) {
			var me = this;
			if (me.props.code !== prevProps.code) { 
				me.loadPlugin();
			}	
		},		
		loadPlugin : function() {
			var me = this;
			me._asyncModule = null;
			// me._asyncCode = me.props.code;
			 me._asyncCode = new Date().getTime();
			var cfg = me.props.plugin;
			  $.ajax({
			     type: 'POST',
			     url: me.props.plugin.master,
			     data: me.props.plugin.extend,
			     dataType: 'JSON',
			     timeout: (cfg.timeout) ? cfg.timeout : (6 * 1000),
			     success: function(resultData){
				   me._asyncModule = resultData;
				   me.setState({success: true, update : new Date().getTime()});
			     },
			     error : function(xhr, textStatus, error) { 
			       me._asyncModuleErr = error;
			       me.setState({success: false, update : new Date().getTime()})
			     }
			  }); 			
		},
		render: function() {
			var me = this;
			if (me.state.success === false) {
				return  (<span>Script Error: {me._asyncModuleErr}</span>)
			} else if (me._asyncModule) {
				try {
					var _asyncOBJ = React.createClass({render: function() { return (<span/>)}});
					// if (me._asyncCode === me.props.code) {
					if (me._asyncCode) {
						console.log('====me._asyncCode====' + me._asyncCode);
						var code =  decodeURIComponent(me._asyncModule.inc) + 'return ' + 
						    decodeURIComponent(me._asyncModule.master).replace(/(\s|\;)+$/g, ''); 
						
						if (typeof Root === 'undefined') {
							var Root = (_commLib) ? {lib : new _commLib()} : {};
						} 
						_asyncOBJ = new Function('_asyncModule', 'Root', 
							code)((_asyncModule) ? _asyncModule : {}, 
							      Root); 
					}
					return  (<_asyncOBJ parent={(me.props.parent) ? me.props.parent : me}/>)						
				} catch (err) {
					return  (<span>Script Error: {err.message}</span>)
				}
			} else {
				return  (<span>{me.props.plugin.extend.loadingInfo}</span>)
			}
		}
	});	
} catch (err) {
	console.log(err.message);
}
