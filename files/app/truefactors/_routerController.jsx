var _routerControl = React.createClass({
	getInitialState: function() {
		var me = this;
		me.route = '';
		return {}
	},
	/*
	componentDidMount : function() {
		var me = this;
		
	},
	    componentDidUpdate(prevProps, prevState) {
		    var me = this;
		if (me.state.route !== prevState.route) {
			console.log('route changes to =>' + me.state.route);
		//	me.props.parent.setState({route:me.state.route});
		}

	    },*/
	
	    componentDidMount() {
		var me = this;
		this.unlisten = browserHistory.listen( location =>  {
			console.log('route changes==>' + location.hash);
			console.log(location);
			me.props.parent.setState({route:location.hash});
		});
		setTimeout(function() {
			me.props.parent.setState({route:location.hash});
		});
	    },
	    componentWillUnmount() {
		this.unlisten();

	    },
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
	},	
	render: function() {
		var me = this;
		
		return (<span><ReactRouter.Router history={hashHistory}>
				{/*<IndexRoute env={me} component={me.test('niu')}/>*/}
				{me.routeMatrix()}
			</ReactRouter.Router></span>)
	}
})
