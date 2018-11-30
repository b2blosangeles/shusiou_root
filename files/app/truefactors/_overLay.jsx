try {
	var _overLay = React.createClass({
		componentDidMount : function() {
			var me = this;
			console.log('componentDidMount--->');
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

