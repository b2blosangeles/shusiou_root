React.createClass({
	routeMatrix:function() {
		var me = this;

		me.matrix = [
			{route:'/test', component:My_curriculums},
			{route:'/', role:['*'], auth:false, component:Ad},
			{route:'*', role:['*'], auth:false, component:ErrorPage}
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
		
		return (<ReactRouter.Router history={hashHistory}>
				<IndexRoute env={me}/>
				{me.routeMatrix()}NBNBNB
			</ReactRouter.Router>)  
		/* return (<ReactRouter.Router history={hashHistory}>
				<IndexRoute env={me} component={Ad}/>
				{me.routeMatrix()}
			</ReactRouter.Router>) */
	}
})
