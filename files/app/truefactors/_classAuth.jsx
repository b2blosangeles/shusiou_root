React.createClass({
	/* --- this version do setInterval only need, no ever last setInterval */
	getInitialState: function() {
		var me = this;
		return {_auth : false};
	},
	componentDidMount : function() {
		var me = this;
		window.__rootAuth = me;
	},
	componentDidUpdate : function() {
		var me = this;
	},	
	render: function() {
		var me = this;
		return (<span>
				_classAuth.jsx
			</span>)                   
	}
})
