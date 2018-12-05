React.createClass({
	test : function() {
		return (<span>aaa</span>)
		},
	routeMatrix:function() {
		var me = this;

		me.matrix = [
			{route:'/test', component:me.test()},
			{route:'/', role:['*'], auth:false, component:me.test()},
			{route:'*', role:['*'], auth:false, component:me.test()}
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
		
		return (<span>oooo===NBNBNB===<ReactRouter.Router history={hashHistory}>
				<IndexRoute env={me}/>
				{me.routeMatrix()}
			</ReactRouter.Router></span>)  
		/* return (<ReactRouter.Router history={hashHistory}>
				<IndexRoute env={me} component={Ad}/>
				{me.routeMatrix()}
			</ReactRouter.Router>) */
	}
})
