React.createClass({
	render: function() {
		var me = this;
		
		//var Router = window.ReactRouter;
		//var hashHistory = Router.hashHistory;
		//console.log('-----hashHistory-------');
		//console.log(hashHistory);
		
		return (<ReactRouter.Router history={hashHistory}>
				<IndexRoute env={me}/>
				{/*me.routeMatrix()*/}NBNBNB
			</ReactRouter.Router>)  
		/* return (<ReactRouter.Router history={hashHistory}>
				<IndexRoute env={me} component={Ad}/>
				{me.routeMatrix()}
			</ReactRouter.Router>) */
	}
})
