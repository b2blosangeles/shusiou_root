React.createClass({
	/* --- this version do setInterval only need, no ever last setInterval */
	render: function() {
		var me = this;
		return (<ReactRouter.Router history={hashHistory}>
				<IndexRoute env={me} component={Ad}/>
				{me.routeMatrix()}
			</ReactRouter.Router>)                   
	}
})
