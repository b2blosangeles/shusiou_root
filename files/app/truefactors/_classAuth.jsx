React.createClass({
	/* --- this version do setInterval only need, no ever last setInterval */
	getInitialState: function() {
		var me = this;
		return {_auth : false};
	},
	componentDidMount : function() {
		var me = this;
	//	window.__rootAuth = me;
	},
	componentDidUpdate : function() {
		var me = this;
	},
	showStatus : function() {
		var me = this;
		// return new Date().getTime();
		return ((me.state._auth) ? 'On' : 'Off') + '--SS-->' + new Date().getTime()
	},
	showSwitch : function() {
		var me = this;
		return ((me.state._auth) ? 'logoff' : 'logon') 
	},
	doAuth : function() {
		var me = this;
		console.log('===doAuth===');
		// me.setState({_auth : (me.state._auth) ? false : true});
	},	
	render: function() {
		var me = this;
		return (<span>
				{me.showStatus()}==>
				<a onClick={me.doAuth.bind(me)}>{me.showSwitch()}==</a>
			
			</span>)                   
	}
})
