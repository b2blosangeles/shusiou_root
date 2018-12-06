var _routerControl = React.createClass({
	getInitialState: function() {
		return {}
	},
	componentDidMount : function() {
		var me = this;
		
	},
	test : function(t) {
		var me = this;
		me.props.parent.setState({route:t});
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
