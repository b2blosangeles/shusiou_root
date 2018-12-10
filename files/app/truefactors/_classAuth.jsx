React.createClass({
	/* --- this version do setInterval only need, no ever last setInterval */
	getInitialState: function() {
		var me = this;
		return {_auth : false};
	},
	componentDidMount : function() {
		var me = this;
		window.__rootAuth = me;
	},
	componentDidUpdate : function() {
		var me = this;
	},
	showStatus : function() {
		var me = this;
		return (me.state._auth) ? 'On' : 'Off'
	},
	signIn : function() {
		var me = this;
		setState({_auth : true});
	},	
	render: function() {
		var me = this;
		return (<span>
				=={me.showStatus()}==<a href="JavaScript: void(0)" onClick={me.signIn()}>Login</a>
			</span>)                   
	}
})
