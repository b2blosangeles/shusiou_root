try {
	var _overLay = React.createClass({
		componentDidMount : function() {
			var me = this;
			console.log('componentDidMount--->');
		},
		componentDidUpdate : function() {
			var me = this;
			console.log('componentDidUpdate--->');
		},
		render: function() {
			var me = this;
			console.log('Root--->');
			return (
				<span>_overLay</span>                   
			)}
		})
} catch (err) {
	console.log(err.message);
}

