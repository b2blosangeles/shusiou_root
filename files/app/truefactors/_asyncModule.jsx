try {
	var _asyncModule = React.createClass({
		getInitialState: function() {
			var me = this;
			__asyncOId = (!__asyncOId || __asyncOId > 1000000) ? 1 : (__asyncOId + 1);
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
			if (!sessionStorage) {
				return (!__asyncCache[k]) ? false : true;
			} else {
				return (!sessionStorage.getItem(k)) ? false : true;
			}
		},
		setAsyncCache : function(k, v) {
			if (!sessionStorage) {
				__asyncCache[k] = v;
			} else {
				sessionStorage.setItem(k, JSON.stringify(v));
			}
		},
		getAsyncCache : function(k) {
			if (!sessionStorage) {
				return __asyncCache[k];
			} else {
				return JSON.parse(sessionStorage.getItem(k));
			}
		},
		loadPlugin : function() {
			var me = this;
			me._asyncModule = null;
			me._asyncObjId = me.props.objId;

			var cfg = me.props.plugin;
			// var k = (cfg.key) ? cfg.key : me.props.plugin.extend.controller;
			var k = encodeURIComponent(me.props.plugin.extend.controller);
			
			if (!k || !me.asyncCacheExist(k)) {
				$.ajax({
				     type: 'POST',
				     url: me.props.plugin.master,
				     data: me.props.plugin.extend,
				     dataType: 'JSON',
				     timeout: (cfg.timeout) ? cfg.timeout : (6 * 1000),
				     success: function(resultData){
					     
					  if (me.props.plugin.extend.controller) {   
					   	me.setAsyncCache(k , resultData);
					  }
					  me._asyncModule = resultData;
					  me.setState({success: true, update : new Date().getTime()});
				     },
				     error : function(xhr, textStatus, error) { 
				       	me._asyncModuleErr = error;
				       	me.setState({success: false, update : new Date().getTime()})				     
				     }
				  }); 
			} else {
				me._asyncModule = me.getAsyncCache(k);
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
					window.__rootAuth = (!window.__rootAuth) ? {} : window.__rootAuth;
					
					if (me._asyncObjId === me.props.objId) {
						var code = ((me._asyncModule.contents) ? me._asyncModule.contents : '') + 
						    decodeURIComponent(me._asyncModule.inc) + 'return ' + 
						    decodeURIComponent(me._asyncModule.master).replace(/(\s|\;)+$/g, '');

						if (typeof Root === 'undefined' || (!Root.lib && !Root.commUI && !Root.global)) {
							var Root = {
								auth :  window.__rootAuth,
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
						if (cfg.callback) { setTimeout(cfg.callback);  } 
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
