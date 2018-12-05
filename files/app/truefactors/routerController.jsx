React.createClass({
	render: function() {
		var me = this;
		return (<ReactRouter.Router history={hashHistory}>
				<IndexRoute env={me}/>
				{/*me.routeMatrix()*/}
			</ReactRouter.Router>)  
		/* return (<ReactRouter.Router history={hashHistory}>
				<IndexRoute env={me} component={Ad}/>
				{me.routeMatrix()}
			</ReactRouter.Router>) */
	}
})
