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
	},
	routeMatrix:function() {
		var me = this;

		me.matrix = [
			{route:'/test', component:me.test('test')},
			{route:'/niu', component:me.test('niu')},
			{route:'*', role:['*'], auth:false, component:me.test('*')}
		];			
		return (
			<span>
			{me.matrix.map(function(m){  						
				return(<Route path={m.route} env={me} component={m.component} />)	
			})};
			</span>	
		);
	},*/	
	render: function() {
		var me = this;
		return (<span>niu</span>)
	}
})
