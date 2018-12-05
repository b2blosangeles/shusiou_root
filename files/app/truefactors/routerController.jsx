React.createClass({
	render: function() {
		var me = this;
		
		let Router = window.ReactRouter;
		let hashHistory = Router.hashHistory;
		
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
