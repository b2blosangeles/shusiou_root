var _routerControl = React.createClass({
	getInitialState: function() {
	var me = this;
	me.route = '';
	return {}
	},
	componentDidMount() {
		var me = this;
		this.unlisten = browserHistory.listen( location =>  {
			console.log('route changes==>' + location.hash);
			console.log(location);
			me.routeRule(location.hash)
		});
		me.routeRule(location.hash)
	},
	
	componentWillUnmount() {
		this.unlisten();
	},
	routeRule:function(route) {
		var me = this;
		if (!me.prop.routeRule) return true;
		if (typeof me.prop.routeRule[route] === 'function') {
			me.prop.routeRule[route]()
		} else if (typeof me.prop.routeRule._default === 'function') {
			me.prop.routeRule._default();
		}
	},	
	render: function() {
		var me = this;
		return (<span>niu</span>)
	}
})
