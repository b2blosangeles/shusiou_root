try {
	var _overLay = React.createClass({
		render: function() {
			var me = this;
			console.log('Root--->');
			console.log(Root);
			return (
				<span>_overLay</span>                   
			)}
		})
} catch (err) {
	console.log(err.message);
}

