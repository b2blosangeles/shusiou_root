var _routerControl = React.createClass({
	getInitialState: function() {
		var me = this;
		me.route = '';
		return {}
	},
	componentDidMount : function () {
		var me = this;
		this.unlisten = browserHistory.listen( location =>  {
			console.log('route changes==>' + location.hash);
			console.log(location);
			me.routeRule(location.hash)
		});
		me.routeRule(location.hash)
	},
	
	componentWillUnmount : function() {
		this.unlisten();
	},
	routeRule : function(route) {
		var me = this;
		if (!me.props || !me.props.routeRule) return true;
		if (typeof me.props.routeRule[route] === 'function') {
			me.props.routeRule[route](route)
		} else if (typeof me.props.routeRule._default === 'function') {
			me.props.routeRule._default(route);
		}
	},	
	render: function() {
		var me = this;
		return (<span>niu</span>)
	}
})
