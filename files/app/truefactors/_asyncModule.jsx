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
		loadPlugin : function() {
			var me = this;
			me._asyncModule = null;
			me._asyncObjId = me.props.objId;

			var cfg = me.props.plugin;
			if (!me.props.plugin.extend.main || !__asyncCache[me.props.plugin.extend.main]) {
				$.ajax({
				     type: 'POST',
				     url: me.props.plugin.master,
				     data: me.props.plugin.extend,
				     dataType: 'JSON',
				     timeout: (cfg.timeout) ? cfg.timeout : (6 * 1000),
				     success: function(resultData){
					   __asyncCache[me.props.plugin.extend.main] = resultData;
					   me._asyncModule = resultData;
					   me.setState({success: true, update : new Date().getTime()});
				     },
				     error : function(xhr, textStatus, error) { 
				       me._asyncModuleErr = error;
				       me.setState({success: false, update : new Date().getTime()})
				     }
				  }); 
			} else {
				me._asyncModule = __asyncCache[me.props.plugin.extend.main];
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
					var _overLay = React.createClass({render: function() { return (<span>HHH</span>)}});
					
					window.__rootOverLay = (!window.__rootOverLay) ? {} : window.__rootOverLay;
					
					if (me._asyncObjId === me.props.objId) {
						var code = decodeURIComponent(me._asyncModule.inc) + 'return ' + 
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
		var _classOverLayB = React.createClass({
		getInitialState: function() {
			var me = this;
			me.loading = [];
			
			return {RootReady : 'A'};
		},
		componentDidMount : function() {
			var me = this;
			window.__rootOverLay = me;
			console.log('componentDidMount--2->');
			me.setState({RootReady : 'B'})
		},
		componentDidUpdate : function() {
			var me = this;
			console.log('componentDidUpdate--->');
			//if (!Root) {
				//if ((Root) && (!Root.overLay)) {
				
			//	console.log('Parking overLay');
				//Root.overLay = me;
			//	me.setState({RootReady : true})
			//}
		},
		test : function() {
			if (typeof Root === 'undefined' ) alert('test 1');
			else  alert('test 2');
			// || !Root.overLay
		},
		render: function() {
			var me = this;
			return ((typeof Root === 'undefined' ) ? (<span>No ROOT--{me.state.RootReady}</span>):
				(<span>
					Overlay ready ===
					{Root.commUI.show({code: 'spinner', parent: me})}
					{Root.commUI.show({code: 'popup',  data: 'me.popupBody()', parent: me})}
				</span>)                   
			)}
	})						
							console.log(_classOverLayB.toString());
							console.log(_classOverLay.toString());
							
							_overLay = (_classOverLayB) ? 
									new Function('_classOverLayB', 'Root', 
										     'return ' + _classOverLayB.toString())
							(_classOverLayB, Root) 
									: _overLay;
						}

						_asyncOBJ = new Function('_asyncModule', 'Root', 
						code)((_asyncModule) ? _asyncModule : {}, 
						Root);
					}
					
					return  (<span>
							<_asyncOBJ parent={(me.props.parent) ? me.props.parent : me}
							 data={(me.props.data !== null) ? me.props.data : null}
							 update = {(me.props.update) ? me.props.update : ''}
							 />
							<_overLay />
						</span>)
							 
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
