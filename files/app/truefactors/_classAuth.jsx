React.createClass({
	/* --- this version do setInterval only need, no ever last setInterval */
	getInitialState: function() {
		var me = this;
		return {_auth : false, info:'how are you'};
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
		return ((me.state._auth) ? 'On' : 'Off')
	},
	showSwitch : function() {
		var me = this;
		return ((me.state._auth) ? 'logoff' : 'logon') 
	},
	doAuth : function() {
		var me = this;
		me.setState({_auth : (me.state._auth) ? false : new Date().getTime()});
	},	
	render: function() {
		var me = this;
		return (<span>
				<br/><br/>{me.showStatus()}
				&nbsp;&nbsp;&nbsp;
				<a href="JavaScrtipt: void(0)" onClick={me.doAuth.bind(me)}>{me.showSwitch()}==</a>
			
			</span>)                   
	}
})
