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
	componentDidUpdate : function(prevProps, prevState) {
		var me = this;
		if (prevState._auth !== me.state._auth) {
			location.reload();
		}
	},
	showStatus : function() {
		var me = this;
		var v = (me.state._auth) ? 'On' : 'Off';
		
		return v;
	},
	showSwitch : function() {
		var me = this;
		return ((me.state._auth) ? 'logoff' : 'logon') 
	},
	doAuth : function() {
		var me = this;
		var v = (me.state._auth) ? '' : new Date().getTime();
		alert(v);
		console.log('---->' + v);
		localStorage.setItem('_auth', v);
		me.setState({_auth : v});
	},	
	render: function() {
		var me = this;
		return (<span>
				<br/><br/>{me.showStatus()}
				&nbsp;&nbsp;&nbsp;
				<a onClick={me.doAuth.bind(me)}>{me.showSwitch()}==</a>
			
			</span>)                   
	}
})
