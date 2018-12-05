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
			if (me.props.objId !== prevProps.objId) { 
				me.loadPlugin();
			}	
		},
		asyncCacheExist : function(k) {
			//if (!localStorage) {
				return (!__asyncCache[k]) ? false : true;
			//} else {
			//	return (!localStorage.getItem(k)) ? false : true;
			//}
		},
		setAsyncCache : function(k, v) {
			//if (!localStorage) {
				__asyncCache[k] = v;
			//} else {
			//	localStorage.setItem(k, v);
			//}
		},
		getAsyncCache : function(k) {
			//if (!localStorage) {
				return __asyncCache[k];
			//} else {
			//	return localStorage.getItem(k);
			//}
		},
		loadPlugin : function() {
			var me = this;
			me._asyncModule = null;
			me._asyncObjId = me.props.objId;

			var cfg = me.props.plugin;

			if (!me.props.plugin.extend.controller || !me.asyncCacheExist(me.props.plugin.extend.controller)) {
				$.ajax({
				     type: 'POST',
				     url: me.props.plugin.master,
				     data: me.props.plugin.extend,
				     dataType: 'JSON',
				     timeout: (cfg.timeout) ? cfg.timeout : (6 * 1000),
				     success: function(resultData){
					  if (me.props.plugin.extend.controller) {   
					   	me.setAsyncCache(me.props.plugin.extend.controller , resultData);
					  }
					     console.log('===__asyncCache===');
					     console.log(__asyncCache);
					   me._asyncModule = resultData;
					   me.setState({success: true, update : new Date().getTime()});
				     },
				     error : function(xhr, textStatus, error) { 
				       me._asyncModuleErr = error;
				       me.setState({success: false, update : new Date().getTime()})
				     }
				  }); 
			} else {
				me._asyncModule = me.getAsyncCache(me.props.plugin.extend.controller);
				me.setState({success: true, update : new Date().getTime()});
			}
		},
		render: function() {
			var me = this;
			if (me.state.success === false) {
				return  (<span>Script Error: {me._asyncModuleErr}</span>)
			} else if (me._asyncModule) {
				if ((me._asyncModule.err) && (me._asyncModule.err.length)) {
					console.log(me._asyncModule.err)
				}
				try {
					var _asyncOBJ = React.createClass({render: function() { return (<span/>)}});

					window.__rootOverLay = (!window.__rootOverLay) ? {} : window.__rootOverLay;
					
					if (me._asyncObjId === me.props.objId) {
						var code = ((me._asyncModule.contents) ? me._asyncModule.contents : '') + 
						    decodeURIComponent(me._asyncModule.inc) + 'return ' + 
						    decodeURIComponent(me._asyncModule.master).replace(/(\s|\;)+$/g, '');

						if (typeof Root === 'undefined' || (!Root.lib && !Root.commUI && !Root.global)) {
							var Root = {
								overLay :  window.__rootOverLay,
								lib	: (!_commLib) ? {} : new _commLib(),
								commUI	:  (!_commUI) ? {} : _commUI,
								global	:  (!_global) ? {} :  _global,
								setModule : function() {
									
								}
							};
						}

						_asyncOBJ = new Function('_asyncModule', 'Root', 
						code)((_asyncModule) ? _asyncModule : {}, 
						Root);
					}
					
					return  (<_asyncOBJ parent={(me.props.parent) ? me.props.parent : me}
							 data={(me.props.data !== null) ? me.props.data : null}
							 update = {(me.props.update) ? me.props.update : ''}
							 />)
							 
				} catch (err) {
					return  (<span>Script Error: {err.message}</span>)

				}
			} else {
				return  (<span>
						{me.props.plugin.extend.loadingInfo}
					</span>)
			}
		}
	});	
} catch (err) {
	console.log(err.message);
}
