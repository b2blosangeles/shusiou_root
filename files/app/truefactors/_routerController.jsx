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
			me.props.parent.setState({route:location.hash.replace('#', '')});
		});
		me.props.parent.setState({route:location.hash.replace('#', '')});
	},
	componentWillUnmount() {
		this.unlisten();
	},
	/*
	test : function(t) {
		var me = this;
		me.route = t;
		return React.createClass({
			render: function() {
				return (<span>uuu---{t}</span>)
			}
		});
	},*/
	routeMatrix:function(route) {
		var me = this;
		me.matrix =  {
			'/test' : function() {
				alert('A');
			},
			'/niu' : function() {
				alert('B');
			},
			'_defult' : function() {
				alert('C');
			}
		}			
		return me.matrix(route);
	},	
	render: function() {
		var me = this;
		return (<span>niu</span>)
	}
})
